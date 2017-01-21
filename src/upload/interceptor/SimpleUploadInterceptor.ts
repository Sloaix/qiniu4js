import Task from "../task/BaseTask";
import UploadInterceptor from "./UploadInterceptor";

class SimpleUploadInterceptor implements UploadInterceptor {

    onIntercept(task: Task): boolean {
        return false;
    }

    onInterrupt(task: Task): boolean {
        return false;
    }

}

export default SimpleUploadInterceptor;
