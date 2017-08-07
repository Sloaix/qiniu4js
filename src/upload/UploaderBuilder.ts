import Uploader from "./Uploader";
import BaseTask from "./task/BaseTask";
import TokenFunc from "./TokenFunc";
import Interceptor from "./interceptor/UploadInterceptor";
import SimpleUploadInterceptor from "./interceptor/SimpleUploadInterceptor";
import UploadListener from "./hook/UploadListener";
import {Scheme, Domain} from "./url/Domain";

/**
 * UploaderBuilder
 *
 */
class UploaderBuilder {
    public static MAX_CHUNK_SIZE = 4 * 1024 * 1024;//分片最大值
    public static BLOCK_SIZE = UploaderBuilder.MAX_CHUNK_SIZE;//分块大小，只有大于这个数才需要分块
    public static UPLOAD_DOMAIN = {http: 'http://upload.qiniu.com', https: 'https://up.qbox.me'};

    private _retry: number = 0;//最大重试次数
    private _domain: Domain = UploaderBuilder.UPLOAD_DOMAIN;//上传域名
    private _scheme: Scheme = null;//上传域名的 scheme
    private _size: number = 1024 * 1024;//分片大小,单位字节,上限4m,不能为0
    private _chunk: boolean = true;//分块上传
    private _auto: boolean = true;//自动上传,每次选择文件后
    private _multiple: boolean = true;//是否支持多文件
    private _accept: string[] = [];//接受的文件类型
    private _button: string;//上传按钮
    private _buttonEventName: string;//上传按钮的监听事件名称
    private _compress: number = 1;//图片压缩质量
    private _scale: number[] = [0, 0];//缩放大小,限定高度等比[h:200,w:0],限定宽度等比[h:0,w:100],限定长宽[h:200,w:100]
    private _listener: UploadListener;//监听器
    private _saveKey: boolean | string = false;
    private _tokenFunc: TokenFunc;//token获取函数
    private _tokenShare: boolean = true;//分享token,如果为false,每一次HTTP请求都需要新获取Token
    private _interceptors: Interceptor[] = [];//任务拦截器
    private _isDebug: boolean = false;//
    private _files: File[] = [];//自定义上传文件列表

    /**
     * 设置上传的文件
     * @param files
     * @returns {UploaderBuilder}
     */
    public files(files: File[] | FileList): UploaderBuilder {
        if (files == null || files.length == 0) {
            return this;
        }

        for (let i: number = 0; i < files.length; i++) {
            this._files.push(files[i])
        }

        return this;
    }

    /**
     * 设置上传的域名,默认是 {http: 'http://upload.qiniu.com', https: 'https://up.qbox.me'}
     * @param domain
     * @returns {UploaderBuilder}
     */
    public domain(domain: Domain): UploaderBuilder {
        this._domain = domain;
        return this;
    }

    /**
     * 设置上传域名的协议类型，默认从 window.location.protocol 读取
     * @param scheme
     * @returns {UploaderBuilder}
     */
    public scheme(scheme: Scheme): UploaderBuilder {
        this._scheme = scheme;
        return this;
    }

    /**
     * 添加一个拦截器
     * @param interceptor
     * @returns {UploaderBuilder}
     */
    public interceptor(interceptor: Interceptor): UploaderBuilder {
        this._interceptors.push(Object.assign(new SimpleUploadInterceptor(), interceptor));
        return this;
    }

    /**
     * 上传失败后的重传尝试次数
     * @param retry 默认0次，不尝试次重传
     * @returns {UploaderBuilder}
     */
    public retry(retry: number): UploaderBuilder {
        this._retry = retry;
        return this;
    }

    /**
     * 设置分片大小
     * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
     * @returns {UploaderBuilder}
     */
    public size(size: number): UploaderBuilder {
        this._size = Math.min(Math.max(size, 1), UploaderBuilder.MAX_CHUNK_SIZE);
        return this;
    }

    /**
     * 选择文件后,是否自动上传
     * @param auto 默认true
     * @returns {UploaderBuilder}
     */
    public auto(auto: boolean): UploaderBuilder {
        this._auto = auto;
        return this;
    }

    /**
     * 是否支持多文件选择
     * @param multiple 默认true
     * @returns {UploaderBuilder}
     */
    public multiple(multiple: boolean): UploaderBuilder {
        this._multiple = multiple;
        return this;
    }

    /**
     * 接受上传的文件类型
     * @param accept 数组形式例如:['.png','video/*']
     *
     * 详细配置见http://www.w3schools.com/tags/att_input_accept.asp
     *
     * @returns {UploaderBuilder}
     */
    public accept(accept: string[]): UploaderBuilder {
        this._accept = accept;
        return this;
    }

