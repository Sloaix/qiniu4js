/**
 * 上传任务
 */
declare abstract class BaseTask {
    protected _file: File;
    protected _retry: number;
    protected _createDate: Date;
    protected _startDate: Date;
    protected _endDate: Date;
    protected _key: string;
    protected _progress: number;
    protected _isSuccess: boolean;
    protected _isFinish: boolean;
    protected _result: Object;
    protected _error: any;
    constructor(file: File);
    file: File;
    retry: number;
    createDate: Date;
    startDate: Date;
    endDate: Date;
    isSuccess: boolean;
    progress: number;
    result: Object;
    error: any;
    key: string;
    isFinish: boolean;
}
export default BaseTask;
