import Task from "./DirectTask";
/**
 * 分块任务
 */
class ChunkTask extends Task {
    //分块
    private _blocks: Block[] = [];
    private _lastBlock: Block;//最后一次上传的block

    /**
     * 构造函数
     * @param file
     * @param blockSize 块大小
     * @param chunkSize 片大小
     */
    constructor(file: File, blockSize: number, chunkSize: number) {
        super.constructor(file);
        this.spliceFile2Block(blockSize, chunkSize);
    }

    /**
     * 将文件分块
     */
    private spliceFile2Block(blockSize: number, chunkSize: number): void {
        let fileSize: number = this.file.size;
        let file: File = this.file;
        //总块数
        let blockCount = Math.ceil(fileSize / blockSize);

        for (let i = 0; i < blockCount; i++) {
            let start: number = i * blockSize;//起始位置
            let end: number = start + blockSize;//结束位置
            //构造一个块实例
            let block: Block = new Block(start, end, file.slice(start, end), chunkSize);
            //添加到数组中
            this._blocks.push(block);
        }
    }

    get blocks(): Block[] {
        return this._blocks;
    }

    get lastBlock(): Block {
        return this._lastBlock;
    }
}

/**
 * 分块，分块大小七牛固定是4M
 */
class Block {
    private _data: Blob;//块数据
    private _start: number;//起始位置
    private _end: number;//结束为止
    private _chunks: Chunk[] = [];

    constructor(start: number, end: number, data: Blob, chunkSize: number) {
        this._data = data;
        this._start = start;
        this._end = end;
        this.spliceBlock2Chunk(chunkSize);
    }

    /**
     * 将块分片
     */
    private spliceBlock2Chunk(chunkSize: number): void {
        let blockSize: number = this._data.size;
        let data: Blob = this._data;
        //总片数
        let chunkCount = Math.ceil(blockSize / chunkSize);
        for (let i: number = 0; i < chunkCount; i++) {
            let start: number = i * chunkSize;//起始位置
            let end: number = start + chunkSize;//结束位置
            //构造一个片实例
            let chunk: Chunk = new Chunk(start, end, data.slice(start, end));
            //添加到数组中
            this._chunks.push(chunk);
        }
    }

    get data(): Blob {
        return this._data;
    }

    get start(): number {
        return this._start;
    }

    get end(): number {
        return this._end;
    }

    get chunks(): Chunk[] {
        return this._chunks;
    }
}

/**
 * 分片，分片大小可以自定义，至少1字节
 */
class Chunk {
    private _start: number;//起始位置
    private _end: number;//结束为止
    private _data: Blob;//片数据
    private _isFinish: boolean = false;//是否上传完成
    private _ctx: string;//前一次上传返回的块级上传控制信息,第一个chunk此值为空

    constructor(start: number, end: number, data: Blob) {
        this._start = start;
        this._end = end;
        this._data = data;
    }

    get start(): number {
        return this._start;
    }

    get end(): number {
        return this._end;
    }

    get data(): Blob {
        return this._data;
    }

    get isFinish(): boolean {
        return this._isFinish;
    }

    set isFinish(value: boolean) {
        this._isFinish = value;
    }


    get ctx(): string {
        return this._ctx;
    }

    set ctx(value: string) {
        this._ctx = value;
    }
}


export {ChunkTask, Block, Chunk};