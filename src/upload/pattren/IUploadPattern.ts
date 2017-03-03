import BaseTask from "../task/BaseTask";
/**
 *
 */
interface IUploadPattern {

    /**
     * 上传任务
     * @param task
     */
    upload(task: BaseTask);
}

export  default IUploadPattern;