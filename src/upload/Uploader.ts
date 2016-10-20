import BaseTask from "./task/BaseTask";
import DirectTask from "./task/DirectTask";
import {ChunkTask} from "./task/ChunkTask";
import UploaderBuilder from "./UploaderBuilder";
import debug from "../util/Debug";
import Interceptor from "./interceptor/UploadInterceptor";
import UploadListener from "./hook/UploadListener";
import SimpleUploadListener from "./hook/SimpleUploadListener";
import DirectUploadPattern from "./pattren/DirectUploadPattern";
import ChunkUploadPattern from "./pattren/ChunkUploadPattern";


class Uploader {
    private FILE_INPUT_EL_ID: string = 'qiniu4js-input';
    private _fileInputId: string;
    private _fileInput: HTMLInputElement;//input 元素
    private _token: string;//token
    private _taskQueue: BaseTask[] = [];//任务队列
    private _tasking: boolean = false;//任务执行中
    private _chunkUploadPattern: ChunkUploadPattern;
    private _directUploadPattern: DirectUploadPattern;

    private _retry: number;//最大重试次数
    private _size: number;//分片大小,单位字节,最大4mb,不能为0
    private _chunk: boolean;//分块上传,该选项开启后，只有在文件大于4mb的时候才会分块上传
    private _auto: boolean;//自动上传,每次选择文件后
    private _multiple: boolean;//是否支持多文件
    private _accept: string[];//接受的文件类型
    private _compress: number;//图片压缩质量
    private _crop: number[];//裁剪参数[x:20,y:20,width:20,height:20]
    private _listener: UploadListener;//监听器
    private _tokenFunc: Function;//token获取函数
    private _tokenShare: boolean;//分享token,如果为false,每一次HTTP请求都需要新获取Token
    private _interceptors: Interceptor[];//任务拦截器
    private _domain: string;//上传域名

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
        this._listener = Object.assign(new SimpleUploadListener(), builder.getListener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
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
        this.initUploadPattern();
    }

    /**
     * 初始化上传模式
     */
    private initUploadPattern(): void {
        this._directUploadPattern = new DirectUploadPattern();
        this._directUploadPattern.init(this);

        this._chunkUploadPattern = new ChunkUploadPattern();
        this._chunkUploadPattern.init(this);
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
            let acceptValue: string = '';

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
        //如果没有选中文件就返回
        if (this.fileInput.files.length == 0) {
            return;
        }

        //上传前的准备
        this.readyForUpload();


        //是否中断任务
        let isInterrupt: Boolean = false;

        //任务拦截器过滤
        for (let task: BaseTask of this.taskQueue) {
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
            this.start();
        }
    };


    /**
     * 上传前的准备工作
     */
    private readyForUpload() {
        this.clear();
        let files: FileList = this.fileInput.files;
        //遍历files 创建上传任务
        for (let i: number = 0; i < this.fileInput.files.length; i++) {
            let file: File = files[i];

            let task: BaseTask;
            //只有在开启分块上传，并且文件大小大于4mb的时候才进行分块上传
            if (this.chunk && file.size > UploaderBuilder.BLOCK_SIZE) {
                task = new ChunkTask(file, UploaderBuilder.BLOCK_SIZE, this.size);
            }
            else {
                task = new DirectTask(file);
            }
            task.key = this.listener.onTaskGetKey(task);
            this.taskQueue.push(task);
        }
    }

    private  validate(): void {
        if (!this.tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
        }
    }

    /**
     * 开始上传
     */
    public start(): void {
        if (this.fileInput.files.length == 0) {
            throw new Error('没有选中的文件，无法start');
        }

        if (this.tasking) {
            throw new Error('任务执行中，请不要重复start');
        }

        this.listener.onStart(this.taskQueue);

        //遍历任务队列
        for (let task: BaseTask of this.taskQueue) {
            //根据任务的类型调用不同的上传模式进行上传
            if (task.constructor.name === DirectTask.name && task instanceof DirectTask) {
                //直传
                this._directUploadPattern.upload(task);
            }
            else if (task.constructor.name === ChunkTask.name && task instanceof ChunkTask) {
                //分块上传
                this._chunkUploadPattern.upload(task);
            }
            else {
                throw new Error('非法的task类型');
            }
        }
    }

    /**
     * 所有任务是否完成
     * @returns {boolean}
     */
    public isTaskQueueFinish() {
        for (let task: BaseTask of this.taskQueue) {
            if (!task.isFinish) {
                return false;
            }
        }
        return true;
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

    get listener(): UploadListener {
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

    set token(value: string) {
        this._token = value;
    }

    get taskQueue(): BaseTask[] {
        return this._taskQueue;
    }


    get tasking(): boolean {
        return this._tasking;
    }

    set tasking(value: boolean) {
        this._tasking = value;
    }

    get fileInputId(): string {
        return this._fileInputId;
    }

    get interceptors(): Interceptor[] {
        return this._interceptors;
    }

    get domain(): string {
        return this._domain;
    }
}

export default Uploader;