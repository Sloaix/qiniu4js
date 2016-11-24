function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * 上传任务
 */
var BaseTask = (function () {
    function BaseTask(file) {
        this._retry = 0; //已重试次数
        this._progress = 0; //任务进度,最大100
        this._isSuccess = false; //是否上传成功
        this._isFinish = false; //是否结束
        this._file = file;
        this._createDate = new Date();
    }
    Object.defineProperty(BaseTask.prototype, "file", {
        get: function () {
            return this._file;
        },
        set: function (file) {
            this._file = file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "retry", {
        get: function () {
            return this._retry;
        },
        set: function (value) {
            this._retry = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "createDate", {
        get: function () {
            return this._createDate;
        },
        set: function (value) {
            this._createDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (value) {
            this._startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (value) {
            this._endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "isSuccess", {
        get: function () {
            return this._isSuccess;
        },
        set: function (value) {
            this._isSuccess = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            this._progress = Math.min(Math.max(0, value), 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "result", {
        get: function () {
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "error", {
        get: function () {
            return this._error;
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTask.prototype, "isFinish", {
        get: function () {
            return this._isFinish;
        },
        set: function (value) {
            this._isFinish = value;
        },
        enumerable: true,
        configurable: true
    });
    return BaseTask;
}());

/**
 * 直传任务
 */
var DirectTask = (function (_super) {
    __extends(DirectTask, _super);
    function DirectTask() {
        return _super.apply(this, arguments) || this;
    }
    return DirectTask;
}(BaseTask));

/**
 * 分块任务
 */
var ChunkTask = (function (_super) {
    __extends(ChunkTask, _super);
    /**
     * 构造函数
     * @param file
     * @param blockSize 块大小
     * @param chunkSize 片大小
     */
    function ChunkTask(file, blockSize, chunkSize) {
        var _this = _super.call(this, file) || this;
        //分块
        _this._blocks = [];
        _this._blockSize = 0;
        _this._chunkSize = 0;
        _this._blockSize = blockSize;
        _this._chunkSize = chunkSize;
        _this.spliceFile2Block();
        return _this;
    }
    /**
     * 将文件分块
     */
    ChunkTask.prototype.spliceFile2Block = function () {
        this._blocks = [];
        var fileSize = this._file.size;
        var file = this._file;
        //总块数
        var blockCount = Math.ceil(fileSize / this._blockSize);
        for (var i = 0; i < blockCount; i++) {
            var start = i * this._blockSize; //起始位置
            var end = start + this._blockSize; //结束位置
            //构造一个块实例
            var block = new Block(start, end, file.slice(start, end), this._chunkSize, file);
            //添加到数组中
            this._blocks.push(block);
        }
    };
    Object.defineProperty(ChunkTask.prototype, "blocks", {
        /**
         * 获取所有的block
         * @returns {Block[]}
         */
        get: function () {
            return this._blocks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkTask.prototype, "processingBlock", {
        /**
         * 获取正在处理的block
         * @returns {Block}
         */
        get: function () {
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                if (!block.processing) {
                    continue;
                }
                return block;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkTask.prototype, "finishedBlocksSize", {
        get: function () {
            var size = 0;
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                size += (block.isFinish ? block.data.size : 0);
            }
            return size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkTask.prototype, "chunks", {
        get: function () {
            var array = [];
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                for (var _b = 0, _c = block.chunks; _b < _c.length; _b++) {
                    var chunk = _c[_b];
                    array.push(chunk);
                }
            }
            return array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkTask.prototype, "processingChunk", {
        /**
         * 获取正在处理的chunk
         * @returns {Block}
         */
        get: function () {
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                if (!block.processing) {
                    continue;
                }
                for (var _b = 0, _c = block.chunks; _b < _c.length; _b++) {
                    var chunk = _c[_b];
                    if (!chunk.processing) {
                        continue;
                    }
                    return chunk;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkTask.prototype, "totalChunkCount", {
        /**
         * 总共分片数量(所有分块的分片数量总和)
         * @returns {number}
         */
        get: function () {
            var count = 0;
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                count += block.chunks.length;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    return ChunkTask;
}(BaseTask));
/**
 * 分块，分块大小七牛固定是4M
 */
var Block = (function () {
    /**
     *
     * @param start 起始位置
     * @param end 结束位置
     * @param data 块数据
     * @param chunkSize 分片数据的最大大小
     * @param file 分块所属文件
     */
    function Block(start, end, data, chunkSize, file) {
        this._chunks = [];
        this._isFinish = false; //是否上传完成
        this._processing = false; //是否正在上传
        this._data = data;
        this._start = start;
        this._end = end;
        this._file = file;
        this.spliceBlock2Chunk(chunkSize);
    }
    /**
     * 将块分片
     */
    Block.prototype.spliceBlock2Chunk = function (chunkSize) {
        var blockSize = this._data.size;
        var data = this._data;
        //总片数
        var chunkCount = Math.ceil(blockSize / chunkSize);
        for (var i = 0; i < chunkCount; i++) {
            var start = i * chunkSize; //起始位置
            var end = start + chunkSize; //结束位置
            //构造一个片实例
            var chunk = new Chunk(start, end, data.slice(start, end), this);
            //添加到数组中
            this._chunks.push(chunk);
        }
    };
    Object.defineProperty(Block.prototype, "processing", {
        /**
         * 是否上传中
         * @returns {boolean}
         */
        get: function () {
            return this._processing;
        },
        set: function (value) {
            this._processing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "file", {
        /**
         * 分块所属的文件
         * @returns {File}
         */
        get: function () {
            return this._file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "isFinish", {
        /**
         * 是否已经结束
         * @returns {boolean}
         */
        get: function () {
            return this._isFinish;
        },
        set: function (value) {
            this._isFinish = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "data", {
        /**
         * 返回分块数据
         * @returns {Blob}
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "start", {
        /**
         * 返回字节起始位置
         * @returns {number}
         */
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "end", {
        /**
         * 返回字节结束位置
         * @returns {number}
         */
        get: function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "chunks", {
        get: function () {
            return this._chunks;
        },
        enumerable: true,
        configurable: true
    });
    return Block;
}());
/**
 * 分片，分片大小可以自定义，至少1字节
 */
var Chunk = (function () {
    /**
     *
     * @param start 字节起始位置
     * @param end 字节结束位置
     * @param data 分片数据
     * @param block 分块对象
     */
    function Chunk(start, end, data, block) {
        this._processing = false; //是否正在上传
        this._isFinish = false; //是否上传完成
        this._start = start;
        this._end = end;
        this._data = data;
        this._block = block;
    }
    Object.defineProperty(Chunk.prototype, "block", {
        /**
         * 返回chunk所属的Block对象
         * @returns {Block}
         */
        get: function () {
            return this._block;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "start", {
        /**
         * 返回字节起始位置
         * @returns {number}
         */
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "end", {
        /**
         * 返回字节结束位置
         * @returns {number}
         */
        get: function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "data", {
        /**
         * 返回分片数据
         * @returns {Blob}
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "isFinish", {
        /**
         * 是否已经结束
         * @returns {boolean}
         */
        get: function () {
            return this._isFinish;
        },
        set: function (value) {
            this._isFinish = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "host", {
        get: function () {
            return this._host;
        },
        set: function (value) {
            this._host = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "processing", {
        /**
         * 是否上传中
         * @returns {boolean}
         */
        get: function () {
            return this._processing;
        },
        set: function (value) {
            this._processing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "ctx", {
        /**
         * 返回上传控制信息(七牛服务器返回前一次上传返回的分片上传控制信息,用于下一次上传,第一个chunk此值为空)
         * @returns {string}
         */
        get: function () {
            return this._ctx;
        },
        set: function (value) {
            this._ctx = value;
        },
        enumerable: true,
        configurable: true
    });
    return Chunk;
}());

/**
 * UploaderBuilder
 *
 */
var UploaderBuilder = (function () {
    function UploaderBuilder() {
        this._retry = 0; //最大重试次数
        this._domain = UploaderBuilder.UPLOAD_URL; //上传域名
        this._size = 1024 * 1024; //分片大小,单位字节,上限4m,不能为0
        this._chunk = true; //分块上传
        this._auto = true; //自动上传,每次选择文件后
        this._multiple = true; //是否支持多文件
        this._accept = []; //接受的文件类型
        this._compress = 1; //图片压缩质量
        this._scale = [0, 0]; //缩放大小,限定高度等比[h:200,w:0],限定宽度等比[h:0,w:100],限定长宽[h:200,w:100]
        this._tokenShare = true; //分享token,如果为false,每一次HTTP请求都需要新获取Token
        this._interceptors = []; //任务拦截器
        this._isDebug = false; //
    }
    /**
     * 设置上传的域名,默认是http://upload.qiniu.com/
     * @param domain
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.domain = function (domain) {
        this._domain = domain.endsWith('/') ? domain.substring(0, domain.length - 1) : domain;
        return this;
    };
    /**
     * 添加一个拦截器
     * @param interceptor
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.interceptor = function (interceptor) {
        this._interceptors.push(interceptor);
        return this;
    };
    /**
     * 上传失败后的重传尝试次数
     * @param retry 默认0次，不尝试次重传
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.retry = function (retry) {
        this._retry = retry;
        return this;
    };
    /**
     * 设置分片大小
     * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.size = function (size) {
        this._size = Math.min(Math.max(size, 1), UploaderBuilder.MAX_CHUNK_SIZE);
        return this;
    };
    /**
     * 选择文件后,是否自动上传
     * @param auto 默认true
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.auto = function (auto) {
        this._auto = auto;
        return this;
    };
    /**
     * 是否支持多文件选择
     * @param multiple 默认true
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.multiple = function (multiple) {
        this._multiple = multiple;
        return this;
    };
    /**
     * 接受上传的文件类型
     * @param accept 数组形式例如:['.png','video/*']
     *
     * 详细配置见http://www.w3schools.com/tags/att_input_accept.asp
     *
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.accept = function (accept) {
        this._accept = accept;
        return this;
    };
    /**
     * 图片质量压缩,只在上传的文件是图片的时候有效
     * @param compress 0-1,默认1,不压缩
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.compress = function (compress) {
        this._compress = Math.max(Math.min(compress, 1), 0);
        return this;
    };
    /**
     * 图片缩放
     * @returns {UploaderBuilder}
     * @param scale
     */
    UploaderBuilder.prototype.scale = function (scale) {
        this._scale = scale;
        return this;
    };
    /**
     * 获取Token的函数
     * @param tokenFunc
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.tokenFunc = function (tokenFunc) {
        this._tokenFunc = tokenFunc;
        return this;
    };
    /**
     * 上传生命周期钩子
     * @param listener
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.listener = function (listener) {
        this._listener = listener;
        return this;
    };
    /**
     * 是否分享token,如果为false每上传一个文件都需要请求一次Token。
     * @param tokenShare
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.tokenShare = function (tokenShare) {
        this._tokenShare = tokenShare;
        return this;
    };
    /**
     * 是否分块上传
     * @param chunk 默认false
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.chunk = function (chunk) {
        this._chunk = chunk;
        return this;
    };
    /**
     * 是否开启debug模式
     * @param debug 默认false
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.debug = function (debug) {
        this._isDebug = debug;
        return this;
    };
    Object.defineProperty(UploaderBuilder.prototype, "getRetry", {
        get: function () {
            return this._retry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getSize", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getAuto", {
        get: function () {
            return this._auto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getMultiple", {
        get: function () {
            return this._multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getAccept", {
        get: function () {
            return this._accept;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getCompress", {
        get: function () {
            return this._compress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getScale", {
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getListener", {
        get: function () {
            return this._listener;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getTokenFunc", {
        get: function () {
            return this._tokenFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getTokenShare", {
        get: function () {
            return this._tokenShare;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getChunk", {
        get: function () {
            return this._chunk;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getIsDebug", {
        get: function () {
            return this._isDebug;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getInterceptors", {
        get: function () {
            return this._interceptors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderBuilder.prototype, "getDomain", {
        get: function () {
            return this._domain;
        },
        enumerable: true,
        configurable: true
    });
    UploaderBuilder.prototype.build = function () {
        return new Uploader(this);
    };
    return UploaderBuilder;
}());
UploaderBuilder.MAX_CHUNK_SIZE = 4 * 1024 * 1024; //分片最大值
UploaderBuilder.BLOCK_SIZE = UploaderBuilder.MAX_CHUNK_SIZE; //分块大小，只有大于这个数才需要分块
UploaderBuilder.UPLOAD_URL = 'http://upload.qiniu.com';

var Debug = (function () {
    function Debug() {
    }
    Object.defineProperty(Debug, "enable", {
        get: function () {
            return this._enable;
        },
        set: function (value) {
            this._enable = value;
        },
        enumerable: true,
        configurable: true
    });
    Debug.d = function (object) {
        if (!Debug._enable) {
            return;
        }
        console.debug(object);
    };
    
    Debug.l = function (object) {
        if (!Debug._enable) {
            return;
        }
        console.log(object);
    };
    Debug.e = function (object) {
        if (!Debug._enable) {
            return;
        }
        console.error(object);
    };
    Debug.w = function (object) {
        if (!Debug._enable) {
            return;
        }
        console.warn(object);
    };
    Debug.i = function (object) {
        if (!Debug._enable) {
            return;
        }
        console.info(object);
    };
    return Debug;
}());
Debug._enable = true;

var SimpleUploadListener = (function () {
    function SimpleUploadListener() {
    }
    SimpleUploadListener.prototype.onReady = function (taskQueue) {
    };
    SimpleUploadListener.prototype.onStart = function (taskQueue) {
    };
    SimpleUploadListener.prototype.onTaskProgress = function (task) {
    };
    SimpleUploadListener.prototype.onTaskGetKey = function (task) {
        return null;
    };
    SimpleUploadListener.prototype.onTaskFail = function (task) {
    };
    SimpleUploadListener.prototype.onTaskSuccess = function (task) {
    };
    SimpleUploadListener.prototype.onTaskRetry = function (task) {
    };
    SimpleUploadListener.prototype.onFinish = function (taskQueue) {
    };
    return SimpleUploadListener;
}());

/**
 * 直接上传
 */
var DirectUploadPattern = (function () {
    function DirectUploadPattern() {
    }
    DirectUploadPattern.prototype.init = function (uploader) {
        this.uploader = uploader;
    };
    /**
     * 实现接口的上传方法
     * @param task
     */
    DirectUploadPattern.prototype.upload = function (task) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        //上传中
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var progress = Math.round((e.loaded * 100) / e.total);
                if (task.progress < progress) {
                    task.progress = progress;
                    _this.uploader.listener.onTaskProgress(task);
                }
            }
        };
        //上传完成
        xhr.upload.onload = function () {
            if (task.progress < 100) {
                task.progress = 100;
                _this.uploader.listener.onTaskProgress(task);
            }
        };
        var url = this.uploader.domain;
        //避免浏览器缓存http请求
        url += ((/\?/).test(this.uploader.domain) ? "&" : "?") + (new Date()).getTime();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 && xhr.responseText != '') {
                    task.result = JSON.parse(xhr.responseText);
                    task.isSuccess = true;
                    task.isFinish = true;
                    task.endDate = new Date();
                    _this.uploader.listener.onTaskSuccess(task);
                }
                else if (_this.retryTask(task)) {
                    Debug.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                    _this.uploader.listener.onTaskRetry(task);
                }
                else {
                    Debug.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25");
                    task.error = xhr.response;
                    task.isSuccess = false;
                    task.isFinish = true;
                    task.endDate = new Date();
                    _this.uploader.listener.onTaskFail(task);
                }
                //所有任务都结束了
                if (_this.uploader.isTaskQueueFinish()) {
                    //更改任务执行中标志
                    _this.uploader.tasking = false;
                    //onFinish callback
                    _this.uploader.listener.onFinish(_this.uploader.taskQueue);
                }
            }
        };
        if (this.uploader.tokenShare && this.uploader.token) {
            Debug.d("\u4F7F\u7528\u4E0A\u6B21token\u8FDB\u884C\u4E0A\u4F20");
            task.startDate = new Date();
            var formData = DirectUploadPattern.createFormData(task, this.uploader.token);
            xhr.send(formData);
        }
        else {
            Debug.d("\u5F00\u59CB\u83B7\u53D6\u4E0A\u4F20token");
            this.uploader.tokenFunc(function (token) {
                Debug.d("\u4E0A\u4F20token\u83B7\u53D6\u6210\u529F " + token);
                _this.uploader.token = token;
                task.startDate = new Date();
                var formData = DirectUploadPattern.createFormData(task, _this.uploader.token);
                xhr.send(formData);
            }, task);
        }
    };
    /**
     * 创建表单
     * @param task
     * @param token
     * @returns {FormData}
     */
    DirectUploadPattern.createFormData = function (task, token) {
        var formData = new FormData();
        //key存在，添加到formData中，若不设置，七牛服务器会自动生成hash key
        if (task.key !== null && task.key !== undefined) {
            formData.append('key', task.key);
        }
        formData.append('token', token);
        formData.append('file', task.file);
        Debug.d("\u521B\u5EFAformData\u5BF9\u8C61");
        return formData;
    };
    /**
     * 重传
     * @param task
     * @returns {boolean}
     */
    DirectUploadPattern.prototype.retryTask = function (task) {
        //达到重试次数
        if (task.retry >= this.uploader.retry) {
            Debug.w(task.file.name + "\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650" + this.uploader.retry + ",\u505C\u6B62\u91CD\u4F20");
            return false;
        }
        task.retry++;
        Debug.w(task.file.name + "\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570" + task.retry);
        this.upload(task);
        return true;
    };
    return DirectUploadPattern;
}());

/**
 * 分块上传
 */
var ChunkUploadPattern = (function () {
    function ChunkUploadPattern() {
    }
    ChunkUploadPattern.prototype.init = function (uploader) {
        this.uploader = uploader;
    };
    ChunkUploadPattern.prototype.upload = function (task) {
        var _this = this;
        this.task = task;
        if (this.uploader.tokenShare && this.uploader.token) {
            task.startDate = new Date();
            this.uploadBlock(this.uploader.token);
        }
        else {
            Debug.d("\u5F00\u59CB\u83B7\u53D6token");
            this.uploader.tokenFunc(function (token) {
                Debug.d("token\u83B7\u53D6\u6210\u529F " + token);
                _this.uploader.token = token;
                task.startDate = new Date();
                _this.uploadBlock(token);
            }, task);
        }
    };
    ChunkUploadPattern.prototype.uploadBlock = function (token) {
        var _this = this;
        var chain = Promise.resolve();
        for (var _i = 0, _a = this.task.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            var _loop_1 = function (chunk) {
                chain = chain.then(function () {
                    return _this.uploadChunk(chunk, _this.uploader.token);
                });
            };
            for (var _b = 0, _c = block.chunks; _b < _c.length; _b++) {
                var chunk = _c[_b];
                _loop_1(chunk);
            }
        }
        chain.then(function () {
            return _this.concatChunks(token);
        }).then(function () {
            //所有任务都结束了
            if (_this.uploader.isTaskQueueFinish()) {
                //更改任务执行中标志
                _this.uploader.tasking = false;
                //监听器调用
                _this.uploader.listener.onFinish(_this.uploader.taskQueue);
            }
        })["catch"](function (response) {
            Debug.w(_this.task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25");
            _this.task.error = response;
            _this.task.isSuccess = false;
            _this.task.isFinish = true;
            _this.task.endDate = new Date();
            _this.uploader.listener.onTaskFail(_this.task);
        });
    };
    ChunkUploadPattern.prototype.uploadChunk = function (chunk, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isFirstChunkInBlock = chunk.block.chunks.indexOf(chunk) == 0;
            var chunkIndex = chunk.block.chunks.indexOf(chunk);
            //前一个chunk,如果存在的话
            var prevChunk = isFirstChunkInBlock ? null : chunk.block.chunks[chunkIndex - 1];
            var url = isFirstChunkInBlock ? _this.getUploadBlockUrl(chunk.block.data.size) : _this.getUploadChunkUrl(chunk.start, prevChunk ? prevChunk.ctx : null, prevChunk ? prevChunk.host : null);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream'); //设置contentType
            xhr.setRequestHeader('Authorization', "UpToken " + token); //添加token验证头
            //分片上传中
            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var progress = Math.round(((_this.task.finishedBlocksSize + chunk.start + e.loaded) / _this.task.file.size) * 100);
                    if (_this.task.progress < progress) {
                        _this.task.progress = progress;
                        _this.uploader.listener.onTaskProgress(_this.task);
                    }
                }
            };
            //分片上传完成
            xhr.upload.onload = function () {
                var progress = Math.round(((_this.task.finishedBlocksSize + chunk.start + chunk.data.size) / _this.task.file.size) * 100);
                if (_this.task.progress < progress) {
                    _this.task.progress = progress;
                    _this.uploader.listener.onTaskProgress(_this.task);
                }
            };
            //响应返回
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200 && xhr.responseText != '') {
                        var result = JSON.parse(xhr.responseText);
                        chunk.isFinish = true;
                        chunk.processing = false;
                        chunk.ctx = result.ctx;
                        chunk.host = result.host;
                        var chunkIndex_1 = chunk.block.chunks.indexOf(chunk);
                        var hasNextChunkInThisBlock = chunkIndex_1 != chunk.block.chunks.length - 1;
                        if (!hasNextChunkInThisBlock) {
                            chunk.block.isFinish = true;
                            chunk.block.processing = false;
                        }
                        resolve();
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send(chunk.data);
        });
    };
    ChunkUploadPattern.prototype.concatChunks = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var encodedKey = _this.task.key ? btoa(encodeURIComponent(_this.task.key)) : null;
            var url = _this.getMakeFileUrl(_this.task.file.size, encodedKey);
            //构建所有数据块最后一个数据片上传后得到的<ctx>的组合成的列表字符串
            var ctxListString = '';
            for (var _i = 0, _a = _this.task.blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                var lastChunk = block.chunks[block.chunks.length - 1];
                ctxListString += lastChunk.ctx + ',';
            }
            if (ctxListString.endsWith(',')) {
                ctxListString = ctxListString.substring(0, ctxListString.length - 1);
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
            xhr.setRequestHeader('Content-Type', 'text/plain'); //设置contentType
            xhr.setRequestHeader('Authorization', "UpToken " + token); //添加token验证头
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    _this.task.isFinish = true;
                    if (xhr.status == 200 && xhr.responseText != '') {
                        var result = JSON.parse(xhr.responseText);
                        _this.task.isSuccess = true;
                        _this.task.result = result;
                        _this.task.endDate = new Date();
                        _this.uploader.listener.onTaskSuccess(_this.task);
                        resolve();
                    }
                    else if (_this.retryTask(_this.task)) {
                        Debug.w(_this.task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                        _this.uploader.listener.onTaskRetry(_this.task);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send(ctxListString);
        });
    };
    /**
     * 获取块上传的url
     * @param blockSize
     * @returns {string}
     */
    ChunkUploadPattern.prototype.getUploadBlockUrl = function (blockSize) {
        return this.uploader.domain + "/mkblk/" + blockSize;
    };
    /**
     * 获取片上传的url
     * @param start 片的在块中的起始位置
     * @param ctx 前一次上传返回的块级上传控制信息。
     * @param host 指定host
     */
    ChunkUploadPattern.prototype.getUploadChunkUrl = function (start, ctx, host) {
        return (host ? host : this.uploader.domain) + "/bput/" + ctx + "/" + start + "/";
    };
    /**
     * 获取合并块为文件的url
     * @param fileSize 文件大小
     * @param encodedKey base64UrlEncode后的资源名称,若未指定，则使用saveKey；若未指定saveKey，则使用资源内容的SHA1值作为资源名。
     * @returns {string}
     */
    ChunkUploadPattern.prototype.getMakeFileUrl = function (fileSize, encodedKey) {
        if (encodedKey) {
            return this.uploader.domain + "/mkfile/" + fileSize + "/key/" + encodedKey;
        }
        else {
            return this.uploader.domain + "/mkfile/" + fileSize;
        }
    };
    ChunkUploadPattern.prototype.retryTask = function (task) {
        //达到重试次数
        if (task.retry >= this.uploader.retry) {
            Debug.w(task.file.name + "\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650" + this.uploader.retry + ",\u505C\u6B62\u91CD\u4F20");
            return false;
        }
        task.retry++;
        Debug.w(task.file.name + "\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570" + task.retry);
        // this.upload(task);
        //todo
        return true;
    };
    return ChunkUploadPattern;
}());

/**
 * Object.assign polyfill
 */
if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
/**
 * canvas.toBlob polyfill
 */
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1]), len = binStr.length, arr = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: type || 'image/png' }));
        }
    });
}
/**
 * endsWith polyfill
 */
if (!String.prototype.endsWith) {
    var toString_1 = {}.toString;
    var endsWith = function (search) {
        if (this == null) {
            throw TypeError();
        }
        var string = String(this);
        if (search && toString_1.call(search) == '[object RegExp]') {
            throw TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var pos = stringLength;
        if (arguments.length > 1) {
            var position = arguments[1];
            if (position !== undefined) {
                // `ToInteger`
                pos = position ? Number(position) : 0;
                if (pos != pos) {
                    pos = 0;
                }
            }
        }
        var end = Math.min(Math.max(pos, 0), stringLength);
        var start = end - searchLength;
        if (start < 0) {
            return false;
        }
        var index = -1;
        while (++index < searchLength) {
            if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                return false;
            }
        }
        return true;
    };
    if (Object.defineProperty) {
        Object.defineProperty(String.prototype, 'endsWith', {
            'value': endsWith,
            'configurable': true,
            'writable': true
        });
    }
    else {
        String.prototype.endsWith = endsWith;
    }
}

var Uploader = (function () {
    function Uploader(builder) {
        var _this = this;
        this.FILE_INPUT_EL_ID = 'qiniu4js-input';
        this._taskQueue = []; //任务队列
        this._tasking = false; //任务执行中
        this._scale = []; //缩放大小,限定高度等比缩放[h:200,w:0],限定宽度等比缩放[h:0,w:100],限定长宽[h:200,w:100]
        /**
         * 处理文件
         */
        this.handleFiles = function () {
            //如果没有选中文件就返回
            if (_this.fileInput.files.length == 0) {
                return;
            }
            //生成task
            _this.generateTask();
            //是否中断任务
            var isInterrupt = false;
            //任务拦截器过滤
            for (var _i = 0, _a = _this.taskQueue; _i < _a.length; _i++) {
                var task = _a[_i];
                for (var _b = 0, _c = _this.interceptors; _b < _c.length; _b++) {
                    var interceptor = _c[_b];
                    //拦截生效
                    if (interceptor.onIntercept(task)) {
                        //从任务队列中去除任务
                        _this.taskQueue.splice(_this.taskQueue.indexOf(task), 1);
                        Debug.d("任务拦截器拦截了任务:");
                        Debug.d(task);
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
                Debug.w("任务拦截器中断了任务队列");
                return;
            }
            //回调函数函数
            _this.listener.onReady(_this.taskQueue);
            //处理图片
            _this.handleImages().then(function () {
                //自动上传
                if (_this.auto) {
                    Debug.d("开始自动上传");
                    _this.start();
                }
            });
        };
        this._retry = builder.getRetry;
        this._size = builder.getSize;
        this._chunk = builder.getChunk;
        this._auto = builder.getAuto;
        this._multiple = builder.getMultiple;
        this._accept = builder.getAccept;
        this._compress = builder.getCompress;
        this._scale = builder.getScale;
        this._tokenFunc = builder.getTokenFunc;
        this._tokenShare = builder.getTokenShare;
        this._listener = Object.assign(new SimpleUploadListener(), builder.getListener);
        console.log(this._listener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
        this._fileInputId = this.FILE_INPUT_EL_ID + "_" + new Date().getTime();
        Debug.enable = builder.getIsDebug;
        this.validateOptions();
        this.init();
    }
    /**
     * 初始化操作
     */
    Uploader.prototype.init = function () {
        this.initFileInputEl();
        this.initUploadPattern();
    };
    /**
     * 初始化上传模式
     */
    Uploader.prototype.initUploadPattern = function () {
        this._directUploadPattern = new DirectUploadPattern();
        this._directUploadPattern.init(this);
        this._chunkUploadPattern = new ChunkUploadPattern();
        this._chunkUploadPattern.init(this);
    };
    /**
     * 初始化file input element
     */
    Uploader.prototype.initFileInputEl = function () {
        //查询已经存在的file input
        var exist = document.getElementById(this._fileInputId);
        //创建input元素
        this._fileInput = exist ? exist : document.createElement('input');
        this.fileInput.type = 'file'; //type file
        this.fileInput.id = this._fileInputId; //id 方便后面查找
        this.fileInput.style.display = 'none'; //隐藏file input
        //多文件
        if (this.multiple) {
            //多文件
            this.fileInput.multiple = true;
        }
        //文件类型
        if (this.accept && this.accept.length != 0) {
            var acceptValue = '';
            for (var _i = 0, _a = this.accept; _i < _a.length; _i++) {
                var value = _a[_i];
                acceptValue += value;
                acceptValue += ',';
            }
            if (acceptValue.endsWith(',')) {
                acceptValue = acceptValue.substring(0, acceptValue.length - 1);
            }
            this.fileInput.accept = acceptValue;
            Debug.d("accept\u7C7B\u578B " + acceptValue);
        }
        //将input元素添加到body子节点的末尾
        document.body.appendChild(this.fileInput);
        //选择文件监听器
        this.fileInput.addEventListener('change', this.handleFiles, false);
    };
    /**
     * 上传完成或者失败后,对本次上传任务进行清扫
     */
    Uploader.prototype.resetUploader = function () {
        this.taskQueue.length = 0;
        this._token = null;
        Debug.d("uploader已重置");
    };
    /**
     * 是否是分块任务
     * @param task
     * @returns {boolean}
     */
    Uploader.isChunkTask = function (task) {
        return task.constructor.name === ChunkTask.name && task instanceof ChunkTask;
    };
    /**
     * 是否是直传任务
     * @param task
     * @returns {boolean}
     */
    Uploader.isDirectTask = function (task) {
        return task.constructor.name === DirectTask.name && task instanceof DirectTask;
    };
    /**
     * 生成task
     */
    Uploader.prototype.generateTask = function () {
        this.resetUploader();
        var files = this.fileInput.files;
        //遍历files 创建上传任务
        for (var i = 0; i < this.fileInput.files.length; i++) {
            var file = files[i];
            var task = void 0;
            //只有在开启分块上传，并且文件大小大于4mb的时候才进行分块上传
            if (this.chunk && file.size > UploaderBuilder.BLOCK_SIZE) {
                task = new ChunkTask(file, UploaderBuilder.BLOCK_SIZE, this.size);
            }
            else {
                task = new DirectTask(file);
            }
            task.key = this.listener.onTaskGetKey(task);
            this.taskQueue.push(task);
        }
    };
    /**
     * 处理图片-缩放-质量压缩
     */
    Uploader.prototype.handleImages = function () {
        var promises = [];
        if (this.compress != 1 || this.scale[0] != 0 || this.scale[1] != 0) {
            var _loop_1 = function (task) {
                if (!task.file.type.match('image.*')) {
                    return "continue";
                }
                Debug.d(task.file.name + " \u5904\u7406\u524D\u7684\u56FE\u7247\u5927\u5C0F:" + task.file.size / 1024 + "kb");
                var canvas = document.createElement('canvas');
                var img = new Image();
                var ctx = canvas.getContext('2d');
                img.src = URL.createObjectURL(task.file);
                var _this = this_1;
                promises.push(new Promise(function (resolve) {
                    return img.onload = function () {
                        var imgW = img.width;
                        var imgH = img.height;
                        var scaleW = _this.scale[0];
                        var scaleH = _this.scale[1];
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
                        canvas.toBlob(function (blob) {
                            resolve(blob);
                            Debug.d(task.file.name + " \u5904\u7406\u540E\u7684\u56FE\u7247\u5927\u5C0F:" + blob.size / 1024 + "kb");
                        }, "image/jpeg", _this.compress * 0.95);
                    };
                }).then(function (blob) {
                    blob.name = task.file.name;
                    task.file = blob;
                    if (Uploader.isChunkTask(task)) {
                        task.spliceFile2Block();
                    }
                }));
            };
            var this_1 = this;
            for (var _i = 0, _a = this.taskQueue; _i < _a.length; _i++) {
                var task = _a[_i];
                _loop_1(task);
            }
        }
        return Promise.all(promises);
    };
    /**
     * 检验选项合法性
     */
    Uploader.prototype.validateOptions = function () {
        if (!this.tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
        }
        if (!this.scale || !this.scale instanceof Array || this.scale.length != 2 || this.scale[0] < 0 || this.scale[1] < 0) {
            throw new Error('scale必须是长度为2的number类型的数组,scale[0]为宽度，scale[1]为长度,必须大于等于0');
        }
    };
    /**
     * 开始上传
     */
    Uploader.prototype.start = function () {
        if (this.fileInput.files.length == 0) {
            throw new Error('没有选中的文件，无法start');
        }
        if (this.tasking) {
            throw new Error('任务执行中，请不要重复start');
        }
        this.listener.onStart(this.taskQueue);
        //遍历任务队列
        for (var _i = 0, _a = this.taskQueue; _i < _a.length; _i++) {
            var task = _a[_i];
            Debug.d("\u6587\u4EF6-\u300E" + task.file.name + "\u300F-" + task.file.size + "byte-" + task.file.size / 1024 + "kb-" + task.file.size / 1024 / 1024 + "mb");
            //根据任务的类型调用不同的上传模式进行上传
            if (Uploader.isDirectTask(task)) {
                //直传
                this._directUploadPattern.upload(task);
            }
            else if (Uploader.isChunkTask(task)) {
                //分块上传
                this._chunkUploadPattern.upload(task);
            }
            else {
                throw new Error('非法的task类型');
            }
        }
    };
    /**
     * 所有任务是否完成
     * @returns {boolean}
     */
    Uploader.prototype.isTaskQueueFinish = function () {
        for (var _i = 0, _a = this.taskQueue; _i < _a.length; _i++) {
            var task = _a[_i];
            if (!task.isFinish) {
                return false;
            }
        }
        return true;
    };
    /**
     * 选择文件
     */
    Uploader.prototype.chooseFile = function () {
        this.fileInput.click();
    };
    Object.defineProperty(Uploader.prototype, "retry", {
        get: function () {
            return this._retry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "auto", {
        get: function () {
            return this._auto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "accept", {
        get: function () {
            return this._accept;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "compress", {
        get: function () {
            return this._compress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "listener", {
        get: function () {
            return this._listener;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "fileInput", {
        get: function () {
            return this._fileInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "tokenShare", {
        get: function () {
            return this._tokenShare;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "chunk", {
        get: function () {
            return this._chunk;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "tokenFunc", {
        get: function () {
            return this._tokenFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (value) {
            this._token = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "taskQueue", {
        get: function () {
            return this._taskQueue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "tasking", {
        get: function () {
            return this._tasking;
        },
        set: function (value) {
            this._tasking = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "interceptors", {
        //
        // get fileInputId(): string {
        //     return this._fileInputId;
        // }
        get: function () {
            return this._interceptors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "domain", {
        get: function () {
            return this._domain;
        },
        enumerable: true,
        configurable: true
    });
    return Uploader;
}());

export { Uploader, UploaderBuilder };
//# sourceMappingURL=qiniu4js.es.js.map
