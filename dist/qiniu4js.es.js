var SimpleListener = (function () {
    function SimpleListener() {
    }
    SimpleListener.prototype.onReady = function (taskQueue) {
    };
    SimpleListener.prototype.onStart = function (taskQueue) {
    };
    SimpleListener.prototype.onTaskProgress = function (task) {
    };
    SimpleListener.prototype.onTaskGetKey = function (task) {
        return null;
    };
    SimpleListener.prototype.onTaskFail = function (task) {
    };
    SimpleListener.prototype.onTaskSuccess = function (task) {
    };
    SimpleListener.prototype.onTaskRetry = function (task) {
    };
    SimpleListener.prototype.onFinish = function (taskQueue) {
    };
    return SimpleListener;
}());

/**
 * 上传任务
 */
var Task = (function () {
    function Task(file) {
        this._retry = 0; //已重试次数
        this._progress = 0; //任务进度,最大100
        this._isSuccess = false; //是否上传成功
        this._isFinish = false; //是否结束
        this._file = file;
        this._createDate = new Date();
    }
    Object.defineProperty(Task.prototype, "file", {
        get: function () {
            return this._file;
        },
        set: function (value) {
            this._file = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "retry", {
        get: function () {
            return this._retry;
        },
        set: function (value) {
            this._retry = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "createDate", {
        get: function () {
            return this._createDate;
        },
        set: function (value) {
            this._createDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (value) {
            this._startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (value) {
            this._endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "isSuccess", {
        get: function () {
            return this._isSuccess;
        },
        set: function (value) {
            this._isSuccess = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            this._progress = Math.min(Math.max(0, value), 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "result", {
        get: function () {
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "error", {
        get: function () {
            return this._error;
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "isFinish", {
        get: function () {
            return this._isFinish;
        },
        set: function (value) {
            this._isFinish = value;
        },
        enumerable: true,
        configurable: true
    });
    return Task;
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
                _this.uploadFiles();
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
        this._listener = Object.assign(new SimpleListener(), builder.getListener);
        this._interceptors = builder.getInterceptors;
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
                acceptValue += '|';
            }
            if (acceptValue.endsWith('|')) {
                acceptValue.slice(1, -1);
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
            var task = new Task(file);
            task.key = this.listener.onTaskGetKey(task);
            this.taskQueue.push(task);
        }
    };
    Uploader.prototype.validate = function () {
        if (!this.tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
        }
    };
    Uploader.prototype.start = function () {
        if (this.fileInput.files.length == 0) {
            throw new Error('没有选中的文件，无法start');
        }
        if (this.tasking) {
            throw new Error('任务执行中，请不要重复start');
        }
        this.uploadFiles();
    };
    /**
     * 上传多个文件
     */
    Uploader.prototype.uploadFiles = function () {
        //开始上传
        this.listener.onStart(this.taskQueue);
        this._tasking = true;
        if (this.chunk) {
            Debug.d('分块上传');
            this.uploadFilesChunk();
        }
        else {
            Debug.d('直接上传');
            this.uploadFilesDirect();
        }
    };
    /**
     * 直传文件
     */
    Uploader.prototype.uploadFilesDirect = function () {
        for (var _i = 0, _a = this.taskQueue; _i < _a.length; _i++) {
            var task = _a[_i];
            this.uploadFile(task);
        }
    };
    /**
     * 分块上传文件
     */
    Uploader.prototype.uploadFilesChunk = function () {
        //todo
    };
    /**
     * 所有任务是否完成
     * @returns {boolean}
     */
    Uploader.prototype.isAllTaskFinish = function () {
        for (var _i = 0, _a = this.taskQueue; _i < _a.length; _i++) {
            var task = _a[_i];
            if (!task.isFinish) {
                return false;
            }
        }
        return true;
    };
    /**
     * 上传文件
     * @param task
     */
    Uploader.prototype.uploadFile = function (task) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        //上传中
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                task.progress = Math.round((e.loaded * 100) / e.total);
                _this.listener.onTaskProgress(task);
            }
        };
        //上传完成
        xhr.upload.onload = function () {
            task.progress = 100;
        };
        xhr.open('POST', Uploader.UPLOAD_URL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                task.endDate = new Date();
                if (xhr.status == 200 && xhr.responseText != '') {
                    task.result = JSON.parse(xhr.responseText);
                    task.isSuccess = true;
                    task.isFinish = true;
                    _this.listener.onTaskSuccess(task);
                }
                else {
                    if (_this.retryTask(task)) {
                        Debug.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                        _this.listener.onTaskRetry(task);
                    }
                    else {
                        Debug.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25");
                        task.error = xhr.response;
                        task.isSuccess = false;
                        task.isFinish = true;
                        _this.listener.onTaskFail(task);
                    }
                }
                //所有任务都结束了
                if (_this.isAllTaskFinish()) {
                    //更改任务执行中标志
                    _this._tasking = false;
                    //监听器调用
                    _this.listener.onFinish(_this.taskQueue);
                }
            }
        };
        if (this.tokenShare && this.token) {
            task.startDate = new Date();
            var formData = Uploader.createFormData(task, this.token);
            xhr.send(formData);
        }
        else {
            Debug.d("\u5F00\u59CB\u83B7\u53D6token");
            this.tokenFunc(function (token) {
                Debug.d("token\u83B7\u53D6\u6210\u529F " + token);
                _this._token = token;
                task.startDate = new Date();
                var formData = Uploader.createFormData(task, _this.token);
                xhr.send(formData);
            });
        }
    };
    /**
     * 如果重试失败,返回false
     * @param task
     */
    Uploader.prototype.retryTask = function (task) {
        //达到重试次数
        if (task.retry >= this.retry) {
            Debug.w(task.file.name + "\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650" + this.retry + ",\u505C\u6B62\u91CD\u4F20");
            return false;
        }
        task.retry++;
        Debug.w(task.file.name + "\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570" + task.retry);
        this.uploadFile(task);
        return true;
    };
    Uploader.createFormData = function (task, token) {
        var formData = new FormData();
        if (task.key !== null && task.key !== undefined) {
            formData.append('key', task.key);
        }
        formData.append('token', token);
        formData.append('file', task.file);
        Debug.d("\u521B\u5EFAformData\u5BF9\u8C61");
        return formData;
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
    Uploader.UPLOAD_URL = 'http://up.qiniu.com/';
    return Uploader;
}());

/**
 * UploaderBuilder
 *
 */
var UploaderBuilder = (function () {
    function UploaderBuilder() {
        this._retry = 0; //最大重试次数
        this._size = 4 * 1024 * 1024; //分块大小,单位字节,默认4mb
        this._chunk = false; //分块上传
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
     *
     * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
     * @returns {UploaderBuilder}
     */
    UploaderBuilder.prototype.size = function (size) {
        this._size = size;
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
     * @param accept 数组形式例如:['.gif','.png','video/*']
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
    UploaderBuilder.prototype.build = function () {
        return new Uploader(this);
    };
    return UploaderBuilder;
}());

export { Uploader, UploaderBuilder };
//# sourceMappingURL=qiniu4js.es.js.map
