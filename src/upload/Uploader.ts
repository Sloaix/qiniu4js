import BaseTask from "./task/BaseTask";
import DirectTask from "./task/DirectTask";
import {ChunkTask} from "./task/ChunkTask";
import TokenFunc from "./TokenFunc";
import UUID from "./uuid/UUID";
import UploaderBuilder from "./UploaderBuilder";
import log from "../util/Log";
import Interceptor from "./interceptor/UploadInterceptor";
import UploadListener from "./hook/UploadListener";
import SimpleUploadListener from "./hook/SimpleUploadListener";
import DirectUploadPattern from "./pattren/DirectUploadPattern";
import ChunkUploadPattern from "./pattren/ChunkUploadPattern";
import "../util/Polyfill";

class Uploader {
    private FILE_INPUT_EL_ID: string = 'qiniu4js-input';
    private _fileInputId: string;
    private _fileInput: HTMLInputElement;//input 元素
    private _token: string;//token
    private _taskQueue: BaseTask[] = [];//任务队列
    private _tasking: boolean = false;//任务执行中

    private _retry: number;//最大重试次数
    private _size: number;//分片大小,单位字节,最大4mb,不能为0
    private _chunk: boolean;//分块上传,该选项开启后，只有在文件大于4mb的时候才会分块上传
    private _auto: boolean;//自动上传,每次选择文件后
    private _multiple: boolean;//是否支持多文件
    private _accept: string[];//接受的文件类型
    private _button: string;//上传按钮
    private _buttonEventName: string;//上传按钮的监听事件名称
    private _compress: number;//图片压缩质量
    private _scale: number[] = [];//缩放大小,限定高度等比缩放[h:200,w:0],限定宽度等比缩放[h:0,w:100],限定长宽[h:200,w:100]
    private _listener: UploadListener;//监听器
    private _saveKey: boolean | string = false;
    private _tokenFunc: TokenFunc;//token获取函数
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
        this._button = builder.getButton;
        this._buttonEventName = builder.getButtonEventName;
        this._compress = builder.getCompress;
        this._scale = builder.getScale;
        this._saveKey = builder.getSaveKey;
        this._tokenFunc = builder.getTokenFunc;
        this._tokenShare = builder.getTokenShare;
        this._listener = Object.assign(new SimpleUploadListener(), builder.getListener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
        this._fileInputId = `${this.FILE_INPUT_EL_ID}_${new Date().getTime()}`;
        log.enable = builder.getIsDebug;

        this.validateOptions();

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
        let exist: HTMLInputElement = <HTMLInputElement> document.getElementById(this._fileInputId);

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
            for (let value of this.accept) {
                acceptValue += value;
                acceptValue += ',';
            }

            if (acceptValue.endsWith(',')) {
                acceptValue = acceptValue.substring(0, acceptValue.length - 1);
            }
            this.fileInput.accept = acceptValue;
            log.d(`accept类型 ${acceptValue}`);
        }

        //将input元素添加到body子节点的末尾
        document.body.appendChild(this.fileInput);

        //选择文件监听器
        this.fileInput.addEventListener('change', this.handleFiles, false);

