import Task from "../task/DirectTask";
import UploadListener from "./UploadListener";
class SimpleUploadListener implements UploadListener {

    onReady(taskQueue: Task[]): void {
    }

    onStart(taskQueue: Task[]): void {
    }

    onTaskProgress(task: Task): void {
    }

    onTaskGetKey(task: Task): string {
        return null;
    }

    onTaskFail(task: Task): void {
    }

    onTaskSuccess(task: Task): void {
    }

    onTaskRetry(task: Task): void {
    }

    onFinish(taskQueue: Task[]): void {
    }
}

export  default SimpleUploadListener;