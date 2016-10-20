/**
 * 上传任务拦截器
 */
interface UploadInterceptor {
    /**
     * 是否拦截此Task,拦截后此Task不再上传
     * @param Task 返回true拦截，false放行。
     */
    onIntercept(Task): boolean;
    /**
     * 是否中断上传任务,中断后则不会开始上传。
     * @param Task 返回true中断，false放行。
     */
    onInterrupt(Task): boolean;
}


export default UploadInterceptor;