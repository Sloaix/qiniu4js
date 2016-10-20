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
        set: function (value) {
            this._file = value;
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
        _super.apply(this, arguments);
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
        //分块
        this._blocks = [];
        _super.prototype.constructor.call(this, file);
        this.spliceFile2Block(blockSize, chunkSize);
    }
    /**
     * 将文件分块
     */
    ChunkTask.prototype.spliceFile2Block = function (blockSize, chunkSize) {
        var fileSize = this.file.size;
        var file = this.file;
        //总块数
        var blockCount = Math.ceil(fileSize / blockSize);
        for (var i = 0; i < blockCount; i++) {
            var start = i * blockSize; //起始位置
            var end = start + blockSize; //结束位置
            //构造一个块实例
            var block = new Block(start, end, file.slice(start, end), chunkSize);
            //添加到数组中
            this._blocks.push(block);
        }
    };
    Object.defineProperty(ChunkTask.prototype, "blocks", {
        get: function () {
            return this._blocks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkTask.prototype, "lastBlock", {
        get: function () {
            return this._lastBlock;
        },
        enumerable: true,
        configurable: true
    });
    return ChunkTask;
}(DirectTask));
/**
 * 分块，分块大小七牛固定是4M
 */
var Block = (function () {
    function Block(start, end, data, chunkSize) {
        this._chunks = [];
        this._data = data;
        this._start = start;
        this._end = end;
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
            var chunk = new Chunk(start, end, data.slice(start, end));
            //添加到数组中
            this._chunks.push(chunk);
        }
    };
    Object.defineProperty(Block.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "end", {
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
    function Chunk(start, end, data) {
        this._isFinish = false; //是否上传完成
        this._start = start;
        this._end = end;
        this._data = data;
    }
    Object.defineProperty(Chunk.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "end", {
        get: function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "isFinish", {
        get: function () {
            return this._isFinish;
        },
        set: function (value) {
            this._isFinish = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chunk.prototype, "ctx", {
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
        this._compress = 100; //图片压缩质量
        this._crop = []; //裁剪参数[x:20,y:20,width:20,height:20]
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
     * @param compress 0-100,默认100,不压缩
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.compress = function (compress) {
        this._compress = compress;
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
    Object.defineProperty(UploaderBuilder.prototype, "getCrop", {
        get: function () {
            return this._crop;
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
    UploaderBuilder.MAX_CHUNK_SIZE = 4 * 1024 * 1024; //分片最大值
    UploaderBuilder.BLOCK_SIZE = UploaderBuilder.MAX_CHUNK_SIZE; //分块大小，只有大于这个数才需要分块
    UploaderBuilder.UPLOAD_URL = 'http://upload.qiniu.com';
    return UploaderBuilder;
}());

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
    Debug._enable = true;
    return Debug;
}());

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

var JSON$1 = (function () {
    function JSON() {
    }
    JSON.parse = function (str) {
        var object = null;
        try {
            object = JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return object;
    };
    return JSON;
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
    DirectUploadPattern.prototype.upload = function (task) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        //上传中
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                task.progress = Math.round((e.loaded * 100) / e.total);
                _this.uploader.listener.onTaskProgress(task);
            }
        };
        //上传完成
        xhr.upload.onload = function () {
            task.progress = 100;
        };
        var url = this.uploader.domain;
        url += ((/\?/).test(this.uploader.domain) ? "&" : "?") + (new Date()).getTime();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 && xhr.responseText != '') {
                    task.result = JSON$1.parse(xhr.responseText);
                    task.isSuccess = true;
                    task.isFinish = true;
                    task.endDate = new Date();
                    _this.uploader.listener.onTaskSuccess(task);
                }
                else {
                    if (_this.retryTask(task)) {
                        Debug.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                        _this.uploader.listener.onTaskRetry(task);
                    }
                    else {
                        Debug.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25");
                        task.error = JSON$1.parse(xhr.responseText);
                        task.error = task.error ? task.error : xhr.response;
                        task.isSuccess = false;
                        task.isFinish = true;
                        task.endDate = new Date();
                        _this.uploader.listener.onTaskFail(task);
                    }
                }
                //所有任务都结束了
                if (_this.uploader.isTaskQueueFinish()) {
                    //更改任务执行中标志
                    _this.uploader.tasking = false;
                    //监听器调用
                    _this.uploader.listener.onFinish(_this.uploader.taskQueue);
                }
            }
        };
        if (this.uploader.tokenShare && this.uploader.token) {
            task.startDate = new Date();
            var formData = DirectUploadPattern.createFormData(task, this.uploader.token);
            xhr.send(formData);
        }
        else {
            Debug.d("\u5F00\u59CB\u83B7\u53D6token");
            this.uploader.tokenFunc(function (token) {
                Debug.d("token\u83B7\u53D6\u6210\u529F " + token);
                _this.uploader.token = token;
                task.startDate = new Date();
                var formData = DirectUploadPattern.createFormData(task, _this.uploader.token);
                xhr.send(formData);
            }, task);
        }
    };
    DirectUploadPattern.createFormData = function (task, token) {
        var formData = new FormData();
        if (task.key !== null && task.key !== undefined) {
            formData.append('key', task.key);
        }
        formData.append('token', token);
        formData.append('file', task.file);
        Debug.d("\u521B\u5EFAformData\u5BF9\u8C61");
        return formData;
    };
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
    /**
     * 分块上传
     */
    ChunkUploadPattern.prototype.upload = function (task) {
        var _this = this;
        //只需要调用方法上传第一个块，之后就会递归调用自动上传。
        var firstBlock = task.blocks[0];
        var firstChunk = firstBlock.chunks[0];
        if (this.uploader.tokenShare && this.uploader.token) {
            task.startDate = new Date();
            this.uploadChunk(firstChunk, firstBlock, task, this.uploader.token);
        }
        else {
            Debug.d("\u5F00\u59CB\u83B7\u53D6token");
            this.uploader.tokenFunc(function (token) {
                Debug.d("token\u83B7\u53D6\u6210\u529F " + token);
                _this.uploader.token = token;
                task.startDate = new Date();
                _this.uploadChunk(firstChunk, firstBlock, task, token);
            }, task);
        }
    };
    /**
     *
     * @param chunk 将要上传的chunk
     * @param ctx 前一次上传返回的块级上传控制信息。
     * @param nextHost 下一次的分片上传地址
     * @param block 当前chunk属于的block
     * @param task 分片任务
     * @param token 上传凭证
     */
    ChunkUploadPattern.prototype.uploadChunk = function (chunk, block, task, token, ctx, nextHost) {
        var _this = this;
        var chunkIndex = block.chunks.indexOf(chunk);
        var blockIndex = task.blocks.indexOf(block);
        var xhr = new XMLHttpRequest();
        /**
         * 根据index进行不同的上传策略，因为第一个chunk是随着创建block的时候附带上传的。
         */
        //根据index获取不同的上传url
        var url = chunkIndex == 0 ? this.getUploadBlockUrl(block.data.size) : this.getUploadChunkUrl(chunk.start, ctx, nextHost);
        xhr.open('POST', url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream'); //设置contentType
        xhr.setRequestHeader('Authorization', "UpToken " + token); //添加token验证头
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 && xhr.responseText != '') {
                    var result = JSON.parse(xhr.responseText);
                    chunk.isFinish = true;
                    chunk.ctx = result.ctx;
                    //判断是否还有chunk等待我们上传
                    var hasNextChunk = block.chunks.indexOf(chunk) != block.chunks.length - 1;
                    if (hasNextChunk) {
                        var nextChunkIndex = chunkIndex + 1;
                        var nextChunk = block.chunks[nextChunkIndex];
                        //上传下一个chunk
                        _this.uploadChunk(nextChunk, block, task, token, chunk.ctx, result.host);
                    }
                    else {
                        //判断是否还有block等待我们上传
                        var hasNextBlock = task.blocks.indexOf(block) != task.blocks.length - 1;
                        if (hasNextBlock) {
                            //上传下一个block
                            var nextBlockIndex = blockIndex + 1;
                            var nextBlock = task.blocks[nextBlockIndex];
                            _this.uploadChunk(nextBlock.chunks[0], nextBlock, task, token);
                        }
                        else {
                            var encodedKey = task.key ? btoa(encodeURIComponent(task.key)) : null;
                            var url_1 = _this.getMakeFileUrl(task.file.size, encodedKey);
                            //构建所有数据块最后一个数据片上传后得到的<ctx>的组合成的列表字符串
                            var ctxListString = '';
                            for (var _i = 0, _a = task.blocks; _i < _a.length; _i++) {
                                var block_1 = _a[_i];
                                var lastChunk = block_1.chunks[block_1.chunks.length - 1];
                                ctxListString += lastChunk.ctx + ',';
                            }
                            if (ctxListString.endsWith(',')) {
                                ctxListString = ctxListString.substring(0, ctxListString.length - 1);
                            }
                            var xhr_1 = new XMLHttpRequest();
                            xhr_1.open('POST', url_1 += ((/\?/).test(url_1) ? "&" : "?") + (new Date()).getTime(), true);
                            xhr_1.setRequestHeader('Content-Type', 'text/plain'); //设置contentType
                            xhr_1.setRequestHeader('Authorization', "UpToken " + token); //添加token验证头
                            xhr_1.send(ctxListString);
                            xhr_1.onreadystatechange = function () {
                                if (xhr_1.readyState == XMLHttpRequest.DONE) {
                                    task.isFinish = true;
                                    if (xhr_1.status == 200 && xhr_1.responseText != '') {
                                        var result_1 = JSON.parse(xhr_1.responseText);
                                        task.isSuccess = true;
                                        _this.uploader.listener.onTaskSuccess(task);
                                        task.endDate = new Date();
                                    }
                                    else {
                                        if (_this.retryTask(task)) {
                                            Debug.w(task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                                            _this.uploader.listener.onTaskRetry(task);
                                        }
                                        else {
                                            Debug.w(task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25");
                                            task.error = JSON.parse(xhr_1.responseText);
                                            task.error = task.error ? task.error : xhr_1.response;
                                            task.isSuccess = false;
                                            task.isFinish = true;
                                            task.endDate = new Date();
                                            _this.uploader.listener.onTaskFail(task);
                                        }
                                    }
                                    //所有任务都结束了
                                    if (_this.uploader.isTaskQueueFinish()) {
                                        //更改任务执行中标志
                                        _this.uploader.tasking = false;
                                        //监听器调用
                                        _this.uploader.listener.onFinish(_this.uploader.taskQueue);
                                    }
                                }
                            };
                        }
                    }
                }
                else {
                }
            }
        };
        xhr.send(chunk.data);
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
    return ChunkUploadPattern;
}());

var Uploader = (function () {
    function Uploader(builder) {
        var _this = this;
        this.FILE_INPUT_EL_ID = 'qiniu4js-input';
        this._taskQueue = []; //任务队列
        this._tasking = false; //任务执行中
        /**
         * 处理文件
         */
        this.handleFiles = function () {
            //如果没有选中文件就返回
            if (_this.fileInput.files.length == 0) {
                return;
            }
            //上传前的准备
            _this.readyForUpload();
            //是否中断任务
            var isInterrupt = false;
            //任务拦截器过滤
            for (var _i = 0, _a = _this.taskQueue; _i < _a.length; _i++) {
                var task = _a[_i];
                for (var _b = 0, _c = _this.interceptors; _b < _c.length; _b++) {
                    var interceptor = _c[_b];
                    if (interceptor.onIntercept(task)) {
                        //从任务队列中去除任务
                        _this.taskQueue.splice(_this.taskQueue.indexOf(task), 1);
                    }
                    if (interceptor.onInterrupt(task)) {
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
            //自动上传
            if (_this.auto) {
                _this.start();
            }
        };
        this._retry = builder.getRetry;
        this._size = builder.getSize;
        this._chunk = builder.getChunk;
        this._auto = builder.getAuto;
        this._multiple = builder.getMultiple;
        this._accept = builder.getAccept;
        this._compress = builder.getCompress;
        this._crop = builder.getCrop;
        this._tokenFunc = builder.getTokenFunc;
        this._tokenShare = builder.getTokenShare;
        this._listener = Object.assign(new SimpleUploadListener(), builder.getListener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
        this._fileInputId = this.FILE_INPUT_EL_ID + "_" + new Date().getTime();
        Debug.enable = builder.getIsDebug;
        this.validate();
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
    Uploader.prototype.clear = function () {
        this.taskQueue.length = 0;
        this._token = null;
    };
    /**
     * 上传前的准备工作
     */
    Uploader.prototype.readyForUpload = function () {
        this.clear();
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
    Uploader.prototype.validate = function () {
        if (!this.tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
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
            //根据任务的类型调用不同的上传模式进行上传
            if (task.constructor.name === DirectTask.name && task instanceof DirectTask) {
                //直传
                this._directUploadPattern.upload(task);
            }
            else if (task.constructor.name === ChunkTask.name && task instanceof ChunkTask) {
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
    Object.defineProperty(Uploader.prototype, "crop", {
        get: function () {
            return this._crop;
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
    Object.defineProperty(Uploader.prototype, "fileInputId", {
        get: function () {
            return this._fileInputId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "interceptors", {
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
