import UploaderBuilder from "./UploaderBuilder";
import {Listener, SimpleListener} from "./Listener";
import Task from "./Task";
import debug from "./Debug";
import Interceptor from "./Interceptor";


class Uploader {
    private FILE_INPUT_EL_ID: string = 'qiniu4js-input';
    public static UPLOAD_URL = 'http://up.qiniu.com/';
    private _fileInputId: string;
    private _fileInput: HTMLInputElement;//input 元素
    private _token: string;//token
    private _taskQueue: Task[] = [];//任务队列
    private _tasking: boolean = false;//任务执行中

    private _retry: number;//最大重试次数
    private _size: number;//分块大小,单位字节,默认4mb
    private _chunk: boolean;//分块上传
    private _auto: boolean;//自动上传,每次选择文件后
    private _multiple: boolean;//是否支持多文件
    private _accept: string[];//接受的文件类型
    private _compress: number;//图片压缩质量
    private _crop: number[];//裁剪参数[x:20,y:20,width:20,height:20]
    private _listener: Listener;//监听器
    private _tokenFunc: Function;//token获取函数
    private _tokenShare: boolean;//分享token,如果为false,每一次HTTP请求都需要新获取Token
    private _interceptors: Interceptor[];//任务拦截器

    constructor(builder: UploaderBuilder) {
        this._retry = builder.getRetry;
        this._size = builder.getSize;
        this._chunk = builder.getChunk;
        this._auto = builder.getAuto;
        this._multiple = builder.getMultiple;
        this._accept = builder.getAccept;
        this._compress = builder.getCompress;
        this._crop = builder.getCrop;
        this._tokenFunc = builder.getTokenFunc;
        this._tokenShare = builder.getTokenShare;
        this._listener = Object.assign(new SimpleListener(), builder.getListener);
        this._interceptors = builder.getInterceptors;

        this._fileInputId = `${this.FILE_INPUT_EL_ID}_${new Date().getTime()}`;
        debug.enable = builder.getIsDebug;

        this.validate();

        this.init();
    }

    /**
     * 初始化操作
     */
    private init(): void {
        this.initFileInputEl();
    }

    /**
     * 初始化file input element
     */
    private initFileInputEl(): void {

        //查询已经存在的file input
        let exist: HTMLInputElement = document.getElementById(this._fileInputId);

        //创建input元素
        this._fileInput = exist ? exist : document.createElement('input');
        this.fileInput.type = 'file';//type file
        this.fileInput.id = this._fileInputId;//id 方便后面查找
        this.fileInput.style.display = 'none';//隐藏file input

        //多文件
        if (this.multiple) {
            //多文件
            this.fileInput.multiple = true;
        }

        //文件类型
        if (this.accept && this.accept.length != 0) {
            let acceptValue = '';

            for (let value: string of this.accept) {
                acceptValue += value;
                acceptValue += ',';
            }

            if (acceptValue.endsWith(',')) {
                acceptValue = acceptValue.substring(0, acceptValue.length - 1);
            }
            this.fileInput.accept = acceptValue;
            debug.d(`accept类型 ${acceptValue}`);
        }

        //将input元素添加到body子节点的末尾
        document.body.appendChild(this.fileInput);

        //选择文件监听器
        this.fileInput.addEventListener('change', this.handleFiles, false);
    }


    /**
     * 上传完成或者失败后,对本次上传任务进行清扫
     */
    private clear(): void {
        this.taskQueue.length = 0;
        this._token = null;
    }

    /**
     * 处理文件
     */
    private handleFiles = ()=> {

        //上传前的准备
        this.readyForUpload();


        //是否中断任务
        let isInterrupt: Boolean = false;

        //任务拦截器过滤
        for (let task: Task of this.taskQueue) {
            for (let interceptor: Interceptor of this.interceptors) {
                if (interceptor.onIntercept(task)) {
                    //从任务队列中去除任务
                    this.taskQueue.splice(this.taskQueue.indexOf(task), 1);
                }
                if (interceptor.onInterrupt(task)) {
                    isInterrupt = true;
                    break;
                }
            }
        }

        if (isInterrupt) {
            debug.w("任务拦截器中断了任务队列");
            return;
        }

        //回调函数函数
        this.listener.onReady(this.taskQueue);

        //自动上传
        if (this.auto) {
            this.uploadFiles();
        }
    };


    /**
     * 上传前的准备工作
     */
    private readyForUpload() {
        this.clear();
        let files = this.fileInput.files;
        //遍历files 创建上传任务
        for (let i = 0; i < this.fileInput.files.length; i++) {
            let file = files[i];
            let task = new Task(file);
            task.key = this.listener.onTaskGetKey(task);
            this.taskQueue.push(task);
        }
    }

    private  validate(): void {
        if (!this.tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
        }
    }

