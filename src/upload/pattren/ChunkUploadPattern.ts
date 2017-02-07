import IUploadPattern from "./IUploadPattern";
import Uploader from "../Uploader";
import {ChunkTask, Block, Chunk} from "../task/ChunkTask";
import debug from "../../util/Debug";

/**
 * 分块上传
 */
class ChunkUploadPattern implements IUploadPattern {
    private uploader: Uploader;
    private task: ChunkTask;

    init(uploader: Uploader): void {
        this.uploader = uploader;
    }

    upload(task: ChunkTask): void {
        this.task = task;

        this.uploader.getToken(task).then((token: string) => {
            task.startDate = new Date();
            this.uploadBlock(token);
        });
    }

    private uploadBlock(token: string) {
        let chain: Promise = Promise.resolve();
        for (let block: Block of this.task.blocks) {
            for (let chunk: Chunk of block.chunks) {
                chain = chain.then(() => {
                    return this.uploadChunk(chunk, this.uploader.token)
                });
            }
        }

        chain.then(() => {
            return this.concatChunks(token);
        }).then(() => {
            //所有任务都结束了
            if (this.uploader.isTaskQueueFinish()) {
                //更改任务执行中标志
                this.uploader.tasking = false;

                //监听器调用
                this.uploader.listener.onFinish(this.uploader.taskQueue);
            }
        }).catch((response) => {
            debug.w(`${this.task.file.name}分块上传失败`);
            this.task.error = response;
            this.task.isSuccess = false;
            this.task.isFinish = true;
            this.task.endDate = new Date();
            this.uploader.listener.onTaskFail(this.task);
        });
    }

    private uploadChunk(chunk: Chunk, token: string) {
        return new Promise((resolve, reject) => {
            let isFirstChunkInBlock = chunk.block.chunks.indexOf(chunk) == 0;
            let chunkIndex = chunk.block.chunks.indexOf(chunk);
            //前一个chunk,如果存在的话
            let prevChunk = isFirstChunkInBlock ? null : chunk.block.chunks[chunkIndex - 1];

            let url: string = isFirstChunkInBlock ? this.getUploadBlockUrl(chunk.block.data.size) : this.getUploadChunkUrl(chunk.start, prevChunk ? prevChunk.ctx : null, prevChunk ? prevChunk.host : null);

            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');//设置contentType
            xhr.setRequestHeader('Authorization', `UpToken ${token}`);//添加token验证头

            //分片上传中
            xhr.upload.onprogress = (e: ProgressEvent) => {
                if (e.lengthComputable) {
                    let progress = Math.round(((this.task.finishedBlocksSize + chunk.start + e.loaded) / this.task.file.size) * 100);
                    if (this.task.progress < progress) {
                        this.task.progress = progress;
                        this.uploader.listener.onTaskProgress(this.task);
                    }
                }
            };

            //分片上传完成
            xhr.upload.onload = () => {
                let progress = Math.round(((this.task.finishedBlocksSize + chunk.start + chunk.data.size) / this.task.file.size) * 100);
                if (this.task.progress < progress) {
                    this.task.progress = progress;
                    this.uploader.listener.onTaskProgress(this.task);
                }
            };

            //响应返回
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200 && xhr.responseText != '') {
                        let result: any = JSON.parse(xhr.responseText);
                        chunk.isFinish = true;
                        chunk.processing = false;
                        chunk.ctx = result.ctx;
                        chunk.host = result.host;
                        let chunkIndex: number = chunk.block.chunks.indexOf(chunk);
                        let hasNextChunkInThisBlock: boolean = chunkIndex != chunk.block.chunks.length - 1;
                        if (!hasNextChunkInThisBlock) {
                            chunk.block.isFinish = true;
                            chunk.block.processing = false;
                        }
                        resolve();
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send(chunk.data);
        });
    }


    private concatChunks(token: string) {
        return new Promise((resolve, reject) => {
            let encodedKey = this.task.key ? btoa(encodeURIComponent(this.task.key)) : null;
            let url = this.getMakeFileUrl(this.task.file.size, encodedKey);
            //构建所有数据块最后一个数据片上传后得到的<ctx>的组合成的列表字符串
            let ctxListString = '';

            for (let block: Block of this.task.blocks) {
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
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    this.task.isFinish = true;
                    if (xhr.status == 200 && xhr.responseText != '') {
                        let result: any = JSON.parse(xhr.responseText);
                        this.task.isSuccess = true;
                        this.task.result = result;
                        this.task.endDate = new Date();
                        this.uploader.listener.onTaskSuccess(this.task);
                        resolve();
                    }
                    else if (this.retryTask(this.task)) {
                        debug.w(`${this.task.file.name}分块上传失败,准备开始重传`);
                        this.uploader.listener.onTaskRetry(this.task);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send(ctxListString);
        });
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
        if (encodedKey) {
            return `${this.uploader.domain}/mkfile/${fileSize}/key/${encodedKey}`;
        }
        else {
            return `${this.uploader.domain}/mkfile/${fileSize}`;
        }
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

}


export  default ChunkUploadPattern;