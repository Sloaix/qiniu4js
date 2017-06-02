import IUploadPattern from "./IUploadPattern";
import Uploader from "../Uploader";
import DirectTask from "../task/DirectTask";
/**
 * 直接上传
 */
declare class DirectUploadPattern implements IUploadPattern {
    private uploader;
    private task;
    constructor(uploader: Uploader);
    /**
     * 实现接口的上传方法
     * @param task
     */
    upload(task: DirectTask): void;
    /**
     * 创建表单
     * @param token
     * @returns {FormData}
     */
    private createFormData(token);
    /**
     * 上传文件
     * @param token
     */
    private uploadFile(token);
    /**
     * 重传
     * @param task
     * @returns {boolean}
     */
    private retryTask(task);
}
export default DirectUploadPattern;