        if (this._button != undefined) {
            let button: any = document.getElementById(this._button);
            button.addEventListener(this._buttonEventName, this.chooseFile.bind(this));
        }
    }


    /**
     * 上传完成或者失败后,对本次上传任务进行清扫
     */
    private resetUploader(): void {
        log.d("开始重置 uploader");
        this.taskQueue.length = 0;
        log.d("任务队列已清空");
        this._token = null;
        log.d("token已清空");
        log.d("uploader 重置完毕");
    }

    /**
     * 处理文件
     */
    private handleFiles = () => {
        //如果没有选中文件就返回
        if (this.fileInput.files.length == 0) {
            return;
        }

        //生成task
        this.generateTask();

        //是否中断任务
        let isInterrupt: boolean = false;
        let interceptedTasks: BaseTask[] = [];

        //任务拦截器过滤
        for (let task of this.taskQueue) {
            for (let interceptor of this.interceptors) {
                //拦截生效
                if (interceptor.onIntercept(task)) {
                    interceptedTasks.push(task);
                    log.d("任务拦截器拦截了任务:");
                    log.d(task);
                }
                //打断生效
                if (interceptor.onInterrupt(task)) {
                    //将打断标志位设为true
                    isInterrupt = true;
                    break;
                }
            }
        }

        if (isInterrupt) {
            log.w("任务拦截器中断了任务队列");
            return;
        }

        //从任务队列中去除任务
        for (let task of interceptedTasks) {
            let index = this.taskQueue.indexOf(task);
            if (index != -1) {
                this.taskQueue.splice(index, 1);
            }
        }

        //回调函数函数
        this.listener.onReady(this.taskQueue);


        //处理图片
        this.handleImages().then(() => {
            //自动上传
            if (this.auto) {
                log.d("开始自动上传");
                this.start();
            }
        });
    };


    /**
     * 是否是分块任务
     * @param task
     * @returns {boolean}
     */
    private static isChunkTask(task: BaseTask): boolean {
        return task.constructor.name === ChunkTask.name && task instanceof ChunkTask;
    }

    /**
     * 是否是直传任务
     * @param task
     * @returns {boolean}
     */
    private static isDirectTask(task: BaseTask): boolean {
        return task.constructor.name === DirectTask.name && task instanceof DirectTask;
    }

    /**
     * 生成task
     */
    private generateTask() {
        this.resetUploader();

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
            if (this._saveKey == false) {
                task.key = this.listener.onTaskGetKey(task);
            }
            this.taskQueue.push(task);
        }
    }

    /**
     * 处理图片-缩放-质量压缩
     */
    private handleImages(): Promise<any> {
        let promises: Promise<any>[] = [];

        if (this.compress != 1 || this.scale[0] != 0 || this.scale[1] != 0) {
            for (let task of this.taskQueue) {
                if (!task.file.type.match('image.*')) {
                    continue;
                }
                log.d(`${task.file.name} 处理前的图片大小:${task.file.size / 1024} kb`);

                let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.createElement('canvas');

                let img: HTMLImageElement = new Image();
                let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
                img.src = URL.createObjectURL(task.file);


                let _this = this;

                promises.push(new Promise<Blob>((resolve) =>
                    img.onload = () => {

                        let imgW = img.width;
                        let imgH = img.height;

                        let scaleW = _this.scale[0];
                        let scaleH = _this.scale[1];

                        if (scaleW == 0 && scaleH > 0) {
                            canvas.width = imgW / imgH * scaleH;
                            canvas.height = scaleH;
                        }
                        else if (scaleH == 0 && scaleW > 0) {
                            canvas.width = scaleW;
                            canvas.height = imgH / imgW * scaleW;
                        }
                        else if (scaleW > 0 && scaleH > 0) {
                            canvas.width = scaleW;
                            canvas.height = scaleH;
                        }
                        else {
                            canvas.width = img.width;
                            canvas.height = img.height;
                        }

                        //这里的长宽是绘制到画布上的图片的长宽
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        console.log(canvas);
                        console.log(canvas.toBlob);
                        //0.95是最接近原图大小，如果质量为1的话会导致比原图大几倍。
                        canvas.toBlob((blob: Blob) => {
                            resolve(blob);
                            log.d(`${task.file.name} 处理后的图片大小:${blob.size / 1024} kb`);
                        }, "image/jpeg", _this.compress * 0.95);
                    }
                ).then((blob: any) => {
                    blob.name = task.file.name;
                    task.file = blob;
                    if (Uploader.isChunkTask(task)) {
                        (<ChunkTask>task).spliceFile2Block();
                    }
                }));
            }
        }
        return Promise.all(promises);
    }

    /**
     * 检验选项合法性
     */
    private  validateOptions(): void {
        log.d("开始检查构建参数合法性");
        if (!this._tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
        }
        if (!this.scale || !(this.scale instanceof Array) || this.scale.length != 2 || this.scale[0] < 0 || this.scale[1] < 0) {
            throw new Error('scale必须是长度为2的number类型的数组,scale[0]为宽度，scale[1]为长度,必须大于等于0');
        }
        log.d("构建参数检查完毕");
    }

    /**
     * 开始上传
     */
    public start(): void {
        log.d(`上传任务遍历开始`);

        if (this.fileInput.files.length == 0) {
            throw new Error('没有选中的文件，无法开始上传');
        }

        if (this.tasking) {
            throw new Error('任务执行中，请不要重复上传');
        }

        this.listener.onStart(this.taskQueue);

        //遍历任务队列
        for (let task of this.taskQueue) {
            log.d(`上传文件名：${task.file.name}`);
            log.d(`上传文件大小：${task.file.size}字节，${task.file.size / 1024} kb，${task.file.size / 1024 / 1024} mb`);
            //根据任务的类型调用不同的上传模式进行上传
            if (Uploader.isDirectTask(task)) {
                log.d('该上传任务为直传任务');
                //直传
                new DirectUploadPattern(this).upload(<DirectTask>task);
            }
            else if (Uploader.isChunkTask(task)) {
                log.d('该上传任务为分片任务');
                //分块上传
                new ChunkUploadPattern(this).upload(<ChunkTask>task);
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
        for (let task of this.taskQueue) {
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

    public getToken(task: BaseTask): Promise<string> {
        if (this._tokenShare && this._token != undefined) {
            return Promise.resolve(this._token);
        }
        log.d(`开始获取上传token`);
        return Promise.resolve(this._tokenFunc(this, task)).then((token: string): string => {
            log.d(`上传token获取成功: ${token}`);
            this._token = token;
            return token;
        });
    }

    public requestTaskToken(task: BaseTask, url: string): Promise<string> {
        return this.resolveSaveKey(task).then((saveKey: string) => {
            return this.requestToken(url, saveKey);
        });
    }

    private requestToken(url: string, saveKey: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (typeof saveKey == "string") {
                url += ((/\?/).test(url) ? "&" : "?") + "saveKey=" + encodeURIComponent(saveKey);
            }
            url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState != XMLHttpRequest.DONE) {
                    return;
                }
                if (xhr.status == 200) {
                    resolve(xhr.response.uptoken);
                    return;
                }
                reject(xhr.response);
            };
            xhr.onabort = () => {
                reject('aborted');
            };
            xhr.responseType = 'json';
            xhr.send();
        });
    }

    private resolveSaveKey(task: BaseTask): Promise<string> {
        let saveKey = this._saveKey;
        if (typeof saveKey != "string") {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(saveKey)
            .then(this.resolveUUID)
            .then(saveKey => this.resolveImageInfo(task.file, saveKey))
            .then(this.onSaveKeyResolved);
    }

    private resolveUUID = (s: string): string => {
        let re = /\$\(uuid\)/;
        if (re.test(s)) {
            return s.replace(re, UUID.uuid());
        }
        return s;
    };

    private resolveImageInfo = (blob: Blob, s: string): Promise<string> => {
        let widthRe = /\$\(imageInfo\.width\)/;
        let heightRe = /\$\(imageInfo\.height\)/;
        if (!widthRe.test(s) && !heightRe.test(s)) {
            return Promise.resolve(s);
        }
        return new Promise<string>((resolve) => {
            let img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => {
                s = s.replace(widthRe, img.width.toString());
                s = s.replace(heightRe, img.height.toString());
                resolve(s);
            };
        });
    };

    private onSaveKeyResolved = (saveKey: string): string => {
        this._tokenShare = this._tokenShare && this._saveKey == saveKey;
        return saveKey;
    };

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

    get scale(): number[] {
        return this._scale;
    }

    get listener(): UploadListener {
        return this._listener;
    }

    get fileInput(): HTMLInputElement {
        return this._fileInput;
    }

    get chunk(): boolean {
        return this._chunk;
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

    get interceptors(): Interceptor[] {
        return this._interceptors;
    }

    get domain(): string {
        return this._domain;
    }
}

export default Uploader;