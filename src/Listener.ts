import Task from "./Task";
interface Listener {
    onReady(taskQueue: Task[]): void;
    onStart(taskQueue: Task[]): void;
    onTaskProgress(task: Task): void;
    onTaskGetKey(task: Task): string;
    onTaskFail(task: Task): void;
    onTaskSuccess(task: Task): void;
    onTaskRetry(task: Task): void;
    onFinish(taskQueue: Task[]): void;
}


class SimpleListener implements Listener {

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

export {Listener, SimpleListener};