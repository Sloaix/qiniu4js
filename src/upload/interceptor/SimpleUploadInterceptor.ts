import BaseTask from "../task/BaseTask";
import UploadInterceptor from "./UploadInterceptor";

class SimpleUploadInterceptor implements UploadInterceptor {

    onIntercept(task: BaseTask): boolean {
        return false;
    }

    onInterrupt(task: BaseTask): boolean {
        return false;
    }

}

export default SimpleUploadInterceptor;
