import BaseTask from "../task/BaseTask";
/**
 * 上传任务拦截器
 */
interface UploadInterceptor {
    /**
     * 是否拦截此Task,拦截后此Task不再上传
     * @param task 返回true拦截，false放行。
     */
    onIntercept(task: BaseTask): boolean;
    /**
     * 是否中断上传任务,中断后则不会开始上传。
     * @param task 返回true中断，false放行。
     */
    onInterrupt(task: BaseTask): boolean;
}


export default UploadInterceptor;