import IUploadPattern from "./IUploadPattern";
import Uploader from "../Uploader";
import {ChunkTask, Block, Chunk} from "../task/ChunkTask";
import debug from "../../util/Debug";

/**
 * 分块上传
 */
class ChunkUploadPattern implements IUploadPattern {
    private uploader: Uploader;

    init(uploader: Uploader): void {
        this.uploader = uploader;
    }

    /**
     * 分块上传
     */
    upload(task: ChunkTask): void {
        //只需要调用方法上传第一个块，之后就会递归调用自动上传。
        let firstBlock: Block = task.blocks[0];
        let firstChunk: Chunk = firstBlock.chunks[0];

        if (this.uploader.tokenShare && this.uploader.token) {
            task.startDate = new Date();
            this.uploadChunk(firstChunk, firstBlock, task, this.uploader.token);
        }
        else {
            debug.d(`开始获取token`);
            this.uploader.tokenFunc((token: string)=> {
                debug.d(`token获取成功 ${token}`);
                this.uploader.token = token;
                task.startDate = new Date();
                this.uploadChunk(firstChunk, firstBlock, task, token);
            }, task);
        }
    }

    /**
     *
     * @param chunk 将要上传的chunk
     * @param ctx 前一次上传返回的块级上传控制信息。
     * @param nextHost 下一次的分片上传地址
     * @param block 当前chunk属于的block
     * @param task 分片任务
     * @param token 上传凭证
     */
    private uploadChunk(chunk: Chunk, block: Block, task: ChunkTask, token: string, ctx?: string, nextHost?: string) {
        let chunkIndex: number = block.chunks.indexOf(chunk);
        let blockIndex: number = task.blocks.indexOf(block);

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        /**
         * 根据index进行不同的上传策略，因为第一个chunk是随着创建block的时候附带上传的。
         */

            //根据index获取不同的上传url
        let url: string = chunkIndex == 0 ? this.getUploadBlockUrl(block.data.size) : this.getUploadChunkUrl(chunk.start, ctx, nextHost);

        xhr.open('POST', url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');//设置contentType
        xhr.setRequestHeader('Authorization', `UpToken ${token}`);//添加token验证头

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 && xhr.responseText != '') {
                    let result: any = JSON.parse(xhr.responseText);
                    chunk.isFinish = true;
                    chunk.ctx = result.ctx;
                    //判断是否还有chunk等待我们上传
                    let hasNextChunk: boolean = block.chunks.indexOf(chunk) != block.chunks.length - 1;
                    if (hasNextChunk) {
                        let nextChunkIndex: number = chunkIndex + 1;
                        let nextChunk: Chunk = block.chunks[nextChunkIndex];
                        //上传下一个chunk
                        this.uploadChunk(nextChunk, block, task, token, chunk.ctx, result.host);
                    }
                    else {
                        //判断是否还有block等待我们上传
                        let hasNextBlock: boolean = task.blocks.indexOf(block) != task.blocks.length - 1;
                        if (hasNextBlock) {
                            //上传下一个block
                            let nextBlockIndex: number = blockIndex + 1;
                            let nextBlock: Block = task.blocks[nextBlockIndex];
                            this.uploadChunk(nextBlock.chunks[0], nextBlock, task, token);
                        }
                        //将之前上传的所有块组合成文件
                        else {
                            let encodedKey = btoa(encodeURIComponent(task.key));
                            let url = this.getMakeFileUrl(task.file.size, encodedKey);
                            //构建所有数据块最后一个数据片上传后得到的<ctx>的组合成的列表字符串
                            let ctxListString = '';

                            for (let block: Block of task.blocks) {
                                let lastChunk = block.chunks[block.chunks.length - 1];
                                ctxListString += lastChunk.ctx + ',';
                            }

                            if (ctxListString.endsWith(',')) {
                                ctxListString = ctxListString.substring(0, ctxListString.length - 1);
                            }

                            let xhr: XMLHttpRequest = new XMLHttpRequest();
                            xhr.open('POST', url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
                            xhr.setRequestHeader('Content-Type', 'text/plain');//设置contentType
                            xhr.setRequestHeader('Authorization', `UpToken ${token}`);//添加token验证头
                            xhr.send(ctxListString);
                            xhr.onreadystatechange = ()=> {
                                if (xhr.readyState == XMLHttpRequest.DONE) {
                                    task.isFinish = true;
                                    if (xhr.status == 200 && xhr.responseText != '') {
                                        let result: any = JSON.parse(xhr.responseText);
                                        task.isSuccess = true;
                                        this.uploader.listener.onTaskSuccess(task);
                                    }
                                    else {
                                        if (this.retryTask(task)) {
                                            debug.w(`${task.file.name}分块上传失败,准备开始重传`);
                                            this.uploader.listener.onTaskRetry(task);
                                        }
                                        else {
                                            debug.w(`${task.file.name}分块上传失败`);
                                            task.error = JSON.parse(xhr.responseText);
                                            task.error = task.error ? task.error : xhr.response;
                                            task.isSuccess = false;
                                            task.isFinish = true;
                                            this.uploader.listener.onTaskFail(task);
                                        }
                                    }

                                    //所有任务都结束了
                                    if (this.uploader.isTaskQueueFinish()) {
                                        //更改任务执行中标志
                                        this.uploader.tasking = false;

                                        //监听器调用
                                        this.uploader.listener.onFinish(this.uploader.taskQueue);
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                }
            }
        };
        xhr.send(chunk.data);
    }

    private retryTask(task: ChunkTask): boolean {
        //达到重试次数
        if (task.retry >= this.uploader.retry) {
            debug.w(`${task.file.name}达到重传次数上限${this.uploader.retry},停止重传`);
            return false;
        }
        task.retry++;
        debug.w(`${task.file.name}开始重传,当前重传次数${task.retry}`);
        // this.upload(task);

        //todo
        return true;
    }

    /**
     * 获取块上传的url
     * @param blockSize
     * @returns {string}
     */
    private  getUploadBlockUrl(blockSize: number): string {
        return `${this.uploader.domain}/mkblk/${blockSize}`;
    }

    /**
     * 获取片上传的url
     * @param start 片的在块中的起始位置
     * @param ctx 前一次上传返回的块级上传控制信息。
     * @param host 指定host
     */
    private  getUploadChunkUrl(start: number, ctx: string, host?: string): string {
        return `${host ? host : this.uploader.domain}/bput/${ctx}/${start}/`;
    }

    /**
     * 获取合并块为文件的url
     * @param fileSize 文件大小
     * @param encodedKey base64UrlEncode后的资源名称,若未指定，则使用saveKey；若未指定saveKey，则使用资源内容的SHA1值作为资源名。
     * @returns {string}
     */
    private  getMakeFileUrl(fileSize: number, encodedKey: string): string {
        return `${this.uploader.domain}/mkfile/${fileSize}/key/${encodedKey}`;
    }

}


export  default ChunkUploadPattern;