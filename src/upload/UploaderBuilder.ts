import Uploader from "./Uploader";
import Interceptor from "./interceptor/UploadInterceptor";
import UploadListener from "./hook/UploadListener";

/**
 * UploaderBuilder
 *
 */
class UploaderBuilder {
    public static MAX_CHUNK_SIZE = 4 * 1024 * 1024;//分片最大值
    public static BLOCK_SIZE = UploaderBuilder.MAX_CHUNK_SIZE;//分块大小，只有大于这个数才需要分块
    public static UPLOAD_URL = 'http://upload.qiniu.com';

    private _retry: number = 0;//最大重试次数
    private _domain: string = UploaderBuilder.UPLOAD_URL;//上传域名
    private _size: number = 1024 * 1024;//分片大小,单位字节,上限4m,不能为0
    private _chunk: boolean = true;//分块上传
    private _auto: boolean = true;//自动上传,每次选择文件后
    private _multiple: boolean = true;//是否支持多文件
    private _accept: string[] = [];//接受的文件类型
    private _compress: number = 0.95;//图片压缩质量
    private _scale: number[] = [0, 0];//缩放大小,限定高度等比[h:200,w:0],限定宽度等比[h:0,w:100],限定长宽[h:200,w:100]
    private _listener: UploadListener;//监听器
    private _tokenFunc: Function;//token获取函数
    private _tokenShare: boolean = true;//分享token,如果为false,每一次HTTP请求都需要新获取Token
    private _interceptors: Interceptor[] = [];//任务拦截器
    private _isDebug: boolean = false;//


    /**
     * 设置上传的域名,默认是http://upload.qiniu.com/
     * @param domain
     * @returns {UploaderBuilder}
     */
    public domain(domain: string): UploaderBuilder {
        this._domain = domain.endsWith('/') ? domain.substring(0, domain.length - 1) : domain;
        return this;
    }

    /**
     * 添加一个拦截器
     * @param interceptor
     * @returns {UploaderBuilder}
     */
    public interceptor(interceptor: Interceptor): UploaderBuilder {
        this._interceptors.push(interceptor);
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
    private size(size: number): UploaderBuilder {
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
     * 图片质量压缩,只在上传的文件是图片的时候有效
     * @param compress 0-1,默认1,不压缩
     * @returns {UploaderBuilder}
     */
    public compress(compress: number): UploaderBuilder {
        //0.95是最接近原图大小，如果质量为1的话会导致比原图大几倍。
        this._compress = Math.max(Math.min(compress, 1), 0) * 0.95;
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
     * 获取Token的函数
     * @param tokenFunc
     * @returns {UploaderBuilder}
     */
    public tokenFunc(tokenFunc): UploaderBuilder {
        this._tokenFunc = tokenFunc;
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

    get getCompress(): number {
        return this._compress;
    }

    get getScale(): number[] {
        return this._scale;
    }

    get getListener(): UploadListener {
        return this._listener;
    }

    get getTokenFunc(): Function {
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

    get getDomain(): string {
        return this._domain;
    }

    public build(): Uploader {
        return new Uploader(this);
    }
}

export default UploaderBuilder;