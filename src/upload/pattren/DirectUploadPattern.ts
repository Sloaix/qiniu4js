import IUploadPattern from "./IUploadPattern";
import Uploader from "../Uploader";
import DirectTask from "../task/DirectTask";
import debug from "../../util/Debug";
/**
 * 直接上传
 */
class DirectUploadPattern implements IUploadPattern {
    private uploader: Uploader;

    init(uploader: Uploader): void {
        this.uploader = uploader;
    }

    upload(task: DirectTask): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        //上传中
        xhr.upload.onprogress = (e: ProgressEvent)=> {
            if (e.lengthComputable) {
                let progress = Math.round((e.loaded * 100) / e.total);
                if (task.progress != progress) {
                    task.progress = progress;
                    this.uploader.listener.onTaskProgress(task);
                }
            }
        };

        //上传完成
        xhr.upload.onload = ()=> {
            if (task.progress != 100) {
                task.progress = 100;
                this.uploader.listener.onTaskProgress(task);
            }
        };


        let url = this.uploader.domain;
        url += ((/\?/).test(this.uploader.domain) ? "&" : "?") + (new Date()).getTime();
        xhr.open('POST', url, true);

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 && xhr.responseText != '') {
                    task.result = JSON.parse(xhr.responseText);
                    task.isSuccess = true;
                    task.isFinish = true;
                    task.endDate = new Date();
                    this.uploader.listener.onTaskSuccess(task);
                }
                else {
                    if (this.retryTask(task)) {
                        debug.w(`${task.file.name}上传失败,准备开始重传`);
                        this.uploader.listener.onTaskRetry(task);
                    }
                    else {
                        debug.w(`${task.file.name}上传失败`);
                        try {
                            task.error = JSON.parse(xhr.responseText);
                        }
                        catch (error: Error) {
                            task.error = xhr.response;
                        }
                        task.isSuccess = false;
                        task.isFinish = true;
                        task.endDate = new Date();
                        this.uploader.listener.onTaskFail(task);
                    }
                }

                //所有任务都结束了
                if (this.uploader.isTaskQueueFinish()) {
                    //更改任务执行中标志
                    this.uploader.tasking = false;

                    //监听器调用
                    this.uploader.listener.onFinish(this.uploader.taskQueue);
                }
            }
        };

        if (this.uploader.tokenShare && this.uploader.token) {
            task.startDate = new Date();
            let formData: FormData = DirectUploadPattern.createFormData(task, this.uploader.token);
            xhr.send(formData);
        }
        else {
            debug.d(`开始获取token`);
            this.uploader.tokenFunc((token: string)=> {
                debug.d(`token获取成功 ${token}`);
                this.uploader.token = token;
                task.startDate = new Date();
                let formData: FormData = DirectUploadPattern.createFormData(task, this.uploader.token);
                xhr.send(formData);
            }, task);
        }
    }


    private static createFormData(task: DirectTask, token: String): FormData {

        let formData: FormData = new FormData();
        if (task.key !== null && task.key !== undefined) {
            formData.append('key', task.key);
        }

        formData.append('token', token);
        formData.append('file', task.file);

        debug.d(`创建formData对象`);

        return formData;
    }


    private retryTask(task: DirectTask): boolean {
        //达到重试次数
        if (task.retry >= this.uploader.retry) {
            debug.w(`${task.file.name}达到重传次数上限${this.uploader.retry},停止重传`);
            return false;
        }
        task.retry++;
        debug.w(`${task.file.name}开始重传,当前重传次数${task.retry}`);
        this.upload(task);
        return true;
    }
}


export  default DirectUploadPattern;