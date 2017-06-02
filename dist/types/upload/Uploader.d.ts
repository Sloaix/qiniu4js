import BaseTask from "./task/BaseTask";
import UploaderBuilder from "./UploaderBuilder";
import Interceptor from "./interceptor/UploadInterceptor";
import UploadListener from "./hook/UploadListener";
import "../util/Polyfill";
import "babel-polyfill";
declare class Uploader {
    private FILE_INPUT_EL_ID;
    private _fileInputId;
    private _fileInput;
    private _token;
    private _taskQueue;
    private _tasking;
    private _retry;
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
    private _domain;
    constructor(builder: UploaderBuilder);
    /**
     * 初始化操作
     */
    private init();
    /**
     * 初始化file input element
     */
    private initFileInputEl();
    /**
     * 上传完成或者失败后,对本次上传任务进行清扫
     */
    private resetUploader();
    /**
     * 处理文件
     */
    private handleFiles;
    /**
     * 是否是分块任务
     * @param task
     * @returns {boolean}
     */
    private static isChunkTask(task);
    /**
     * 是否是直传任务
     * @param task
     * @returns {boolean}
     */
    private static isDirectTask(task);
    /**
     * 生成task
     */
    private generateTask();
    /**
     * 处理图片-缩放-质量压缩
     */
    private handleImages();
    /**
     * 检验选项合法性
     */
    private validateOptions();
    /**
     * 开始上传
     */
    start(): void;
    /**
     * 所有任务是否完成
     * @returns {boolean}
     */
    isTaskQueueFinish(): boolean;
    /**
     * 选择文件
     */
    chooseFile(): void;
    getToken(task: BaseTask): Promise<string>;
    requestTaskToken(task: BaseTask, url: string): Promise<string>;
    private requestToken(url, saveKey);
    private resolveSaveKey(task);
    private resolveUUID;
    private resolveImageInfo;
    private onSaveKeyResolved;
    readonly retry: number;
    readonly size: number;
    readonly auto: boolean;
    readonly multiple: boolean;
    readonly accept: string[];
    readonly compress: number;
    readonly scale: number[];
    readonly listener: UploadListener;
    readonly fileInput: HTMLInputElement;
    readonly chunk: boolean;
    readonly taskQueue: BaseTask[];
    tasking: boolean;
    readonly interceptors: Interceptor[];
    readonly domain: string;
}
export default Uploader;
