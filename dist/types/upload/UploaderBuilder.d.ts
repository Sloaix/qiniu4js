import Uploader from "./Uploader";
import TokenFunc from "./TokenFunc";
import Interceptor from "./interceptor/UploadInterceptor";
import UploadListener from "./hook/UploadListener";
import { Scheme, Domain } from "./url/Domain";
/**
 * UploaderBuilder
 *
 */
declare class UploaderBuilder {
    static MAX_CHUNK_SIZE: number;
    static BLOCK_SIZE: number;
    static UPLOAD_DOMAIN: {
        http: string;
        https: string;
    };
    private _retry;
    private _domain;
    private _scheme;
    private _size;
    private _chunk;
    private _auto;
    private _multiple;
    private _accept;
    private _button;
    private _buttonEventName;
    private _compress;
    private _scale;
    private _listener;
    private _saveKey;
    private _tokenFunc;
    private _tokenShare;
    private _interceptors;
    private _isDebug;
    /**
     * 设置上传的域名,默认是 {http: 'http://upload.qiniu.com', https: 'https://up.qbox.me'}
     * @param domain
     * @returns {UploaderBuilder}
     */
    domain(domain: Domain): UploaderBuilder;
    /**
     * 设置上传域名的协议类型，默认从 window.location.protocol 读取
     * @param scheme
     * @returns {UploaderBuilder}
     */
    scheme(scheme: Scheme): UploaderBuilder;
    /**
     * 添加一个拦截器
     * @param interceptor
     * @returns {UploaderBuilder}
     */
    interceptor(interceptor: Interceptor): UploaderBuilder;
    /**
     * 上传失败后的重传尝试次数
     * @param retry 默认0次，不尝试次重传
     * @returns {UploaderBuilder}
     */
    retry(retry: number): UploaderBuilder;
    /**
     * 选择文件后,是否自动上传
     * @param auto 默认true
     * @returns {UploaderBuilder}
     */
    auto(auto: boolean): UploaderBuilder;
    /**
     * 是否支持多文件选择
     * @param multiple 默认true
     * @returns {UploaderBuilder}
     */
    multiple(multiple: boolean): UploaderBuilder;
    /**
     * 接受上传的文件类型
     * @param accept 数组形式例如:['.png','video/*']
     *
     * 详细配置见http://www.w3schools.com/tags/att_input_accept.asp
     *
     * @returns {UploaderBuilder}
     */
    accept(accept: string[]): UploaderBuilder;
    /**
     * 设置上传按钮
     * @param button 上传按钮ID
     * @param eventName 上传按钮的监听事件名称，默认为 "click" 。
     * @returns {UploaderBuilder}
     */
    button(button: string, eventName?: string): UploaderBuilder;
    /**
     * 图片质量压缩,只在上传的文件是图片的时候有效
     * @param compress 0-1,默认1,不压缩
     * @returns {UploaderBuilder}
     */
    compress(compress: number): UploaderBuilder;
    /**
     * 图片缩放
     * @returns {UploaderBuilder}
     * @param scale
     */
    scale(scale: number[]): UploaderBuilder;
    /**
     * 设置 saveKey
     * @param saveKey
     * @returns {UploaderBuilder}
     */
    saveKey(saveKey: boolean | string): UploaderBuilder;
    /**
     * 获取Token的地址
     * @param tokenUrl
     * @returns {UploaderBuilder}
     */
    tokenUrl(tokenUrl: string): UploaderBuilder;
    /**
     * 获取Token的函数
     * @param tokenFunc
     * @returns {UploaderBuilder}
     */
    tokenFunc(tokenFunc: Function): UploaderBuilder;
    /**
     * 上传生命周期钩子
     * @param listener
     * @returns {UploaderBuilder}
     */
    listener(listener: UploadListener): UploaderBuilder;
    /**
     * 是否分享token,如果为false每上传一个文件都需要请求一次Token。
     * @param tokenShare
     * @returns {UploaderBuilder}
     */
    tokenShare(tokenShare: boolean): UploaderBuilder;
    /**
     * 是否分块上传
     * @param chunk 默认false
     * @returns {UploaderBuilder}
     */
    chunk(chunk: boolean): UploaderBuilder;
    /**
     * 是否开启debug模式
     * @param debug 默认false
     * @returns {UploaderBuilder}
     */
    debug(debug: boolean): UploaderBuilder;
    readonly getRetry: number;
    readonly getSize: number;
    readonly getAuto: boolean;
    readonly getMultiple: boolean;
    readonly getAccept: string[];
    readonly getButton: string;
    readonly getButtonEventName: string;
    readonly getCompress: number;
    readonly getScale: number[];
    readonly getListener: UploadListener;
    readonly getSaveKey: boolean | string;
    readonly getTokenFunc: TokenFunc;
    readonly getTokenShare: boolean;
    readonly getChunk: boolean;
    readonly getIsDebug: boolean;
    readonly getInterceptors: Interceptor[];
    readonly getDomain: string;
    build(): Uploader;
}
export default UploaderBuilder;
