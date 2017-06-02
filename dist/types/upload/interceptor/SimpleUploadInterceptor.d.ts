import BaseTask from "../task/BaseTask";
import UploadInterceptor from "./UploadInterceptor";
declare class SimpleUploadInterceptor implements UploadInterceptor {
    onIntercept(task: BaseTask): boolean;
    onInterrupt(task: BaseTask): boolean;
}
export default SimpleUploadInterceptor;
