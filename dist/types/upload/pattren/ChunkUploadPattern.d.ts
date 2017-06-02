import IUploadPattern from "./IUploadPattern";
import Uploader from "../Uploader";
import { ChunkTask } from "../task/ChunkTask";
/**
 * 分块上传
 */
declare class ChunkUploadPattern implements IUploadPattern {
    private uploader;
    private task;
    constructor(uploader: Uploader);
    init(uploader: Uploader): void;
    upload(task: ChunkTask): void;
    private uploadBlock(token);
    private uploadChunk(chunk, token);
    private concatChunks(token);
    /**
     * 获取块上传的url
     * @param blockSize
     * @returns {string}
     */
    private getUploadBlockUrl(blockSize);
    /**
     * 获取片上传的url
     * @param start 片的在块中的起始位置
     * @param ctx 前一次上传返回的块级上传控制信息。
     * @param host 指定host
     */
    private getUploadChunkUrl(start, ctx, host?);
    /**
     * 获取合并块为文件的url
     * @param fileSize 文件大小
     * @param encodedKey base64UrlEncode后的资源名称,若未指定，则使用saveKey；若未指定saveKey，则使用资源内容的SHA1值作为资源名。
     * @returns {string}
     */
    private getMakeFileUrl(fileSize, encodedKey);
    private retryTask(task);
}
export default ChunkUploadPattern;