    public start(): void {
        if (this.fileInput.files.length == 0) {
            throw new Error('没有选中的文件，无法start');
        }

        if (this.tasking) {
            throw new Error('任务执行中，请不要重复start');
        }

        this.uploadFiles();
    }

    /**
     * 上传多个文件
     */
    private uploadFiles() {
        //开始上传
        this.listener.onStart(this.taskQueue);
        this._tasking = true;
        if (this.chunk) {
            debug.d('分块上传');
            this.uploadFilesChunk();
        }
        else {
            debug.d('直接上传');
            this.uploadFilesDirect();
        }
    }

    /**
     * 直传文件
     */
    private uploadFilesDirect() {
        for (let task: Task of this.taskQueue) {
            this.uploadFile(task);
        }
    }

    /**
     * 分块上传文件
     */
    private uploadFilesChunk() {
        //todo
    }

    /**
     * 所有任务是否完成
     * @returns {boolean}
     */
    private isAllTaskFinish() {
        for (let task: Task of this.taskQueue) {
            if (!task.isFinish) {
                return false;
            }
        }
        return true;
    }

    /**
     * 上传文件
     * @param task
     */
    private uploadFile(task: Task): void {

        let xhr: XMLHttpRequest = new XMLHttpRequest();

        //上传中
        xhr.upload.onprogress = (e: ProgressEvent)=> {
            if (e.lengthComputable) {
                task.progress = Math.round((e.loaded * 100) / e.total);
                this.listener.onTaskProgress(task);
            }
        };

        //上传完成
        xhr.upload.onload = ()=> {
            task.progress = 100;
        };

        xhr.open('POST', Uploader.UPLOAD_URL, true);

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                task.endDate = new Date();
                if (xhr.status == 200 && xhr.responseText != '') {
                    task.result = JSON.parse(xhr.responseText);
                    task.isSuccess = true;
                    task.isFinish = true;
                    this.listener.onTaskSuccess(task);
                }
                else {
                    if (this.retryTask(task)) {
                        debug.w(`${task.file.name}上传失败,准备开始重传`);
                        this.listener.onTaskRetry(task);
                    }
                    else {
                        debug.w(`${task.file.name}上传失败`);
                        task.error = xhr.response;
                        task.isSuccess = false;
                        task.isFinish = true;
                        this.listener.onTaskFail(task);
                    }
                }

                //所有任务都结束了
                if (this.isAllTaskFinish()) {
                    //更改任务执行中标志
                    this._tasking = false;

                    //监听器调用
                    this.listener.onFinish(this.taskQueue);
                }
            }
        };

        if (this.tokenShare && this.token) {
            task.startDate = new Date();
            let formData: FormData = Uploader.createFormData(task, this.token);
            xhr.send(formData);
        }
        else {
            debug.d(`开始获取token`);
            this.tokenFunc((token)=> {
                debug.d(`token获取成功 ${token}`);
                this._token = token;
                task.startDate = new Date();
                let formData: FormData = Uploader.createFormData(task, this.token);
                xhr.send(formData);
            }, task);
        }
    }

    /**
     * 如果重试失败,返回false
     * @param task
     */
    private retryTask(task: Task): boolean {
        //达到重试次数
        if (task.retry >= this.retry) {
            debug.w(`${task.file.name}达到重传次数上限${this.retry},停止重传`);
            return false;
        }
        task.retry++;
        debug.w(`${task.file.name}开始重传,当前重传次数${task.retry}`);
        this.uploadFile(task);
        return true;
    }

    private static createFormData(task: Task, token: String): FormData {

        let formData: FormData = new FormData();
        if (task.key !== null && task.key !== undefined) {
            formData.append('key', task.key);
        }

        formData.append('token', token);
        formData.append('file', task.file);

        debug.d(`创建formData对象`);

        return formData;
    }


    /**
     * 选择文件
     */
    public chooseFile() {
        this.fileInput.click();
    }

    get retry(): number {
        return this._retry;
    }

    get size(): number {
        return this._size;
    }

    get auto(): boolean {
        return this._auto;
    }

    get multiple(): boolean {
        return this._multiple;
    }

    get accept(): string[] {
        return this._accept;
    }

    get compress(): number {
        return this._compress;
    }

    get crop(): number[] {
        return this._crop;
    }

    get listener(): Listener {
        return this._listener;
    }

    get fileInput(): HTMLInputElement {
        return this._fileInput;
    }

    get tokenShare(): boolean {
        return this._tokenShare;
    }

    get chunk(): boolean {
        return this._chunk;
    }

    get tokenFunc(): Function {
        return this._tokenFunc;
    }

    get token(): string {
        return this._token;
    }

    get taskQueue(): Task[] {
        return this._taskQueue;
    }


    get tasking(): boolean {
        return this._tasking;
    }


    get fileInputId(): string {
        return this._fileInputId;
    }

    get interceptors(): Interceptor[] {
        return this._interceptors;
    }
}

export default Uploader;