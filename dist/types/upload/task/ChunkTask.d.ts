import BaseTask from "./BaseTask";
/**
 * 分块任务
 */
declare class ChunkTask extends BaseTask {
    private _blocks;
    private _blockSize;
    private _chunkSize;
    /**
     * 构造函数
     * @param file
     * @param blockSize 块大小
     * @param chunkSize 片大小
     */
    constructor(file: File, blockSize: number, chunkSize: number);
    /**
     * 将文件分块
     */
    spliceFile2Block(): void;
    /**
     * 获取所有的block
     * @returns {Block[]}
     */
    readonly blocks: Block[];
    /**
     * 获取正在处理的block
     * @returns {Block}
     */
    readonly processingBlock: Block;
    readonly finishedBlocksSize: number;
    readonly chunks: Chunk[];
    /**
     * 获取正在处理的chunk
     * @returns {Block}
     */
    readonly processingChunk: Chunk;
    /**
     * 总共分片数量(所有分块的分片数量总和)
     * @returns {number}
     */
    readonly totalChunkCount: number;
}
/**
 * 分块，分块大小七牛固定是4M
 */
declare class Block {
    private _data;
    private _start;
    private _end;
    private _chunks;
    private _isFinish;
    private _processing;
    private _file;
    /**
     *
     * @param start 起始位置
     * @param end 结束位置
     * @param data 块数据
     * @param chunkSize 分片数据的最大大小
     * @param file 分块所属文件
     */
    constructor(start: number, end: number, data: Blob, chunkSize: number, file: File);
    /**
     * 将块分片
     */
    private spliceBlock2Chunk(chunkSize);
    /**
     * 是否上传中
     * @returns {boolean}
     */
    processing: boolean;
    /**
     * 分块所属的文件
     * @returns {File}
     */
    readonly file: File;
    /**
     * 是否已经结束
     * @returns {boolean}
     */
    isFinish: boolean;
    /**
     * 返回分块数据
     * @returns {Blob}
     */
    readonly data: Blob;
    /**
     * 返回字节起始位置
     * @returns {number}
     */
    readonly start: number;
    /**
     * 返回字节结束位置
     * @returns {number}
     */
    readonly end: number;
    readonly chunks: Chunk[];
}
/**
 * 分片，分片大小可以自定义，至少1字节
 */
declare class Chunk {
    private _start;
    private _end;
    private _data;
    private _processing;
    private _isFinish;
    private _ctx;
    private _block;
    private _host;
    /**
     *
     * @param start 字节起始位置
     * @param end 字节结束位置
     * @param data 分片数据
     * @param block 分块对象
     */
    constructor(start: number, end: number, data: Blob, block: Block);
    /**
     * 返回chunk所属的Block对象
     * @returns {Block}
     */
    readonly block: Block;
    /**
     * 返回字节起始位置
     * @returns {number}
     */
    readonly start: number;
    /**
     * 返回字节结束位置
     * @returns {number}
     */
    readonly end: number;
    /**
     * 返回分片数据
     * @returns {Blob}
     */
    readonly data: Blob;
    /**
     * 是否已经结束
     * @returns {boolean}
     */
    isFinish: boolean;
    host: string;
    /**
     * 是否上传中
     * @returns {boolean}
     */
    processing: boolean;
    /**
     * 返回上传控制信息(七牛服务器返回前一次上传返回的分片上传控制信息,用于下一次上传,第一个chunk此值为空)
     * @returns {string}
     */
    ctx: string;
}
export { ChunkTask, Block, Chunk };
