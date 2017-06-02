import BaseTask from "./BaseTask";
/**
 * 分块任务
 */
class ChunkTask extends BaseTask {
    //分块
    private _blocks: Block[] = [];
    private _blockSize: number = 0;
    private _chunkSize: number = 0;

    /**
     * 构造函数
     * @param file
     * @param blockSize 块大小
     * @param chunkSize 片大小
     */
    constructor(file: File, blockSize: number, chunkSize: number) {
        super(file);
        this._blockSize = blockSize;
        this._chunkSize = chunkSize;
        this.spliceFile2Block();
    }

    /**
     * 将文件分块
     */
    public spliceFile2Block(): void {
        this._blocks = [];
        let fileSize: number = this._file.size;
        let file: File = this._file;
        //总块数
        let blockCount = Math.ceil(fileSize / this._blockSize);

        for (let i = 0; i < blockCount; i++) {
            let start: number = i * this._blockSize;//起始位置
            let end: number = start + this._blockSize;//结束位置
            //构造一个块实例
            let block: Block = new Block(start, end, file.slice(start, end), this._chunkSize, file);
            //添加到数组中
            this._blocks.push(block);
        }
    }

    /**
     * 获取所有的block
     * @returns {Block[]}
     */
    get blocks(): Block[] {
        return this._blocks;
    }

    /**
     * 获取正在处理的block
     * @returns {Block}
     */
    get processingBlock(): Block {
        for (let block of this._blocks) {
            if (!block.processing) {
                continue;
            }
            return block;
        }
        throw Error("找不到正在处理的Block")
    }

    get finishedBlocksSize(): number {
        let size: number = 0;
        for (let block of this._blocks) {
            size += (block.isFinish ? block.data.size : 0);
        }
        return size;
    }

    get chunks(): Chunk[] {
        let array: Chunk[] = [];
        for (let block of this._blocks) {
            for (let chunk of block.chunks) {
                array.push(chunk);
            }
        }
        return array;
    }

    /**
     * 获取正在处理的chunk
     * @returns {Block}
     */
    get processingChunk(): Chunk {
        for (let block of this._blocks) {
            if (!block.processing) {
                continue;
            }
            for (let chunk of block.chunks) {
                if (!chunk.processing) {
                    continue;
                }
                return chunk;
            }
        }
        throw Error("找不到正在处理的Chunk")
    }

    /**
     * 总共分片数量(所有分块的分片数量总和)
     * @returns {number}
     */
    get totalChunkCount(): number {
        let count = 0;
        for (let block of this._blocks) {
            count += block.chunks.length;
        }
        return count;
    }
}

/**
 * 分块，分块大小七牛固定是4M
 */
class Block {
    private _data: Blob;//块数据
    private _start: number;//起始位置
    private _end: number;//结束位置
    private _chunks: Chunk[] = [];
    private _isFinish: boolean = false;//是否上传完成
    private _processing: boolean = false;//是否正在上传
    private _file: File;

    /**
     *
     * @param start 起始位置
     * @param end 结束位置
     * @param data 块数据
     * @param chunkSize 分片数据的最大大小
     * @param file 分块所属文件
     */
    constructor(start: number, end: number, data: Blob, chunkSize: number, file: File) {
        this._data = data;
        this._start = start;
        this._end = end;
        this._file = file;
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
            let chunk: Chunk = new Chunk(start, end, data.slice(start, end), this);
            //添加到数组中
            this._chunks.push(chunk);
        }
    }

    /**
     * 是否上传中
     * @returns {boolean}
     */
    get processing(): boolean {
        return this._processing;
    }

    set processing(value: boolean) {
        this._processing = value;
    }

    /**
     * 分块所属的文件
     * @returns {File}
     */
    get file(): File {
        return this._file;
    }

    /**
     * 是否已经结束
     * @returns {boolean}
     */
    get isFinish(): boolean {
        return this._isFinish;
    }

    set isFinish(value: boolean) {
        this._isFinish = value;
    }

    /**
     * 返回分块数据
     * @returns {Blob}
     */
    get data(): Blob {
        return this._data;
    }

    /**
     * 返回字节起始位置
     * @returns {number}
     */
    get start(): number {
        return this._start;
    }

    /**
     * 返回字节结束位置
     * @returns {number}
     */
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
    private _end: number;//结束位置
    private _data: Blob;//片数据
    private _processing: boolean = false;//是否正在上传
    private _isFinish: boolean = false;//是否上传完成
    private _ctx: string;//前一次上传返回的块级上传控制信息,第一个chunk此值为空
    private _block: Block;//分片所属的块对象
    private _host: string;//前一次上传返回的指定上传地址

    /**
     *
     * @param start 字节起始位置
     * @param end 字节结束位置
     * @param data 分片数据
     * @param block 分块对象
     */
    constructor(start: number, end: number, data: Blob, block: Block) {
        this._start = start;
        this._end = end;
        this._data = data;
        this._block = block;
    }

    /**
     * 返回chunk所属的Block对象
     * @returns {Block}
     */
    get block(): Block {
        return this._block;
    }

    /**
     * 返回字节起始位置
     * @returns {number}
     */
    get start(): number {
        return this._start;
    }

    /**
     * 返回字节结束位置
     * @returns {number}
     */
    get end(): number {
        return this._end;
    }

    /**
     * 返回分片数据
     * @returns {Blob}
     */
    get data(): Blob {
        return this._data;
    }

    /**
     * 是否已经结束
     * @returns {boolean}
     */
    get isFinish(): boolean {
        return this._isFinish;
    }


    set isFinish(value: boolean) {
        this._isFinish = value;
    }


    get host(): string {
        return this._host;
    }

    set host(value: string) {
        this._host = value;
    }


    /**
     * 是否上传中
     * @returns {boolean}
     */
    get processing(): boolean {
        return this._processing;
    }

    set processing(value: boolean) {
        this._processing = value;
    }


    /**
     * 返回上传控制信息(七牛服务器返回前一次上传返回的分片上传控制信息,用于下一次上传,第一个chunk此值为空)
     * @returns {string}
     */
    get ctx(): string {
        return this._ctx;
    }

    set ctx(value: string) {
        this._ctx = value;
    }
}


export {ChunkTask, Block, Chunk};