    /**
     * 设置上传按钮
     * @param button 上传按钮ID
     * @param eventName 上传按钮的监听事件名称，默认为 "click" 。
     * @returns {UploaderBuilder}
     */
    public button(button: string, eventName = "click"): UploaderBuilder {
        this._button = button;
        this._buttonEventName = eventName;
        return this;
    }

    /**
     * 图片质量压缩,只在上传的文件是图片的时候有效
     * @param compress 0-1,默认1,不压缩
     * @returns {UploaderBuilder}
     */
    public compress(compress: number): UploaderBuilder {
        this._compress = Math.max(Math.min(compress, 1), 0);
        return this;
    }

    /**
     * 图片缩放
     * @returns {UploaderBuilder}
     * @param scale
     */
    public scale(scale: number[]): UploaderBuilder {
        this._scale = scale;
        return this;
    }

    /**
     * 设置 saveKey
     * @param saveKey
     * @returns {UploaderBuilder}
     */
    public saveKey(saveKey: boolean | string): UploaderBuilder {
        this._saveKey = saveKey;
        return this;
    }

    /**
     * 获取Token的地址
     * @param tokenUrl
     * @returns {UploaderBuilder}
     */
    public tokenUrl(tokenUrl: string): UploaderBuilder {
        this._tokenFunc = (uploader: Uploader, task: BaseTask) => {
            return uploader.requestTaskToken(task, tokenUrl);
        };
        return this;
    }

    /**
     * 获取Token的函数
     * @param tokenFunc
     * @returns {UploaderBuilder}
     */
    public tokenFunc(tokenFunc: Function): UploaderBuilder {
        this._tokenFunc = (uploader: Uploader, task: BaseTask) => {
            return new Promise((resolve) => {
                tokenFunc(resolve, task);
            });
        };
        return this;
    }

    /**
     * 上传生命周期钩子
     * @param listener
     * @returns {UploaderBuilder}
     */
    public listener(listener: UploadListener): UploaderBuilder {
        this._listener = listener;
        return this;
    }

    /**
     * 是否分享token,如果为false每上传一个文件都需要请求一次Token。
     * @param tokenShare
     * @returns {UploaderBuilder}
     */
    public tokenShare(tokenShare: boolean): UploaderBuilder {
        this._tokenShare = tokenShare;
        return this;
    }

    /**
     * 是否分块上传
     * @param chunk 默认false
     * @returns {UploaderBuilder}
     */
    public chunk(chunk: boolean): UploaderBuilder {
        this._chunk = chunk;
        return this;
    }

    /**
     * 是否开启debug模式
     * @param debug 默认false
     * @returns {UploaderBuilder}
     */
    public debug(debug: boolean): UploaderBuilder {
        this._isDebug = debug;
        return this;
    }

    get getRetry(): number {
        return this._retry;
    }

    get getSize(): number {
        return this._size;
    }

    get getAuto(): boolean {
        return this._auto;
    }

    get getMultiple(): boolean {
        return this._multiple;
    }

    get getAccept(): string[] {
        return this._accept;
    }

    get getButton(): string {
        return this._button;
    }

    get getButtonEventName(): string {
        return this._buttonEventName;
    }

    get getCompress(): number {
        return this._compress;
    }

    get getScale(): number[] {
        return this._scale;
    }

    get getListener(): UploadListener {
        return this._listener;
    }

    get getSaveKey(): boolean | string {
        return this._saveKey;
    }

    get getTokenFunc(): TokenFunc {
        return this._tokenFunc;
    }

    get getTokenShare(): boolean {
        return this._tokenShare;
    }

    get getChunk(): boolean {
        return this._chunk;
    }

    get getIsDebug(): boolean {
        return this._isDebug;
    }

    get getInterceptors(): Interceptor[] {
        return this._interceptors;
    }

    get getFiles(): File[] {
        return this._files;
    }

    get getDomain(): string {
        let domain: any = this._domain;
        if (!domain) {
            domain = UploaderBuilder.UPLOAD_DOMAIN;
        }
        if (typeof domain != "string") {
            let scheme = this._scheme;
            if (typeof scheme != "string") {
                let protocol = window.location.protocol;
                scheme = protocol.substring(0, protocol.length - 1) as Scheme
            }
            domain = domain[scheme];
        }
        return domain.endsWith('/') ? domain.substring(0, domain.length - 1) : domain;
    }

    public build(): Uploader {
        return new Uploader(this);
    }
}

export default UploaderBuilder;