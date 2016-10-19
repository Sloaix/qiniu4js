/**
 * 上传任务
 */
class Task {
    private _file: File;
    private _retry: Number = 0;//已重试次数
    private _createDate: Date;//创建时间
    private _startDate: Date;//开始时间
    private _endDate: Date;//结束时间
    private _key: String;//key文件名
    private _progress: Number = 0;//任务进度,最大100
    private _isSuccess: Boolean = false;//是否上传成功
    private _result: Object;
    private _error: any;
    private _isFinish: boolean = false;//是否结束

    constructor(file: File) {
        this._file = file;
        this._createDate = new Date();
    }

    get file(): File {
        return this._file;
    }

    set file(value: File) {
        this._file = value;
    }

    get retry(): Number {
        return this._retry;
    }

    set retry(value: Number) {
        this._retry = value;
    }

    get createDate(): Date {
        return this._createDate;
    }

    set createDate(value: Date) {
        this._createDate = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get endDate(): Date {
        return this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }

    get isSuccess(): Boolean {
        return this._isSuccess;
    }

    set isSuccess(value: Boolean) {
        this._isSuccess = value;
    }

    get progress(): Number {
        return this._progress;
    }

    set progress(value: Number) {
        this._progress = Math.min(Math.max(0, value), 100);
    }


    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }

    get error() {
        return this._error;
    }

    set error(value) {
        this._error = value;
    }


    get key(): String {
        return this._key;
    }

    set key(value: String) {
        this._key = value;
    }

    get isFinish(): boolean {
        return this._isFinish;
    }

    set isFinish(value: boolean) {
        this._isFinish = value;
    }
}

export default Task;