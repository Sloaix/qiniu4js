import Uploader from "../Uploader";
import BaseTask from "../task/BaseTask";
/**
 *
 */
interface IUploadPattern {
    /**
     * 初始化
     * @param uploader
     */
    init(uploader: Uploader);

    /**
     * 上传任务
     * @param task
     */
    upload(task: BaseTask);
}

export  default IUploadPattern;