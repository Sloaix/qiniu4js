(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Qiniu"] = factory();
	else
		root["Qiniu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
    function Log() {
        _classCallCheck(this, Log);
    }

    _createClass(Log, null, [{
        key: "d",
        value: function d(object) {
            if (!Log._enable) {
                return;
            }
            console.debug(object);
        }
    }, {
        key: "l",
        value: function l(object) {
            if (!Log._enable) {
                return;
            }
            console.log(object);
        }
    }, {
        key: "e",
        value: function e(object) {
            if (!Log._enable) {
                return;
            }
            console.error(object);
        }
    }, {
        key: "w",
        value: function w(object) {
            if (!Log._enable) {
                return;
            }
            console.warn(object);
        }
    }, {
        key: "i",
        value: function i(object) {
            if (!Log._enable) {
                return;
            }
            console.info(object);
        }
    }, {
        key: "enable",
        get: function get() {
            return this._enable;
        },
        set: function set(value) {
            this._enable = value;
        }
    }]);

    return Log;
}();

Log._enable = false;
exports.default = Log;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DirectTask = __webpack_require__(10);

var _DirectTask2 = _interopRequireDefault(_DirectTask);

var _ChunkTask = __webpack_require__(9);

var _UUID = __webpack_require__(11);

var _UUID2 = _interopRequireDefault(_UUID);

var _UploaderBuilder = __webpack_require__(2);

var _UploaderBuilder2 = _interopRequireDefault(_UploaderBuilder);

var _Log = __webpack_require__(0);

var _Log2 = _interopRequireDefault(_Log);

var _SimpleUploadListener = __webpack_require__(5);

var _SimpleUploadListener2 = _interopRequireDefault(_SimpleUploadListener);

var _DirectUploadPattern = __webpack_require__(8);

var _DirectUploadPattern2 = _interopRequireDefault(_DirectUploadPattern);

var _ChunkUploadPattern = __webpack_require__(7);

var _ChunkUploadPattern2 = _interopRequireDefault(_ChunkUploadPattern);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uploader = function () {
    function Uploader(builder) {
        var _this2 = this;

        _classCallCheck(this, Uploader);

        this.FILE_INPUT_EL_ID = 'qiniu4js-input';
        this._taskQueue = []; //任务队列
        this._tasking = false; //任务执行中
        this._scale = []; //缩放大小,限定高度等比缩放[h:200,w:0],限定宽度等比缩放[h:0,w:100],限定长宽[h:200,w:100]
        this._saveKey = false;
        /**
         * 处理文件
         */
        this.handleFiles = function () {
            //如果没有选中文件就返回
            if (_this2.fileInput.files.length == 0) {
                return;
            }
            //生成task
            _this2.generateTask();
            //是否中断任务
            var isInterrupt = false;
            var interceptedTasks = [];
            //任务拦截器过滤
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this2.taskQueue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var task = _step.value;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = _this2.interceptors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var interceptor = _step3.value;

                            //拦截生效
                            if (interceptor.onIntercept(task, _this2.taskQueue)) {
                                interceptedTasks.push(task);
                                _Log2.default.d("任务拦截器拦截了任务:");
                                _Log2.default.d(task);
                            }
                            //打断生效
                            if (interceptor.onInterrupt(task, _this2.taskQueue)) {
                                //将打断标志位设为true
                                isInterrupt = true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (isInterrupt) {
                _Log2.default.w("任务拦截器中断了任务队列");
                return;
            }
            //从任务队列中去除任务
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = interceptedTasks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _task = _step2.value;

                    var index = _this2.taskQueue.indexOf(_task);
                    if (index != -1) {
                        _this2.taskQueue.splice(index, 1);
                    }
                }
                //回调函数函数
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            _this2.listener.onReady(_this2.taskQueue);
            //处理图片
            _this2.handleImages().then(function () {
                //自动上传
                if (_this2.auto) {
                    _Log2.default.d("开始自动上传");
                    _this2.start();
                }
            });
        };
        this.resolveUUID = function (s) {
            var re = /\$\(uuid\)/;
            if (re.test(s)) {
                return s.replace(re, _UUID2.default.uuid());
            }
            return s;
        };
        this.resolveImageInfo = function (blob, s) {
            var widthRe = /\$\(imageInfo\.width\)/;
            var heightRe = /\$\(imageInfo\.height\)/;
            if (!widthRe.test(s) && !heightRe.test(s)) {
                return Promise.resolve(s);
            }
            return new Promise(function (resolve) {
                var img = new Image();
                img.src = URL.createObjectURL(blob);
                img.onload = function () {
                    s = s.replace(widthRe, img.width.toString());
                    s = s.replace(heightRe, img.height.toString());
                    resolve(s);
                };
            });
        };
        this.onSaveKeyResolved = function (saveKey) {
            _this2._tokenShare = _this2._tokenShare && _this2._saveKey == saveKey;
            return saveKey;
        };
        this._retry = builder.getRetry;
        this._size = builder.getSize;
        this._chunk = builder.getChunk;
        this._auto = builder.getAuto;
        this._multiple = builder.getMultiple;
        this._accept = builder.getAccept;
        this._button = builder.getButton;
        this._buttonEventName = builder.getButtonEventName;
        this._compress = builder.getCompress;
        this._scale = builder.getScale;
        this._saveKey = builder.getSaveKey;
        this._tokenFunc = builder.getTokenFunc;
        this._tokenShare = builder.getTokenShare;
        this._listener = Object.assign(new _SimpleUploadListener2.default(), builder.getListener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
        this._fileInputId = this.FILE_INPUT_EL_ID + "_" + new Date().getTime();
        _Log2.default.enable = builder.getIsDebug;
        this.validateOptions();
        this.init();
    }
    /**
     * 初始化操作
     */


    _createClass(Uploader, [{
        key: "init",
        value: function init() {
            this.initFileInputEl();
        }
        /**
         * 初始化file input element
         */

    }, {
        key: "initFileInputEl",
        value: function initFileInputEl() {
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
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.accept[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var value = _step4.value;

                        acceptValue += value;
                        acceptValue += ',';
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                if (acceptValue.endsWith(',')) {
                    acceptValue = acceptValue.substring(0, acceptValue.length - 1);
                }
                this.fileInput.accept = acceptValue;
                _Log2.default.d("accept\u7C7B\u578B " + acceptValue);
            }
            //将input元素添加到body子节点的末尾
            document.body.appendChild(this.fileInput);
            //选择文件监听器
            this.fileInput.addEventListener('change', this.handleFiles, false);
            if (this._button != undefined) {
                var button = document.getElementById(this._button);
                button.addEventListener(this._buttonEventName, this.chooseFile.bind(this));
            }
        }
        /**
         * 上传完成或者失败后,对本次上传任务进行清扫
         */

    }, {
        key: "resetUploader",
        value: function resetUploader() {
            _Log2.default.d("开始重置 uploader");
            this.taskQueue.length = 0;
            _Log2.default.d("任务队列已清空");
            this._token = null;
            _Log2.default.d("token已清空");
            _Log2.default.d("uploader 重置完毕");
        }
        /**
         * 是否是分块任务
         * @param task
         * @returns {boolean}
         */

    }, {
        key: "generateTask",

        /**
         * 生成task
         */
        value: function generateTask() {
            this.resetUploader();
            var files = this.fileInput.files;
            //遍历files 创建上传任务
            for (var i = 0; i < this.fileInput.files.length; i++) {
                var file = files[i];
                var task = void 0;
                //只有在开启分块上传，并且文件大小大于4mb的时候才进行分块上传
                if (this.chunk && file.size > _UploaderBuilder2.default.BLOCK_SIZE) {
                    task = new _ChunkTask.ChunkTask(file, _UploaderBuilder2.default.BLOCK_SIZE, this.size);
                } else {
                    task = new _DirectTask2.default(file);
                }
                if (this._saveKey == false) {
                    task.key = this.listener.onTaskGetKey(task);
                }
                this.taskQueue.push(task);
            }
        }
        /**
         * 处理图片-缩放-质量压缩
         */

    }, {
        key: "handleImages",
        value: function handleImages() {
            var _this3 = this;

            var promises = [];
            if (this.compress != 1 || this.scale[0] != 0 || this.scale[1] != 0) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    var _loop = function _loop() {
                        var task = _step5.value;

                        if (!task.file.type.match('image.*')) {
                            return "continue";
                        }
                        _Log2.default.d(task.file.name + " \u5904\u7406\u524D\u7684\u56FE\u7247\u5927\u5C0F:" + task.file.size / 1024 + " kb");
                        var canvas = document.createElement('canvas');
                        var img = new Image();
                        var ctx = canvas.getContext('2d');
                        img.src = URL.createObjectURL(task.file);
                        var _this = _this3;
                        promises.push(new Promise(function (resolve) {
                            return img.onload = function () {
                                var imgW = img.width;
                                var imgH = img.height;
                                var scaleW = _this.scale[0];
                                var scaleH = _this.scale[1];
                                if (scaleW == 0 && scaleH > 0) {
                                    canvas.width = imgW / imgH * scaleH;
                                    canvas.height = scaleH;
                                } else if (scaleH == 0 && scaleW > 0) {
                                    canvas.width = scaleW;
                                    canvas.height = imgH / imgW * scaleW;
                                } else if (scaleW > 0 && scaleH > 0) {
                                    canvas.width = scaleW;
                                    canvas.height = scaleH;
                                } else {
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
                                    _Log2.default.d(task.file.name + " \u5904\u7406\u540E\u7684\u56FE\u7247\u5927\u5C0F:" + blob.size / 1024 + " kb");
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

                    for (var _iterator5 = this.taskQueue[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _ret = _loop();

                        if (_ret === "continue") continue;
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            }
            return Promise.all(promises);
        }
        /**
         * 检验选项合法性
         */

    }, {
        key: "validateOptions",
        value: function validateOptions() {
            _Log2.default.d("开始检查构建参数合法性");
            if (!this._tokenFunc) {
                throw new Error('你必须提供一个获取Token的回调函数');
            }
            if (!this.scale || !(this.scale instanceof Array) || this.scale.length != 2 || this.scale[0] < 0 || this.scale[1] < 0) {
                throw new Error('scale必须是长度为2的number类型的数组,scale[0]为宽度，scale[1]为长度,必须大于等于0');
            }
            _Log2.default.d("构建参数检查完毕");
        }
        /**
         * 开始上传
         */

    }, {
        key: "start",
        value: function start() {
            _Log2.default.d("\u4E0A\u4F20\u4EFB\u52A1\u904D\u5386\u5F00\u59CB");
            if (this.fileInput.files.length == 0) {
                throw new Error('没有选中的文件，无法开始上传');
            }
            if (this.tasking) {
                throw new Error('任务执行中，请不要重复上传');
            }
            this.listener.onStart(this.taskQueue);
            //遍历任务队列
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.taskQueue[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var _task2 = _step6.value;

                    _Log2.default.d("\u4E0A\u4F20\u6587\u4EF6\u540D\uFF1A" + _task2.file.name);
                    _Log2.default.d("\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\uFF1A" + _task2.file.size + "\u5B57\u8282\uFF0C" + _task2.file.size / 1024 + " kb\uFF0C" + _task2.file.size / 1024 / 1024 + " mb");
                    //根据任务的类型调用不同的上传模式进行上传
                    if (Uploader.isDirectTask(_task2)) {
                        _Log2.default.d('该上传任务为直传任务');
                        //直传
                        new _DirectUploadPattern2.default(this).upload(_task2);
                    } else if (Uploader.isChunkTask(_task2)) {
                        _Log2.default.d('该上传任务为分片任务');
                        //分块上传
                        new _ChunkUploadPattern2.default(this).upload(_task2);
                    } else {
                        throw new Error('非法的task类型');
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
        /**
         * 所有任务是否完成
         * @returns {boolean}
         */

    }, {
        key: "isTaskQueueFinish",
        value: function isTaskQueueFinish() {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.taskQueue[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _task3 = _step7.value;

                    if (!_task3.isFinish) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return true;
        }
        /**
         * 选择文件
         */

    }, {
        key: "chooseFile",
        value: function chooseFile() {
            this.fileInput.click();
        }
    }, {
        key: "getToken",
        value: function getToken(task) {
            var _this4 = this;

            if (this._tokenShare && this._token != undefined) {
                return Promise.resolve(this._token);
            }
            _Log2.default.d("\u5F00\u59CB\u83B7\u53D6\u4E0A\u4F20token");
            return Promise.resolve(this._tokenFunc(this, task)).then(function (token) {
                _Log2.default.d("\u4E0A\u4F20token\u83B7\u53D6\u6210\u529F: " + token);
                _this4._token = token;
                return token;
            });
        }
    }, {
        key: "requestTaskToken",
        value: function requestTaskToken(task, url) {
            var _this5 = this;

            return this.resolveSaveKey(task).then(function (saveKey) {
                return _this5.requestToken(url, saveKey);
            });
        }
    }, {
        key: "requestToken",
        value: function requestToken(url, saveKey) {
            return new Promise(function (resolve, reject) {
                if (typeof saveKey == "string") {
                    url += (/\?/.test(url) ? "&" : "?") + "saveKey=" + encodeURIComponent(saveKey);
                }
                url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != XMLHttpRequest.DONE) {
                        return;
                    }
                    if (xhr.status == 200) {
                        resolve(xhr.response.uptoken);
                        return;
                    }
                    reject(xhr.response);
                };
                xhr.onabort = function () {
                    reject('aborted');
                };
                xhr.responseType = 'json';
                xhr.send();
            });
        }
    }, {
        key: "resolveSaveKey",
        value: function resolveSaveKey(task) {
            var _this6 = this;

            var saveKey = this._saveKey;
            if (typeof saveKey != "string") {
                return Promise.resolve(undefined);
            }
            return Promise.resolve(saveKey).then(this.resolveUUID).then(function (saveKey) {
                return _this6.resolveImageInfo(task.file, saveKey);
            }).then(this.onSaveKeyResolved);
        }
    }, {
        key: "retry",
        get: function get() {
            return this._retry;
        }
    }, {
        key: "size",
        get: function get() {
            return this._size;
        }
    }, {
        key: "auto",
        get: function get() {
            return this._auto;
        }
    }, {
        key: "multiple",
        get: function get() {
            return this._multiple;
        }
    }, {
        key: "accept",
        get: function get() {
            return this._accept;
        }
    }, {
        key: "compress",
        get: function get() {
            return this._compress;
        }
    }, {
        key: "scale",
        get: function get() {
            return this._scale;
        }
    }, {
        key: "listener",
        get: function get() {
            return this._listener;
        }
    }, {
        key: "fileInput",
        get: function get() {
            return this._fileInput;
        }
    }, {
        key: "chunk",
        get: function get() {
            return this._chunk;
        }
    }, {
        key: "taskQueue",
        get: function get() {
            return this._taskQueue;
        }
    }, {
        key: "tasking",
        get: function get() {
            return this._tasking;
        },
        set: function set(value) {
            this._tasking = value;
        }
    }, {
        key: "interceptors",
        get: function get() {
            return this._interceptors;
        }
    }, {
        key: "domain",
        get: function get() {
            return this._domain;
        }
    }], [{
        key: "isChunkTask",
        value: function isChunkTask(task) {
            return task.constructor.name === _ChunkTask.ChunkTask.name && task instanceof _ChunkTask.ChunkTask;
        }
        /**
         * 是否是直传任务
         * @param task
         * @returns {boolean}
         */

    }, {
        key: "isDirectTask",
        value: function isDirectTask(task) {
            return task.constructor.name === _DirectTask2.default.name && task instanceof _DirectTask2.default;
        }
    }]);

    return Uploader;
}();

exports.default = Uploader;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Uploader = __webpack_require__(1);

var _Uploader2 = _interopRequireDefault(_Uploader);

var _SimpleUploadInterceptor = __webpack_require__(6);

var _SimpleUploadInterceptor2 = _interopRequireDefault(_SimpleUploadInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UploaderBuilder
 *
 */
var UploaderBuilder = function () {
    function UploaderBuilder() {
        _classCallCheck(this, UploaderBuilder);

        this._retry = 0; //最大重试次数
        this._domain = UploaderBuilder.UPLOAD_DOMAIN; //上传域名
        this._scheme = null; //上传域名的 scheme
        this._size = 1024 * 1024; //分片大小,单位字节,上限4m,不能为0
        this._chunk = true; //分块上传
        this._auto = true; //自动上传,每次选择文件后
        this._multiple = true; //是否支持多文件
        this._accept = []; //接受的文件类型
        this._compress = 1; //图片压缩质量
        this._scale = [0, 0]; //缩放大小,限定高度等比[h:200,w:0],限定宽度等比[h:0,w:100],限定长宽[h:200,w:100]
        this._saveKey = false;
        this._tokenShare = true; //分享token,如果为false,每一次HTTP请求都需要新获取Token
        this._interceptors = []; //任务拦截器
        this._isDebug = false; //
    }
    /**
     * 设置上传的域名,默认是 {http: 'http://upload.qiniu.com', https: 'https://up.qbox.me'}
     * @param domain
     * @returns {UploaderBuilder}
     */


    _createClass(UploaderBuilder, [{
        key: "domain",
        value: function domain(_domain) {
            this._domain = _domain;
            return this;
        }
        /**
         * 设置上传域名的协议类型，默认从 window.location.protocol 读取
         * @param scheme
         * @returns {UploaderBuilder}
         */

    }, {
        key: "scheme",
        value: function scheme(_scheme) {
            this._scheme = _scheme;
            return this;
        }
        /**
         * 添加一个拦截器
         * @param interceptor
         * @returns {UploaderBuilder}
         */

    }, {
        key: "interceptor",
        value: function interceptor(_interceptor) {
            this._interceptors.push(Object.assign(new _SimpleUploadInterceptor2.default(), _interceptor));
            return this;
        }
        /**
         * 上传失败后的重传尝试次数
         * @param retry 默认0次，不尝试次重传
         * @returns {UploaderBuilder}
         */

    }, {
        key: "retry",
        value: function retry(_retry) {
            this._retry = _retry;
            return this;
        }
        /**
         * 设置分片大小
         * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
         * @returns {UploaderBuilder}
         */

    }, {
        key: "size",
        value: function size(_size) {
            this._size = Math.min(Math.max(_size, 1), UploaderBuilder.MAX_CHUNK_SIZE);
            return this;
        }
        /**
         * 选择文件后,是否自动上传
         * @param auto 默认true
         * @returns {UploaderBuilder}
         */

    }, {
        key: "auto",
        value: function auto(_auto) {
            this._auto = _auto;
            return this;
        }
        /**
         * 是否支持多文件选择
         * @param multiple 默认true
         * @returns {UploaderBuilder}
         */

    }, {
        key: "multiple",
        value: function multiple(_multiple) {
            this._multiple = _multiple;
            return this;
        }
        /**
         * 接受上传的文件类型
         * @param accept 数组形式例如:['.png','video/*']
         *
         * 详细配置见http://www.w3schools.com/tags/att_input_accept.asp
         *
         * @returns {UploaderBuilder}
         */

    }, {
        key: "accept",
        value: function accept(_accept) {
            this._accept = _accept;
            return this;
        }
        /**
         * 设置上传按钮
         * @param button 上传按钮ID
         * @param eventName 上传按钮的监听事件名称，默认为 "click" 。
         * @returns {UploaderBuilder}
         */

    }, {
        key: "button",
        value: function button(_button) {
            var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "click";

            this._button = _button;
            this._buttonEventName = eventName;
            return this;
        }
        /**
         * 图片质量压缩,只在上传的文件是图片的时候有效
         * @param compress 0-1,默认1,不压缩
         * @returns {UploaderBuilder}
         */

    }, {
        key: "compress",
        value: function compress(_compress) {
            this._compress = Math.max(Math.min(_compress, 1), 0);
            return this;
        }
        /**
         * 图片缩放
         * @returns {UploaderBuilder}
         * @param scale
         */

    }, {
        key: "scale",
        value: function scale(_scale) {
            this._scale = _scale;
            return this;
        }
        /**
         * 设置 saveKey
         * @param saveKey
         * @returns {UploaderBuilder}
         */

    }, {
        key: "saveKey",
        value: function saveKey(_saveKey) {
            this._saveKey = _saveKey;
            return this;
        }
        /**
         * 获取Token的地址
         * @param tokenUrl
         * @returns {UploaderBuilder}
         */

    }, {
        key: "tokenUrl",
        value: function tokenUrl(_tokenUrl) {
            this._tokenFunc = function (uploader, task) {
                return uploader.requestTaskToken(task, _tokenUrl);
            };
            return this;
        }
        /**
         * 获取Token的函数
         * @param tokenFunc
         * @returns {UploaderBuilder}
         */

    }, {
        key: "tokenFunc",
        value: function tokenFunc(_tokenFunc) {
            this._tokenFunc = function (uploader, task) {
                return new Promise(function (resolve) {
                    _tokenFunc(resolve, task);
                });
            };
            return this;
        }
        /**
         * 上传生命周期钩子
         * @param listener
         * @returns {UploaderBuilder}
         */

    }, {
        key: "listener",
        value: function listener(_listener) {
            this._listener = _listener;
            return this;
        }
        /**
         * 是否分享token,如果为false每上传一个文件都需要请求一次Token。
         * @param tokenShare
         * @returns {UploaderBuilder}
         */

    }, {
        key: "tokenShare",
        value: function tokenShare(_tokenShare) {
            this._tokenShare = _tokenShare;
            return this;
        }
        /**
         * 是否分块上传
         * @param chunk 默认false
         * @returns {UploaderBuilder}
         */

    }, {
        key: "chunk",
        value: function chunk(_chunk) {
            this._chunk = _chunk;
            return this;
        }
        /**
         * 是否开启debug模式
         * @param debug 默认false
         * @returns {UploaderBuilder}
         */

    }, {
        key: "debug",
        value: function debug(_debug) {
            this._isDebug = _debug;
            return this;
        }
    }, {
        key: "build",
        value: function build() {
            return new _Uploader2.default(this);
        }
    }, {
        key: "getRetry",
        get: function get() {
            return this._retry;
        }
    }, {
        key: "getSize",
        get: function get() {
            return this._size;
        }
    }, {
        key: "getAuto",
        get: function get() {
            return this._auto;
        }
    }, {
        key: "getMultiple",
        get: function get() {
            return this._multiple;
        }
    }, {
        key: "getAccept",
        get: function get() {
            return this._accept;
        }
    }, {
        key: "getButton",
        get: function get() {
            return this._button;
        }
    }, {
        key: "getButtonEventName",
        get: function get() {
            return this._buttonEventName;
        }
    }, {
        key: "getCompress",
        get: function get() {
            return this._compress;
        }
    }, {
        key: "getScale",
        get: function get() {
            return this._scale;
        }
    }, {
        key: "getListener",
        get: function get() {
            return this._listener;
        }
    }, {
        key: "getSaveKey",
        get: function get() {
            return this._saveKey;
        }
    }, {
        key: "getTokenFunc",
        get: function get() {
            return this._tokenFunc;
        }
    }, {
        key: "getTokenShare",
        get: function get() {
            return this._tokenShare;
        }
    }, {
        key: "getChunk",
        get: function get() {
            return this._chunk;
        }
    }, {
        key: "getIsDebug",
        get: function get() {
            return this._isDebug;
        }
    }, {
        key: "getInterceptors",
        get: function get() {
            return this._interceptors;
        }
    }, {
        key: "getDomain",
        get: function get() {
            var domain = this._domain;
            if (!domain) {
                domain = UploaderBuilder.UPLOAD_DOMAIN;
            }
            if (typeof domain != "string") {
                var scheme = this._scheme;
                if (typeof scheme != "string") {
                    var protocol = window.location.protocol;
                    scheme = protocol.substring(0, protocol.length - 1);
                }
                domain = domain[scheme];
            }
            return domain.endsWith('/') ? domain.substring(0, domain.length - 1) : domain;
        }
    }]);

    return UploaderBuilder;
}();

UploaderBuilder.MAX_CHUNK_SIZE = 4 * 1024 * 1024; //分片最大值
UploaderBuilder.BLOCK_SIZE = UploaderBuilder.MAX_CHUNK_SIZE; //分块大小，只有大于这个数才需要分块
UploaderBuilder.UPLOAD_DOMAIN = { http: 'http://upload.qiniu.com', https: 'https://up.qbox.me' };
exports.default = UploaderBuilder;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 上传任务
 */
var BaseTask = function () {
    function BaseTask(file) {
        _classCallCheck(this, BaseTask);

        this._retry = 0; //已重试次数
        this._progress = 0; //任务进度,最大100
        this._isSuccess = false; //是否上传成功
        this._isFinish = false; //是否结束
        this._file = file;
        this._createDate = new Date();
    }

    _createClass(BaseTask, [{
        key: "file",
        get: function get() {
            return this._file;
        },
        set: function set(file) {
            this._file = file;
        }
    }, {
        key: "retry",
        get: function get() {
            return this._retry;
        },
        set: function set(value) {
            this._retry = value;
        }
    }, {
        key: "createDate",
        get: function get() {
            return this._createDate;
        },
        set: function set(value) {
            this._createDate = value;
        }
    }, {
        key: "startDate",
        get: function get() {
            return this._startDate;
        },
        set: function set(value) {
            this._startDate = value;
        }
    }, {
        key: "endDate",
        get: function get() {
            return this._endDate;
        },
        set: function set(value) {
            this._endDate = value;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._isSuccess;
        },
        set: function set(value) {
            this._isSuccess = value;
        }
    }, {
        key: "progress",
        get: function get() {
            return this._progress;
        },
        set: function set(value) {
            this._progress = Math.min(Math.max(0, value), 100);
        }
    }, {
        key: "result",
        get: function get() {
            return this._result;
        },
        set: function set(value) {
            this._result = value;
        }
    }, {
        key: "error",
        get: function get() {
            return this._error;
        },
        set: function set(value) {
            this._error = value;
        }
    }, {
        key: "key",
        get: function get() {
            return this._key;
        },
        set: function set(value) {
            this._key = value;
        }
    }, {
        key: "isFinish",
        get: function get() {
            return this._isFinish;
        },
        set: function set(value) {
            this._isFinish = value;
        }
    }]);

    return BaseTask;
}();

exports.default = BaseTask;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploaderBuilder = exports.Uploader = undefined;

var _Uploader = __webpack_require__(1);

var _Uploader2 = _interopRequireDefault(_Uploader);

var _UploaderBuilder = __webpack_require__(2);

var _UploaderBuilder2 = _interopRequireDefault(_UploaderBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Uploader = _Uploader2.default;
exports.UploaderBuilder = _UploaderBuilder2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleUploadListener = function () {
    function SimpleUploadListener() {
        _classCallCheck(this, SimpleUploadListener);
    }

    _createClass(SimpleUploadListener, [{
        key: "onReady",
        value: function onReady(taskQueue) {}
    }, {
        key: "onStart",
        value: function onStart(taskQueue) {}
    }, {
        key: "onTaskProgress",
        value: function onTaskProgress(task) {}
    }, {
        key: "onTaskGetKey",
        value: function onTaskGetKey(task) {
            return null;
        }
    }, {
        key: "onTaskFail",
        value: function onTaskFail(task) {}
    }, {
        key: "onTaskSuccess",
        value: function onTaskSuccess(task) {}
    }, {
        key: "onTaskRetry",
        value: function onTaskRetry(task) {}
    }, {
        key: "onFinish",
        value: function onFinish(taskQueue) {}
    }]);

    return SimpleUploadListener;
}();

exports.default = SimpleUploadListener;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleUploadInterceptor = function () {
    function SimpleUploadInterceptor() {
        _classCallCheck(this, SimpleUploadInterceptor);
    }

    _createClass(SimpleUploadInterceptor, [{
        key: "onIntercept",
        value: function onIntercept(task) {
            return false;
        }
    }, {
        key: "onInterrupt",
        value: function onInterrupt(task) {
            return false;
        }
    }]);

    return SimpleUploadInterceptor;
}();

exports.default = SimpleUploadInterceptor;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(0);

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 分块上传
 */
var ChunkUploadPattern = function () {
    function ChunkUploadPattern(uploader) {
        _classCallCheck(this, ChunkUploadPattern);

        this.uploader = uploader;
    }

    _createClass(ChunkUploadPattern, [{
        key: "init",
        value: function init(uploader) {
            this.uploader = uploader;
        }
    }, {
        key: "upload",
        value: function upload(task) {
            var _this = this;

            this.task = task;
            this.uploader.getToken(task).then(function (token) {
                task.startDate = new Date();
                _this.uploadBlock(token);
            });
        }
    }, {
        key: "uploadBlock",
        value: function uploadBlock(token) {
            var _this2 = this;

            _Log2.default.d("\u51C6\u5907\u5F00\u59CB\u4E0A\u4F20\u5757");
            var chain = Promise.resolve();
            _Log2.default.d("\u5171" + this.task.blocks.length + "\u5757\u7B49\u5F85\u4E0A\u4F20");
            _Log2.default.d("\u5171" + this.task.totalChunkCount + "\u5206\u7247\u7B49\u5F85\u4E0A\u4F20");
            this.task.blocks.forEach(function (block, blockIndex) {
                block.chunks.forEach(function (chunk, chunkIndex) {
                    chain = chain.then(function () {
                        _Log2.default.d("\u5F00\u59CB\u4E0A\u4F20\u7B2C" + (blockIndex + 1) + "\u5757,\u7B2C" + (chunkIndex + 1) + "\u7247");
                        return _this2.uploadChunk(chunk, token);
                    });
                });
            });
            chain.then(function () {
                return _this2.concatChunks(token);
            }).then(function () {
                //所有任务都结束了
                if (_this2.uploader.isTaskQueueFinish()) {
                    _Log2.default.d("\u4E0A\u4F20\u4EFB\u52A1\u961F\u5217\u5DF2\u7ED3\u675F");
                    //更改任务执行中标志
                    _this2.uploader.tasking = false;
                    //监听器调用
                    _this2.uploader.listener.onFinish(_this2.uploader.taskQueue);
                }
            }).catch(function (response) {
                _Log2.default.w(_this2.task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25");
                _this2.task.error = response;
                _this2.task.isSuccess = false;
                _this2.task.isFinish = true;
                _this2.task.endDate = new Date();
                _this2.uploader.listener.onTaskFail(_this2.task);
            });
        }
    }, {
        key: "uploadChunk",
        value: function uploadChunk(chunk, token) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var isFirstChunkInBlock = chunk.block.chunks.indexOf(chunk) == 0;
                var chunkIndex = chunk.block.chunks.indexOf(chunk);
                //前一个chunk,如果存在的话
                var prevChunk = isFirstChunkInBlock ? null : chunk.block.chunks[chunkIndex - 1];
                var url = isFirstChunkInBlock ? _this3.getUploadBlockUrl(chunk.block.data.size) : _this3.getUploadChunkUrl(chunk.start, prevChunk ? prevChunk.ctx : null, prevChunk ? prevChunk.host : null);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url += (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
                xhr.setRequestHeader('Content-Type', 'application/octet-stream'); //设置contentType
                xhr.setRequestHeader('Authorization', "UpToken " + token); //添加token验证头
                //分片上传中
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var progress = Math.round((_this3.task.finishedBlocksSize + chunk.start + e.loaded) / _this3.task.file.size * 100);
                        if (_this3.task.progress < progress) {
                            _this3.task.progress = progress;
                            _this3.uploader.listener.onTaskProgress(_this3.task);
                        }
                    }
                };
                //分片上传完成
                xhr.upload.onload = function () {
                    var progress = Math.round((_this3.task.finishedBlocksSize + chunk.start + chunk.data.size) / _this3.task.file.size * 100);
                    if (_this3.task.progress < progress) {
                        _this3.task.progress = progress;
                        _this3.uploader.listener.onTaskProgress(_this3.task);
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
                            var _chunkIndex = chunk.block.chunks.indexOf(chunk);
                            var hasNextChunkInThisBlock = _chunkIndex != chunk.block.chunks.length - 1;
                            if (!hasNextChunkInThisBlock) {
                                chunk.block.isFinish = true;
                                chunk.block.processing = false;
                            }
                            resolve();
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.send(chunk.data);
            });
        }
    }, {
        key: "concatChunks",
        value: function concatChunks(token) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var encodedKey = _this4.task.key ? btoa(_this4.task.key) : null;
                // 安全字符串 参考：https://developer.qiniu.com/kodo/api/mkfile
                if (encodedKey) {
                    encodedKey = encodedKey.replace(/\+/g, '-');
                    encodedKey = encodedKey.replace(/\//g, '_');
                }
                var url = _this4.getMakeFileUrl(_this4.task.file.size, encodedKey);
                //构建所有数据块最后一个数据片上传后得到的<ctx>的组合成的列表字符串
                var ctxListString = '';
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this4.task.blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var block = _step.value;

                        var lastChunk = block.chunks[block.chunks.length - 1];
                        ctxListString += lastChunk.ctx + ',';
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (ctxListString.endsWith(',')) {
                    ctxListString = ctxListString.substring(0, ctxListString.length - 1);
                }
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url += (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
                xhr.setRequestHeader('Content-Type', 'text/plain'); //设置contentType
                xhr.setRequestHeader('Authorization', "UpToken " + token); //添加token验证头
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        _this4.task.isFinish = true;
                        if (xhr.status == 200 && xhr.responseText != '') {
                            var result = JSON.parse(xhr.responseText);
                            _this4.task.isSuccess = true;
                            _this4.task.result = result;
                            _this4.task.endDate = new Date();
                            _this4.uploader.listener.onTaskSuccess(_this4.task);
                            resolve();
                        } else if (_this4.retryTask(_this4.task)) {
                            _Log2.default.w(_this4.task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                            _this4.uploader.listener.onTaskRetry(_this4.task);
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.send(ctxListString);
            });
        }
        /**
         * 获取块上传的url
         * @param blockSize
         * @returns {string}
         */

    }, {
        key: "getUploadBlockUrl",
        value: function getUploadBlockUrl(blockSize) {
            return this.uploader.domain + "/mkblk/" + blockSize;
        }
        /**
         * 获取片上传的url
         * @param start 片的在块中的起始位置
         * @param ctx 前一次上传返回的块级上传控制信息。
         * @param host 指定host
         */

    }, {
        key: "getUploadChunkUrl",
        value: function getUploadChunkUrl(start, ctx, host) {
            return (host ? host : this.uploader.domain) + "/bput/" + ctx + "/" + start + "/";
        }
        /**
         * 获取合并块为文件的url
         * @param fileSize 文件大小
         * @param encodedKey base64UrlEncode后的资源名称,若未指定，则使用saveKey；若未指定saveKey，则使用资源内容的SHA1值作为资源名。
         * @returns {string}
         */

    }, {
        key: "getMakeFileUrl",
        value: function getMakeFileUrl(fileSize, encodedKey) {
            if (encodedKey) {
                return this.uploader.domain + "/mkfile/" + fileSize + "/key/" + encodedKey;
            } else {
                return this.uploader.domain + "/mkfile/" + fileSize;
            }
        }
    }, {
        key: "retryTask",
        value: function retryTask(task) {
            //达到重试次数
            if (task.retry >= this.uploader.retry) {
                _Log2.default.w(task.file.name + "\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650" + this.uploader.retry + ",\u505C\u6B62\u91CD\u4F20");
                return false;
            }
            task.retry++;
            _Log2.default.w(task.file.name + "\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570" + task.retry);
            // this.upload(task);
            //todo
            return true;
        }
    }]);

    return ChunkUploadPattern;
}();

exports.default = ChunkUploadPattern;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(0);

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 直接上传
 */
var DirectUploadPattern = function () {
    function DirectUploadPattern(uploader) {
        _classCallCheck(this, DirectUploadPattern);

        this.uploader = uploader;
    }
    /**
     * 实现接口的上传方法
     * @param task
     */


    _createClass(DirectUploadPattern, [{
        key: 'upload',
        value: function upload(task) {
            var _this = this;

            this.task = task;
            this.uploader.getToken(task).then(function (token) {
                task.startDate = new Date();
                _this.uploadFile(token);
            });
        }
        /**
         * 创建表单
         * @param token
         * @returns {FormData}
         */

    }, {
        key: 'createFormData',
        value: function createFormData(token) {
            var task = this.task;
            var formData = new FormData();
            //key存在，添加到formData中，若不设置，七牛服务器会自动生成hash key
            if (task.key !== null && task.key !== undefined) {
                formData.append('key', task.key);
            }
            formData.append('token', token);
            formData.append('file', task.file);
            _Log2.default.d('\u521B\u5EFAformData\u5BF9\u8C61');
            return formData;
        }
        /**
         * 上传文件
         * @param token
         */

    }, {
        key: 'uploadFile',
        value: function uploadFile(token) {
            var _this2 = this;

            var task = this.task;
            var xhr = new XMLHttpRequest();
            //上传中
            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var progress = Math.round(e.loaded * 100 / e.total);
                    if (task.progress < progress) {
                        task.progress = progress;
                        _this2.uploader.listener.onTaskProgress(task);
                    }
                }
            };
            //上传完成
            xhr.upload.onload = function () {
                if (task.progress < 100) {
                    task.progress = 100;
                    _this2.uploader.listener.onTaskProgress(task);
                }
            };
            var url = this.uploader.domain;
            //避免浏览器缓存http请求
            url += (/\?/.test(this.uploader.domain) ? "&" : "?") + new Date().getTime();
            xhr.open('POST', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200 && xhr.responseText != '') {
                        task.result = JSON.parse(xhr.responseText);
                        task.isSuccess = true;
                        task.isFinish = true;
                        task.endDate = new Date();
                        _this2.uploader.listener.onTaskSuccess(task);
                    } else if (_this2.retryTask(task)) {
                        _Log2.default.w(task.file.name + '\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20');
                        _this2.uploader.listener.onTaskRetry(task);
                    } else {
                        _Log2.default.w(task.file.name + '\u4E0A\u4F20\u5931\u8D25');
                        task.error = xhr.response;
                        task.isSuccess = false;
                        task.isFinish = true;
                        task.endDate = new Date();
                        _this2.uploader.listener.onTaskFail(task);
                    }
                    //所有任务都结束了
                    if (_this2.uploader.isTaskQueueFinish()) {
                        _Log2.default.d('上传队列结束');
                        //更改任务执行中标志
                        _this2.uploader.tasking = false;
                        //onFinish callback
                        _this2.uploader.listener.onFinish(_this2.uploader.taskQueue);
                    }
                }
            };
            var formData = this.createFormData(token);
            xhr.send(formData);
            _Log2.default.d('发送ajax post 请求');
        }
        /**
         * 重传
         * @param task
         * @returns {boolean}
         */

    }, {
        key: 'retryTask',
        value: function retryTask(task) {
            _Log2.default.d("开始尝试重传");
            //达到重试次数
            if (task.retry >= this.uploader.retry) {
                _Log2.default.w(task.file.name + '\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650' + this.uploader.retry + ',\u505C\u6B62\u91CD\u4F20');
                return false;
            }
            task.retry++;
            _Log2.default.w(task.file.name + '\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570' + task.retry);
            this.upload(task);
            return true;
        }
    }]);

    return DirectUploadPattern;
}();

exports.default = DirectUploadPattern;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chunk = exports.Block = exports.ChunkTask = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseTask2 = __webpack_require__(3);

var _BaseTask3 = _interopRequireDefault(_BaseTask2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 分块任务
 */
var ChunkTask = function (_BaseTask) {
    _inherits(ChunkTask, _BaseTask);

    /**
     * 构造函数
     * @param file
     * @param blockSize 块大小
     * @param chunkSize 片大小
     */
    function ChunkTask(file, blockSize, chunkSize) {
        _classCallCheck(this, ChunkTask);

        //分块
        var _this = _possibleConstructorReturn(this, (ChunkTask.__proto__ || Object.getPrototypeOf(ChunkTask)).call(this, file));

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


    _createClass(ChunkTask, [{
        key: "spliceFile2Block",
        value: function spliceFile2Block() {
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
        }
        /**
         * 获取所有的block
         * @returns {Block[]}
         */

    }, {
        key: "blocks",
        get: function get() {
            return this._blocks;
        }
        /**
         * 获取正在处理的block
         * @returns {Block}
         */

    }, {
        key: "processingBlock",
        get: function get() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var block = _step.value;

                    if (!block.processing) {
                        continue;
                    }
                    return block;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            throw Error("找不到正在处理的Block");
        }
    }, {
        key: "finishedBlocksSize",
        get: function get() {
            var size = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var block = _step2.value;

                    size += block.isFinish ? block.data.size : 0;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return size;
        }
    }, {
        key: "chunks",
        get: function get() {
            var array = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var block = _step3.value;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = block.chunks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var chunk = _step4.value;

                            array.push(chunk);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return array;
        }
        /**
         * 获取正在处理的chunk
         * @returns {Block}
         */

    }, {
        key: "processingChunk",
        get: function get() {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this._blocks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var block = _step5.value;

                    if (!block.processing) {
                        continue;
                    }
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = block.chunks[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var chunk = _step6.value;

                            if (!chunk.processing) {
                                continue;
                            }
                            return chunk;
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            throw Error("找不到正在处理的Chunk");
        }
        /**
         * 总共分片数量(所有分块的分片数量总和)
         * @returns {number}
         */

    }, {
        key: "totalChunkCount",
        get: function get() {
            var count = 0;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this._blocks[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var block = _step7.value;

                    count += block.chunks.length;
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return count;
        }
    }]);

    return ChunkTask;
}(_BaseTask3.default);
/**
 * 分块，分块大小七牛固定是4M
 */


var Block = function () {
    /**
     *
     * @param start 起始位置
     * @param end 结束位置
     * @param data 块数据
     * @param chunkSize 分片数据的最大大小
     * @param file 分块所属文件
     */
    function Block(start, end, data, chunkSize, file) {
        _classCallCheck(this, Block);

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


    _createClass(Block, [{
        key: "spliceBlock2Chunk",
        value: function spliceBlock2Chunk(chunkSize) {
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
        }
        /**
         * 是否上传中
         * @returns {boolean}
         */

    }, {
        key: "processing",
        get: function get() {
            return this._processing;
        },
        set: function set(value) {
            this._processing = value;
        }
        /**
         * 分块所属的文件
         * @returns {File}
         */

    }, {
        key: "file",
        get: function get() {
            return this._file;
        }
        /**
         * 是否已经结束
         * @returns {boolean}
         */

    }, {
        key: "isFinish",
        get: function get() {
            return this._isFinish;
        },
        set: function set(value) {
            this._isFinish = value;
        }
        /**
         * 返回分块数据
         * @returns {Blob}
         */

    }, {
        key: "data",
        get: function get() {
            return this._data;
        }
        /**
         * 返回字节起始位置
         * @returns {number}
         */

    }, {
        key: "start",
        get: function get() {
            return this._start;
        }
        /**
         * 返回字节结束位置
         * @returns {number}
         */

    }, {
        key: "end",
        get: function get() {
            return this._end;
        }
    }, {
        key: "chunks",
        get: function get() {
            return this._chunks;
        }
    }]);

    return Block;
}();
/**
 * 分片，分片大小可以自定义，至少1字节
 */


var Chunk = function () {
    /**
     *
     * @param start 字节起始位置
     * @param end 字节结束位置
     * @param data 分片数据
     * @param block 分块对象
     */
    function Chunk(start, end, data, block) {
        _classCallCheck(this, Chunk);

        this._processing = false; //是否正在上传
        this._isFinish = false; //是否上传完成
        this._start = start;
        this._end = end;
        this._data = data;
        this._block = block;
    }
    /**
     * 返回chunk所属的Block对象
     * @returns {Block}
     */


    _createClass(Chunk, [{
        key: "block",
        get: function get() {
            return this._block;
        }
        /**
         * 返回字节起始位置
         * @returns {number}
         */

    }, {
        key: "start",
        get: function get() {
            return this._start;
        }
        /**
         * 返回字节结束位置
         * @returns {number}
         */

    }, {
        key: "end",
        get: function get() {
            return this._end;
        }
        /**
         * 返回分片数据
         * @returns {Blob}
         */

    }, {
        key: "data",
        get: function get() {
            return this._data;
        }
        /**
         * 是否已经结束
         * @returns {boolean}
         */

    }, {
        key: "isFinish",
        get: function get() {
            return this._isFinish;
        },
        set: function set(value) {
            this._isFinish = value;
        }
    }, {
        key: "host",
        get: function get() {
            return this._host;
        },
        set: function set(value) {
            this._host = value;
        }
        /**
         * 是否上传中
         * @returns {boolean}
         */

    }, {
        key: "processing",
        get: function get() {
            return this._processing;
        },
        set: function set(value) {
            this._processing = value;
        }
        /**
         * 返回上传控制信息(七牛服务器返回前一次上传返回的分片上传控制信息,用于下一次上传,第一个chunk此值为空)
         * @returns {string}
         */

    }, {
        key: "ctx",
        get: function get() {
            return this._ctx;
        },
        set: function set(value) {
            this._ctx = value;
        }
    }]);

    return Chunk;
}();

exports.ChunkTask = ChunkTask;
exports.Block = Block;
exports.Chunk = Chunk;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseTask2 = __webpack_require__(3);

var _BaseTask3 = _interopRequireDefault(_BaseTask2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 直传任务
 */
var DirectTask = function (_BaseTask) {
  _inherits(DirectTask, _BaseTask);

  function DirectTask() {
    _classCallCheck(this, DirectTask);

    return _possibleConstructorReturn(this, (DirectTask.__proto__ || Object.getPrototypeOf(DirectTask)).apply(this, arguments));
  }

  return DirectTask;
}(_BaseTask3.default);

exports.default = DirectTask;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UUID = function () {
    function UUID() {
        _classCallCheck(this, UUID);
    }

    _createClass(UUID, null, [{
        key: 'uuid',
        value: function uuid() {
            var d = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
        }
    }]);

    return UUID;
}();

exports.default = UUID;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        value: function value(callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);
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
    var _toString = {}.toString;
    var endsWith = function endsWith(search) {
        if (this == null) {
            throw TypeError();
        }
        var string = String(this);
        if (search && _toString.call(search) == '[object RegExp]') {
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
    } else {
        String.prototype.endsWith = endsWith;
    }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=qiniu4js.js.map