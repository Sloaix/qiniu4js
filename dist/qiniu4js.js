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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

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

Log._enable = true;
exports.default = Log;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var DirectTask_1 = __webpack_require__(10);
var ChunkTask_1 = __webpack_require__(9);
var UUID_1 = __webpack_require__(11);
var UploaderBuilder_1 = __webpack_require__(2);
var Log_1 = __webpack_require__(0);
var SimpleUploadListener_1 = __webpack_require__(5);
var DirectUploadPattern_1 = __webpack_require__(8);
var ChunkUploadPattern_1 = __webpack_require__(7);
__webpack_require__(12);

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
                            if (interceptor.onIntercept(task)) {
                                interceptedTasks.push(task);
                                Log_1.default.d("任务拦截器拦截了任务:");
                                Log_1.default.d(task);
                            }
                            //打断生效
                            if (interceptor.onInterrupt(task)) {
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
                Log_1.default.w("任务拦截器中断了任务队列");
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
                    Log_1.default.d("开始自动上传");
                    _this2.start();
                }
            });
        };
        this.resolveUUID = function (s) {
            var re = /\$\(uuid\)/;
            if (re.test(s)) {
                return s.replace(re, UUID_1.default.uuid());
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
        this._listener = Object.assign(new SimpleUploadListener_1.default(), builder.getListener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
        this._fileInputId = this.FILE_INPUT_EL_ID + "_" + new Date().getTime();
        Log_1.default.enable = builder.getIsDebug;
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
                Log_1.default.d("accept\u7C7B\u578B " + acceptValue);
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
            Log_1.default.d("开始重置 uploader");
            this.taskQueue.length = 0;
            Log_1.default.d("任务队列已清空");
            this._token = null;
            Log_1.default.d("token已清空");
            Log_1.default.d("uploader 重置完毕");
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
                if (this.chunk && file.size > UploaderBuilder_1.default.BLOCK_SIZE) {
                    task = new ChunkTask_1.ChunkTask(file, UploaderBuilder_1.default.BLOCK_SIZE, this.size);
                } else {
                    task = new DirectTask_1.default(file);
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
                        Log_1.default.d(task.file.name + " \u5904\u7406\u524D\u7684\u56FE\u7247\u5927\u5C0F:" + task.file.size / 1024 + " kb");
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
                                    Log_1.default.d(task.file.name + " \u5904\u7406\u540E\u7684\u56FE\u7247\u5927\u5C0F:" + blob.size / 1024 + " kb");
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
            Log_1.default.d("开始检查构建参数合法性");
            if (!this._tokenFunc) {
                throw new Error('你必须提供一个获取Token的回调函数');
            }
            if (!this.scale || !(this.scale instanceof Array) || this.scale.length != 2 || this.scale[0] < 0 || this.scale[1] < 0) {
                throw new Error('scale必须是长度为2的number类型的数组,scale[0]为宽度，scale[1]为长度,必须大于等于0');
            }
            Log_1.default.d("构建参数检查完毕");
        }
        /**
         * 开始上传
         */

    }, {
        key: "start",
        value: function start() {
            Log_1.default.d("\u4E0A\u4F20\u4EFB\u52A1\u904D\u5386\u5F00\u59CB");
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

                    Log_1.default.d("\u4E0A\u4F20\u6587\u4EF6\u540D\uFF1A" + _task2.file.name);
                    Log_1.default.d("\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\uFF1A" + _task2.file.size + "\u5B57\u8282\uFF0C" + _task2.file.size / 1024 + " kb\uFF0C" + _task2.file.size / 1024 / 1024 + " mb");
                    //根据任务的类型调用不同的上传模式进行上传
                    if (Uploader.isDirectTask(_task2)) {
                        Log_1.default.d('该上传任务为直传任务');
                        //直传
                        new DirectUploadPattern_1.default(this).upload(_task2);
                    } else if (Uploader.isChunkTask(_task2)) {
                        Log_1.default.d('该上传任务为分片任务');
                        //分块上传
                        new ChunkUploadPattern_1.default(this).upload(_task2);
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
            Log_1.default.d("\u5F00\u59CB\u83B7\u53D6\u4E0A\u4F20token");
            return Promise.resolve(this._tokenFunc(this, task)).then(function (token) {
                Log_1.default.d("\u4E0A\u4F20token\u83B7\u53D6\u6210\u529F: " + token);
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
            return task.constructor.name === ChunkTask_1.ChunkTask.name && task instanceof ChunkTask_1.ChunkTask;
        }
        /**
         * 是否是直传任务
         * @param task
         * @returns {boolean}
         */

    }, {
        key: "isDirectTask",
        value: function isDirectTask(task) {
            return task.constructor.name === DirectTask_1.default.name && task instanceof DirectTask_1.default;
        }
    }]);

    return Uploader;
}();

exports.default = Uploader;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Uploader_1 = __webpack_require__(1);
var SimpleUploadInterceptor_1 = __webpack_require__(6);
/**
 * UploaderBuilder
 *
 */

var UploaderBuilder = function () {
    function UploaderBuilder() {
        _classCallCheck(this, UploaderBuilder);

        this._retry = 0; //最大重试次数
        this._domain = UploaderBuilder.UPLOAD_DOMAIN; //上传域名
        this._scheme = window.location.protocol; //上传域名的 scheme
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
            this._interceptors.push(Object.assign(new SimpleUploadInterceptor_1.default(), _interceptor));
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
        // /**
        //  * 设置分片大小
        //  * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
        //  * @returns {UploaderBuilder}
        //  */
        // private size(size: number): UploaderBuilder {
        //     this._size = Math.min(Math.max(size, 1), UploaderBuilder.MAX_CHUNK_SIZE);
        //     return this;
        // }
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
            return new Uploader_1.default(this);
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
            if (domain == null) {
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
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


Object.defineProperty(exports, "__esModule", { value: true });
var Uploader_1 = __webpack_require__(1);
exports.Uploader = Uploader_1.default;
var UploaderBuilder_1 = __webpack_require__(2);
exports.UploaderBuilder = UploaderBuilder_1.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = __webpack_require__(0);
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

            Log_1.default.d("\u51C6\u5907\u5F00\u59CB\u4E0A\u4F20\u5757");
            var chain = Promise.resolve();
            Log_1.default.d("\u5171" + this.task.blocks.length + "\u5757\u7B49\u5F85\u4E0A\u4F20");
            Log_1.default.d("\u5171" + this.task.totalChunkCount + "\u5206\u7247\u7B49\u5F85\u4E0A\u4F20");
            this.task.blocks.forEach(function (block, blockIndex) {
                block.chunks.forEach(function (chunk, chunkIndex) {
                    chain = chain.then(function () {
                        Log_1.default.d("\u5F00\u59CB\u4E0A\u4F20\u7B2C" + (blockIndex + 1) + "\u5757,\u7B2C" + (chunkIndex + 1) + "\u7247");
                        return _this2.uploadChunk(chunk, token);
                    });
                });
            });
            chain.then(function () {
                return _this2.concatChunks(token);
            }).then(function () {
                //所有任务都结束了
                if (_this2.uploader.isTaskQueueFinish()) {
                    Log_1.default.d("\u4E0A\u4F20\u4EFB\u52A1\u961F\u5217\u5DF2\u7ED3\u675F");
                    //更改任务执行中标志
                    _this2.uploader.tasking = false;
                    //监听器调用
                    _this2.uploader.listener.onFinish(_this2.uploader.taskQueue);
                }
            }).catch(function (response) {
                Log_1.default.w(_this2.task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25");
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
                            Log_1.default.w(_this4.task.file.name + "\u5206\u5757\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
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
                Log_1.default.w(task.file.name + "\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650" + this.uploader.retry + ",\u505C\u6B62\u91CD\u4F20");
                return false;
            }
            task.retry++;
            Log_1.default.w(task.file.name + "\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570" + task.retry);
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = __webpack_require__(0);
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
        key: "upload",
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
        key: "createFormData",
        value: function createFormData(token) {
            var task = this.task;
            var formData = new FormData();
            //key存在，添加到formData中，若不设置，七牛服务器会自动生成hash key
            if (task.key !== null && task.key !== undefined) {
                formData.append('key', task.key);
            }
            formData.append('token', token);
            formData.append('file', task.file);
            Log_1.default.d("\u521B\u5EFAformData\u5BF9\u8C61");
            return formData;
        }
        /**
         * 上传文件
         * @param token
         */

    }, {
        key: "uploadFile",
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
                        Log_1.default.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25,\u51C6\u5907\u5F00\u59CB\u91CD\u4F20");
                        _this2.uploader.listener.onTaskRetry(task);
                    } else {
                        Log_1.default.w(task.file.name + "\u4E0A\u4F20\u5931\u8D25");
                        task.error = xhr.response;
                        task.isSuccess = false;
                        task.isFinish = true;
                        task.endDate = new Date();
                        _this2.uploader.listener.onTaskFail(task);
                    }
                    //所有任务都结束了
                    if (_this2.uploader.isTaskQueueFinish()) {
                        //更改任务执行中标志
                        _this2.uploader.tasking = false;
                        //onFinish callback
                        _this2.uploader.listener.onFinish(_this2.uploader.taskQueue);
                    }
                }
            };
            var formData = this.createFormData(token);
            xhr.send(formData);
            Log_1.default.d("发送ajax post 请求");
        }
        /**
         * 重传
         * @param task
         * @returns {boolean}
         */

    }, {
        key: "retryTask",
        value: function retryTask(task) {
            Log_1.default.d("开始尝试重传");
            //达到重试次数
            if (task.retry >= this.uploader.retry) {
                Log_1.default.w(task.file.name + "\u8FBE\u5230\u91CD\u4F20\u6B21\u6570\u4E0A\u9650" + this.uploader.retry + ",\u505C\u6B62\u91CD\u4F20");
                return false;
            }
            task.retry++;
            Log_1.default.w(task.file.name + "\u5F00\u59CB\u91CD\u4F20,\u5F53\u524D\u91CD\u4F20\u6B21\u6570" + task.retry);
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var BaseTask_1 = __webpack_require__(3);
/**
 * 分块任务
 */

var ChunkTask = function (_BaseTask_1$default) {
    _inherits(ChunkTask, _BaseTask_1$default);

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
}(BaseTask_1.default);

exports.ChunkTask = ChunkTask;
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

exports.Block = Block;
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

exports.Chunk = Chunk;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var BaseTask_1 = __webpack_require__(3);
/**
 * 直传任务
 */

var DirectTask = function (_BaseTask_1$default) {
  _inherits(DirectTask, _BaseTask_1$default);

  function DirectTask() {
    _classCallCheck(this, DirectTask);

    return _possibleConstructorReturn(this, (DirectTask.__proto__ || Object.getPrototypeOf(DirectTask)).apply(this, arguments));
  }

  return DirectTask;
}(BaseTask_1.default);

exports.default = DirectTask;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UUID = function () {
    function UUID() {
        _classCallCheck(this, UUID);
    }

    _createClass(UUID, null, [{
        key: "uuid",
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
// /**
//  * Object.assign polyfill
//  */
// if (typeof Object.assign != 'function') {
//     Object.assign = function (target) {
//         if (target == null) {
//             throw new TypeError('Cannot convert undefined or null to object');
//         }
//
//         target = Object(target);
//         for (let index = 1; index < arguments.length; index++) {
//             let source = arguments[index];
//             if (source != null) {
//                 for (let key in source) {
//                     if (Object.prototype.hasOwnProperty.call(source, key)) {
//                         target[key] = source[key];
//                     }
//                 }
//             }
//         }
//         return target;
//     };
// }
//
// /**
//  * canvas.toBlob polyfill
//  */
// if (!HTMLCanvasElement.prototype.toBlob) {
//     Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
//         value: function (callback, type, quality) {
//
//             let binStr = atob(this.toDataURL(type, quality).split(',')[1]),
//                 len = binStr.length,
//                 arr = new Uint8Array(len);
//
//             for (let i = 0; i < len; i++) {
//                 arr[i] = binStr.charCodeAt(i);
//             }
//
//             callback(new Blob([arr], {type: type || 'image/png'}));
//         }
//     });
// }
//
// /**
//  * endsWith polyfill
//  */
// if (!String.prototype.endsWith) {
//     let toString = {}.toString;
//     let endsWith = function (search) {
//         if (this == null) {
//             throw TypeError();
//         }
//         let string = String(this);
//         if (search && toString.call(search) == '[object RegExp]') {
//             throw TypeError();
//         }
//         let stringLength = string.length;
//         let searchString = String(search);
//         let searchLength = searchString.length;
//         let pos = stringLength;
//         if (arguments.length > 1) {
//             let position = arguments[1];
//             if (position !== undefined) {
//                 // `ToInteger`
//                 pos = position ? Number(position) : 0;
//                 if (pos != pos) { // better `isNaN`
//                     pos = 0;
//                 }
//             }
//         }
//         let end = Math.min(Math.max(pos, 0), stringLength);
//         let start = end - searchLength;
//         if (start < 0) {
//             return false;
//         }
//         let index = -1;
//         while (++index < searchLength) {
//             if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
//                 return false;
//             }
//         }
//         return true;
//     };
//     if (Object.defineProperty) {
//         Object.defineProperty(String.prototype, 'endsWith', {
//             'value': endsWith,
//             'configurable': true,
//             'writable': true
//         });
//     } else {
//         String.prototype.endsWith = endsWith;
//     }
// } 


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMzUwNTAxZjk5ZmNlMWE4YjA3NiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9Mb2cudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwbG9hZC9VcGxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBsb2FkL1VwbG9hZGVyQnVpbGRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBsb2FkL3Rhc2svQmFzZVRhc2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwbG9hZC9ob29rL1NpbXBsZVVwbG9hZExpc3RlbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy91cGxvYWQvaW50ZXJjZXB0b3IvU2ltcGxlVXBsb2FkSW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwbG9hZC9wYXR0cmVuL0NodW5rVXBsb2FkUGF0dGVybi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBsb2FkL3BhdHRyZW4vRGlyZWN0VXBsb2FkUGF0dGVybi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBsb2FkL3Rhc2svQ2h1bmtUYXNrLnRzIiwid2VicGFjazovLy8uL3NyYy91cGxvYWQvdGFzay9EaXJlY3RUYXNrLnRzIiwid2VicGFjazovLy8uL3NyYy91cGxvYWQvdXVpZC9VVUlELnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL1BvbHlmaWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QVEsS0FBUyxTQUNwRDtBQUNKLGFBTGlEO0FBTXBEOzs7Ozs7QUFFRCxrQkFBb0IsSzs7Ozs7OztBQ1hkO0FBQ3NCO0FBQ3RCO0FBQ3NDO0FBQ0Y7QUFDVjtBQUNpRDtBQUNyRTtBQUNWO0FBQ2lDO0FBQ2dDO0FBQ3RCO0FBQ1Q7QUFDUTtBQUNtQztBQUMxQjtBQUM3QjtBQUNKO0FBQ0o7QUFDSjtBQUNhO0FBQ2hCO0FBQ0w7QUFDRjtBQUNJO0FBQ3NCO0FBQ3RCO0FBQ3VDO0FBQ3dCO0FBQ2Y7QUFDcEQ7QUFDNEU7QUFDdkM7QUFDTTtBQUMzQztBQUM0QztBQUNHO0FBQ2pDO0FBQ2Q7QUFDb0U7QUFDMUQ7QUFDRjtBQUNOO0FBQ0Y7QUFDSTtBQUNpQjtBQUNqQjtBQUM4QjtBQUNGO0FBQ087QUFDWDtBQUNHO0FBQ3JCO0FBQ3lCO0FBQ2lDO0FBQ3JDO0FBQ3JCO0FBQ2dDO0FBQ0M7QUFDSztBQUNoQjtBQUNJO0FBQ0s7QUFDQztBQUNYO0FBQ3dCO0FBQ0g7QUFDdkI7QUFDWDtBQUNKO0FBQ0o7QUFDa0Q7QUFDcEI7QUFDZjtBQUNDO0FBQ2hCO0FBQ2M7QUFDaUI7QUFDNkM7QUFDeEQ7QUFDaEI7QUFDSjtBQUNXO0FBQ2Q7QUFDMEI7QUFDNkI7QUFDL0I7QUFDRztBQUNMO0FBQ2pCO0FBQ0M7QUFDaUM7QUFDeEM7QUFDSiIsImZpbGUiOiJxaW5pdTRqcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlFpbml1XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlFpbml1XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjM1MDUwMWY5OWZjZTFhOGIwNzYiLCJjbGFzcyBMb2cge1xuICAgIHB1YmxpYyBzdGF0aWMgX2VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBzdGF0aWMgZ2V0IGVuYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IGVuYWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9lbmFibGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGQob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgaWYgKCFMb2cuX2VuYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGVidWcob2JqZWN0KTtcbiAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBsKG9iamVjdDogYW55KSB7XG4gICAgICAgIGlmICghTG9nLl9lbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZShvYmplY3Q6IGFueSkge1xuICAgICAgICBpZiAoIUxvZy5fZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcihvYmplY3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdyhvYmplY3Q6IGFueSkge1xuICAgICAgICBpZiAoIUxvZy5fZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpKG9iamVjdDogYW55KSB7XG4gICAgICAgIGlmICghTG9nLl9lbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmluZm8ob2JqZWN0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9Mb2cudHMiLCJpbXBvcnQgQmFzZVRhc2sgZnJvbSBcIi4vdGFzay9CYXNlVGFza1wiO1xuaW1wb3J0IERpcmVjdFRhc2sgZnJvbSBcIi4vdGFzay9EaXJlY3RUYXNrXCI7XG5pbXBvcnQge0NodW5rVGFza30gZnJvbSBcIi4vdGFzay9DaHVua1Rhc2tcIjtcbmltcG9ydCBUb2tlbkZ1bmMgZnJvbSBcIi4vVG9rZW5GdW5jXCI7XG5pbXBvcnQgVVVJRCBmcm9tIFwiLi91dWlkL1VVSURcIjtcbmltcG9ydCBVcGxvYWRlckJ1aWxkZXIgZnJvbSBcIi4vVXBsb2FkZXJCdWlsZGVyXCI7XG5pbXBvcnQgbG9nIGZyb20gXCIuLi91dGlsL0xvZ1wiO1xuaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuL2ludGVyY2VwdG9yL1VwbG9hZEludGVyY2VwdG9yXCI7XG5pbXBvcnQgVXBsb2FkTGlzdGVuZXIgZnJvbSBcIi4vaG9vay9VcGxvYWRMaXN0ZW5lclwiO1xuaW1wb3J0IFNpbXBsZVVwbG9hZExpc3RlbmVyIGZyb20gXCIuL2hvb2svU2ltcGxlVXBsb2FkTGlzdGVuZXJcIjtcbmltcG9ydCBEaXJlY3RVcGxvYWRQYXR0ZXJuIGZyb20gXCIuL3BhdHRyZW4vRGlyZWN0VXBsb2FkUGF0dGVyblwiO1xuaW1wb3J0IENodW5rVXBsb2FkUGF0dGVybiBmcm9tIFwiLi9wYXR0cmVuL0NodW5rVXBsb2FkUGF0dGVyblwiO1xuaW1wb3J0IFwiLi4vdXRpbC9Qb2x5ZmlsbFwiO1xuXG5jbGFzcyBVcGxvYWRlciB7XG4gICAgcHJpdmF0ZSBGSUxFX0lOUFVUX0VMX0lEOiBzdHJpbmcgPSAncWluaXU0anMtaW5wdXQnO1xuICAgIHByaXZhdGUgX2ZpbGVJbnB1dElkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZmlsZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50Oy8vaW5wdXQg5YWD57SgXG4gICAgcHJpdmF0ZSBfdG9rZW46IHN0cmluZzsvL3Rva2VuXG4gICAgcHJpdmF0ZSBfdGFza1F1ZXVlOiBCYXNlVGFza1tdID0gW107Ly/ku7vliqHpmJ/liJdcbiAgICBwcml2YXRlIF90YXNraW5nOiBib29sZWFuID0gZmFsc2U7Ly/ku7vliqHmiafooYzkuK1cblxuICAgIHByaXZhdGUgX3JldHJ5OiBudW1iZXI7Ly/mnIDlpKfph43or5XmrKHmlbBcbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXI7Ly/liIbniYflpKflsI8s5Y2V5L2N5a2X6IqCLOacgOWkpzRtYizkuI3og73kuLowXG4gICAgcHJpdmF0ZSBfY2h1bms6IGJvb2xlYW47Ly/liIblnZfkuIrkvKAs6K+l6YCJ6aG55byA5ZCv5ZCO77yM5Y+q5pyJ5Zyo5paH5Lu25aSn5LqONG1i55qE5pe25YCZ5omN5Lya5YiG5Z2X5LiK5LygXG4gICAgcHJpdmF0ZSBfYXV0bzogYm9vbGVhbjsvL+iHquWKqOS4iuS8oCzmr4/mrKHpgInmi6nmlofku7blkI5cbiAgICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbjsvL+aYr+WQpuaUr+aMgeWkmuaWh+S7tlxuICAgIHByaXZhdGUgX2FjY2VwdDogc3RyaW5nW107Ly/mjqXlj5fnmoTmlofku7bnsbvlnotcbiAgICBwcml2YXRlIF9idXR0b246IHN0cmluZzsvL+S4iuS8oOaMiemSrlxuICAgIHByaXZhdGUgX2J1dHRvbkV2ZW50TmFtZTogc3RyaW5nOy8v5LiK5Lyg5oyJ6ZKu55qE55uR5ZCs5LqL5Lu25ZCN56ewXG4gICAgcHJpdmF0ZSBfY29tcHJlc3M6IG51bWJlcjsvL+WbvueJh+WOi+e8qei0qOmHj1xuICAgIHByaXZhdGUgX3NjYWxlOiBudW1iZXJbXSA9IFtdOy8v57yp5pS+5aSn5bCPLOmZkOWumumrmOW6puetieavlOe8qeaUvltoOjIwMCx3OjBdLOmZkOWumuWuveW6puetieavlOe8qeaUvltoOjAsdzoxMDBdLOmZkOWumumVv+WuvVtoOjIwMCx3OjEwMF1cbiAgICBwcml2YXRlIF9saXN0ZW5lcjogVXBsb2FkTGlzdGVuZXI7Ly/nm5HlkKzlmahcbiAgICBwcml2YXRlIF9zYXZlS2V5OiBib29sZWFuIHwgc3RyaW5nID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfdG9rZW5GdW5jOiBUb2tlbkZ1bmM7Ly90b2tlbuiOt+WPluWHveaVsFxuICAgIHByaXZhdGUgX3Rva2VuU2hhcmU6IGJvb2xlYW47Ly/liIbkuqt0b2tlbizlpoLmnpzkuLpmYWxzZSzmr4/kuIDmrKFIVFRQ6K+35rGC6YO96ZyA6KaB5paw6I635Y+WVG9rZW5cbiAgICBwcml2YXRlIF9pbnRlcmNlcHRvcnM6IEludGVyY2VwdG9yW107Ly/ku7vliqHmi6bmiKrlmahcbiAgICBwcml2YXRlIF9kb21haW46IHN0cmluZzsvL+S4iuS8oOWfn+WQjVxuXG4gICAgY29uc3RydWN0b3IoYnVpbGRlcjogVXBsb2FkZXJCdWlsZGVyKSB7XG4gICAgICAgIHRoaXMuX3JldHJ5ID0gYnVpbGRlci5nZXRSZXRyeTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IGJ1aWxkZXIuZ2V0U2l6ZTtcbiAgICAgICAgdGhpcy5fY2h1bmsgPSBidWlsZGVyLmdldENodW5rO1xuICAgICAgICB0aGlzLl9hdXRvID0gYnVpbGRlci5nZXRBdXRvO1xuICAgICAgICB0aGlzLl9tdWx0aXBsZSA9IGJ1aWxkZXIuZ2V0TXVsdGlwbGU7XG4gICAgICAgIHRoaXMuX2FjY2VwdCA9IGJ1aWxkZXIuZ2V0QWNjZXB0O1xuICAgICAgICB0aGlzLl9idXR0b24gPSBidWlsZGVyLmdldEJ1dHRvbjtcbiAgICAgICAgdGhpcy5fYnV0dG9uRXZlbnROYW1lID0gYnVpbGRlci5nZXRCdXR0b25FdmVudE5hbWU7XG4gICAgICAgIHRoaXMuX2NvbXByZXNzID0gYnVpbGRlci5nZXRDb21wcmVzcztcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBidWlsZGVyLmdldFNjYWxlO1xuICAgICAgICB0aGlzLl9zYXZlS2V5ID0gYnVpbGRlci5nZXRTYXZlS2V5O1xuICAgICAgICB0aGlzLl90b2tlbkZ1bmMgPSBidWlsZGVyLmdldFRva2VuRnVuYztcbiAgICAgICAgdGhpcy5fdG9rZW5TaGFyZSA9IGJ1aWxkZXIuZ2V0VG9rZW5TaGFyZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSBPYmplY3QuYXNzaWduKG5ldyBTaW1wbGVVcGxvYWRMaXN0ZW5lcigpLCBidWlsZGVyLmdldExpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JzID0gYnVpbGRlci5nZXRJbnRlcmNlcHRvcnM7XG4gICAgICAgIHRoaXMuX2RvbWFpbiA9IGJ1aWxkZXIuZ2V0RG9tYWluO1xuICAgICAgICB0aGlzLl9maWxlSW5wdXRJZCA9IGAke3RoaXMuRklMRV9JTlBVVF9FTF9JRH1fJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xuICAgICAgICBsb2cuZW5hYmxlID0gYnVpbGRlci5nZXRJc0RlYnVnO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGVPcHRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyW5pON5L2cXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRGaWxlSW5wdXRFbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMlmZpbGUgaW5wdXQgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEZpbGVJbnB1dEVsKCk6IHZvaWQge1xuXG4gICAgICAgIC8v5p+l6K+i5bey57uP5a2Y5Zyo55qEZmlsZSBpbnB1dFxuICAgICAgICBsZXQgZXhpc3Q6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZmlsZUlucHV0SWQpO1xuXG4gICAgICAgIC8v5Yib5bu6aW5wdXTlhYPntKBcbiAgICAgICAgdGhpcy5fZmlsZUlucHV0ID0gZXhpc3QgPyBleGlzdCA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMuZmlsZUlucHV0LnR5cGUgPSAnZmlsZSc7Ly90eXBlIGZpbGVcbiAgICAgICAgdGhpcy5maWxlSW5wdXQuaWQgPSB0aGlzLl9maWxlSW5wdXRJZDsvL2lkIOaWueS+v+WQjumdouafpeaJvlxuICAgICAgICB0aGlzLmZpbGVJbnB1dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOy8v6ZqQ6JePZmlsZSBpbnB1dFxuXG4gICAgICAgIC8v5aSa5paH5Lu2XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAvL+WkmuaWh+S7tlxuICAgICAgICAgICAgdGhpcy5maWxlSW5wdXQubXVsdGlwbGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/mlofku7bnsbvlnotcbiAgICAgICAgaWYgKHRoaXMuYWNjZXB0ICYmIHRoaXMuYWNjZXB0Lmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICBsZXQgYWNjZXB0VmFsdWU6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5hY2NlcHQpIHtcbiAgICAgICAgICAgICAgICBhY2NlcHRWYWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBhY2NlcHRWYWx1ZSArPSAnLCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY2NlcHRWYWx1ZS5lbmRzV2l0aCgnLCcpKSB7XG4gICAgICAgICAgICAgICAgYWNjZXB0VmFsdWUgPSBhY2NlcHRWYWx1ZS5zdWJzdHJpbmcoMCwgYWNjZXB0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpbGVJbnB1dC5hY2NlcHQgPSBhY2NlcHRWYWx1ZTtcbiAgICAgICAgICAgIGxvZy5kKGBhY2NlcHTnsbvlnosgJHthY2NlcHRWYWx1ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5bCGaW5wdXTlhYPntKDmt7vliqDliLBib2R55a2Q6IqC54K555qE5pyr5bC+XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5maWxlSW5wdXQpO1xuXG4gICAgICAgIC8v6YCJ5oup5paH5Lu255uR5ZCs5ZmoXG4gICAgICAgIHRoaXMuZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlRmlsZXMsIGZhbHNlKTtcblxuICAgICAgICBpZiAodGhpcy5fYnV0dG9uICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbjogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fYnV0dG9uKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2J1dHRvbkV2ZW50TmFtZSwgdGhpcy5jaG9vc2VGaWxlLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDkuIrkvKDlrozmiJDmiJbogIXlpLHotKXlkI4s5a+55pys5qyh5LiK5Lyg5Lu75Yqh6L+b6KGM5riF5omrXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldFVwbG9hZGVyKCk6IHZvaWQge1xuICAgICAgICBsb2cuZChcIuW8gOWni+mHjee9riB1cGxvYWRlclwiKTtcbiAgICAgICAgdGhpcy50YXNrUXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgbG9nLmQoXCLku7vliqHpmJ/liJflt7LmuIXnqbpcIik7XG4gICAgICAgIHRoaXMuX3Rva2VuID0gbnVsbDtcbiAgICAgICAgbG9nLmQoXCJ0b2tlbuW3sua4heepulwiKTtcbiAgICAgICAgbG9nLmQoXCJ1cGxvYWRlciDph43nva7lrozmr5VcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSE55CG5paH5Lu2XG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVGaWxlcyA9ICgpID0+IHtcbiAgICAgICAgLy/lpoLmnpzmsqHmnInpgInkuK3mlofku7blsLHov5Tlm55cbiAgICAgICAgaWYgKHRoaXMuZmlsZUlucHV0LmZpbGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL+eUn+aIkHRhc2tcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVRhc2soKTtcblxuICAgICAgICAvL+aYr+WQpuS4reaWreS7u+WKoVxuICAgICAgICBsZXQgaXNJbnRlcnJ1cHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgbGV0IGludGVyY2VwdGVkVGFza3M6IEJhc2VUYXNrW10gPSBbXTtcblxuICAgICAgICAvL+S7u+WKoeaLpuaIquWZqOi/h+a7pFxuICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRoaXMudGFza1F1ZXVlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpbnRlcmNlcHRvciBvZiB0aGlzLmludGVyY2VwdG9ycykge1xuICAgICAgICAgICAgICAgIC8v5oum5oiq55Sf5pWIXG4gICAgICAgICAgICAgICAgaWYgKGludGVyY2VwdG9yLm9uSW50ZXJjZXB0KHRhc2spKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyY2VwdGVkVGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmQoXCLku7vliqHmi6bmiKrlmajmi6bmiKrkuobku7vliqE6XCIpO1xuICAgICAgICAgICAgICAgICAgICBsb2cuZCh0YXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/miZPmlq3nlJ/mlYhcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJjZXB0b3Iub25JbnRlcnJ1cHQodGFzaykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lsIbmiZPmlq3moIflv5fkvY3orr7kuLp0cnVlXG4gICAgICAgICAgICAgICAgICAgIGlzSW50ZXJydXB0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSW50ZXJydXB0KSB7XG4gICAgICAgICAgICBsb2cudyhcIuS7u+WKoeaLpuaIquWZqOS4reaWreS6huS7u+WKoemYn+WIl1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5LuO5Lu75Yqh6Zif5YiX5Lit5Y676Zmk5Lu75YqhXG4gICAgICAgIGZvciAobGV0IHRhc2sgb2YgaW50ZXJjZXB0ZWRUYXNrcykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy50YXNrUXVldWUuaW5kZXhPZih0YXNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza1F1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+Wbnuiwg+WHveaVsOWHveaVsFxuICAgICAgICB0aGlzLmxpc3RlbmVyLm9uUmVhZHkodGhpcy50YXNrUXVldWUpO1xuXG5cbiAgICAgICAgLy/lpITnkIblm77niYdcbiAgICAgICAgdGhpcy5oYW5kbGVJbWFnZXMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8v6Ieq5Yqo5LiK5LygXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvKSB7XG4gICAgICAgICAgICAgICAgbG9nLmQoXCLlvIDlp4voh6rliqjkuIrkvKBcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmmK/liIblnZfku7vliqFcbiAgICAgKiBAcGFyYW0gdGFza1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGlzQ2h1bmtUYXNrKHRhc2s6IEJhc2VUYXNrKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0YXNrLmNvbnN0cnVjdG9yLm5hbWUgPT09IENodW5rVGFzay5uYW1lICYmIHRhc2sgaW5zdGFuY2VvZiBDaHVua1Rhc2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5piv55u05Lyg5Lu75YqhXG4gICAgICogQHBhcmFtIHRhc2tcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpc0RpcmVjdFRhc2sodGFzazogQmFzZVRhc2spOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRhc2suY29uc3RydWN0b3IubmFtZSA9PT0gRGlyZWN0VGFzay5uYW1lICYmIHRhc2sgaW5zdGFuY2VvZiBEaXJlY3RUYXNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeUn+aIkHRhc2tcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlVGFzaygpIHtcbiAgICAgICAgdGhpcy5yZXNldFVwbG9hZGVyKCk7XG5cbiAgICAgICAgbGV0IGZpbGVzOiBGaWxlTGlzdCA9IHRoaXMuZmlsZUlucHV0LmZpbGVzO1xuXG4gICAgICAgIC8v6YGN5Y6GZmlsZXMg5Yib5bu65LiK5Lyg5Lu75YqhXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmZpbGVJbnB1dC5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpbGU6IEZpbGUgPSBmaWxlc1tpXTtcblxuICAgICAgICAgICAgbGV0IHRhc2s6IEJhc2VUYXNrO1xuICAgICAgICAgICAgLy/lj6rmnInlnKjlvIDlkK/liIblnZfkuIrkvKDvvIzlubbkuJTmlofku7blpKflsI/lpKfkuo40bWLnmoTml7blgJnmiY3ov5vooYzliIblnZfkuIrkvKBcbiAgICAgICAgICAgIGlmICh0aGlzLmNodW5rICYmIGZpbGUuc2l6ZSA+IFVwbG9hZGVyQnVpbGRlci5CTE9DS19TSVpFKSB7XG4gICAgICAgICAgICAgICAgdGFzayA9IG5ldyBDaHVua1Rhc2soZmlsZSwgVXBsb2FkZXJCdWlsZGVyLkJMT0NLX1NJWkUsIHRoaXMuc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrID0gbmV3IERpcmVjdFRhc2soZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fc2F2ZUtleSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhc2sua2V5ID0gdGhpcy5saXN0ZW5lci5vblRhc2tHZXRLZXkodGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRhc2tRdWV1ZS5wdXNoKHRhc2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSE55CG5Zu+54mHLee8qeaUvi3otKjph4/ljovnvKlcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZUltYWdlcygpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcHJvbWlzZXM6IFByb21pc2U8YW55PltdID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcHJlc3MgIT0gMSB8fCB0aGlzLnNjYWxlWzBdICE9IDAgfHwgdGhpcy5zY2FsZVsxXSAhPSAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRoaXMudGFza1F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXNrLmZpbGUudHlwZS5tYXRjaCgnaW1hZ2UuKicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2cuZChgJHt0YXNrLmZpbGUubmFtZX0g5aSE55CG5YmN55qE5Zu+54mH5aSn5bCPOiR7dGFzay5maWxlLnNpemUgLyAxMDI0fSBrYmApO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGxldCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Y2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGFzay5maWxlKTtcblxuXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUpID0+XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWdXID0gaW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltZ0ggPSBpbWcuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVXID0gX3RoaXMuc2NhbGVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVIID0gX3RoaXMuc2NhbGVbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZVcgPT0gMCAmJiBzY2FsZUggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1nVyAvIGltZ0ggKiBzY2FsZUg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHNjYWxlSDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjYWxlSCA9PSAwICYmIHNjYWxlVyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBzY2FsZVc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZ0ggLyBpbWdXICogc2NhbGVXO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NhbGVXID4gMCAmJiBzY2FsZUggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gc2NhbGVXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBzY2FsZUg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+Z6YeM55qE6ZW/5a695piv57uY5Yi25Yiw55S75biD5LiK55qE5Zu+54mH55qE6ZW/5a69XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNhbnZhcy50b0Jsb2IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8wLjk15piv5pyA5o6l6L+R5Y6f5Zu+5aSn5bCP77yM5aaC5p6c6LSo6YeP5Li6MeeahOivneS8muWvvOiHtOavlOWOn+WbvuWkp+WHoOWAjeOAglxuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLnRvQmxvYigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmQoYCR7dGFzay5maWxlLm5hbWV9IOWkhOeQhuWQjueahOWbvueJh+Wkp+Wwjzoke2Jsb2Iuc2l6ZSAvIDEwMjR9IGtiYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcImltYWdlL2pwZWdcIiwgX3RoaXMuY29tcHJlc3MgKiAwLjk1KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbigoYmxvYjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2IubmFtZSA9IHRhc2suZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmZpbGUgPSBibG9iO1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXBsb2FkZXIuaXNDaHVua1Rhc2sodGFzaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8Q2h1bmtUYXNrPnRhc2spLnNwbGljZUZpbGUyQmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOmqjOmAiemhueWQiOazleaAp1xuICAgICAqL1xuICAgIHByaXZhdGUgIHZhbGlkYXRlT3B0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgbG9nLmQoXCLlvIDlp4vmo4Dmn6XmnoTlu7rlj4LmlbDlkIjms5XmgKdcIik7XG4gICAgICAgIGlmICghdGhpcy5fdG9rZW5GdW5jKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+S9oOW/hemhu+aPkOS+m+S4gOS4quiOt+WPllRva2Vu55qE5Zue6LCD5Ye95pWwJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNjYWxlIHx8ICEodGhpcy5zY2FsZSBpbnN0YW5jZW9mIEFycmF5KSB8fCB0aGlzLnNjYWxlLmxlbmd0aCAhPSAyIHx8IHRoaXMuc2NhbGVbMF0gPCAwIHx8IHRoaXMuc2NhbGVbMV0gPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NjYWxl5b+F6aG75piv6ZW/5bqm5Li6MueahG51bWJlcuexu+Wei+eahOaVsOe7hCxzY2FsZVswXeS4uuWuveW6pu+8jHNjYWxlWzFd5Li66ZW/5bqmLOW/hemhu+Wkp+S6juetieS6jjAnKTtcbiAgICAgICAgfVxuICAgICAgICBsb2cuZChcIuaehOW7uuWPguaVsOajgOafpeWujOavlVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvIDlp4vkuIrkvKBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIGxvZy5kKGDkuIrkvKDku7vliqHpgY3ljoblvIDlp4tgKTtcblxuICAgICAgICBpZiAodGhpcy5maWxlSW5wdXQuZmlsZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign5rKh5pyJ6YCJ5Lit55qE5paH5Lu277yM5peg5rOV5byA5aeL5LiK5LygJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50YXNraW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+S7u+WKoeaJp+ihjOS4re+8jOivt+S4jeimgemHjeWkjeS4iuS8oCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0ZW5lci5vblN0YXJ0KHRoaXMudGFza1F1ZXVlKTtcblxuICAgICAgICAvL+mBjeWOhuS7u+WKoemYn+WIl1xuICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRoaXMudGFza1F1ZXVlKSB7XG4gICAgICAgICAgICBsb2cuZChg5LiK5Lyg5paH5Lu25ZCN77yaJHt0YXNrLmZpbGUubmFtZX1gKTtcbiAgICAgICAgICAgIGxvZy5kKGDkuIrkvKDmlofku7blpKflsI/vvJoke3Rhc2suZmlsZS5zaXplfeWtl+iKgu+8jCR7dGFzay5maWxlLnNpemUgLyAxMDI0fSBrYu+8jCR7dGFzay5maWxlLnNpemUgLyAxMDI0IC8gMTAyNH0gbWJgKTtcbiAgICAgICAgICAgIC8v5qC55o2u5Lu75Yqh55qE57G75Z6L6LCD55So5LiN5ZCM55qE5LiK5Lyg5qih5byP6L+b6KGM5LiK5LygXG4gICAgICAgICAgICBpZiAoVXBsb2FkZXIuaXNEaXJlY3RUYXNrKHRhc2spKSB7XG4gICAgICAgICAgICAgICAgbG9nLmQoJ+ivpeS4iuS8oOS7u+WKoeS4uuebtOS8oOS7u+WKoScpO1xuICAgICAgICAgICAgICAgIC8v55u05LygXG4gICAgICAgICAgICAgICAgbmV3IERpcmVjdFVwbG9hZFBhdHRlcm4odGhpcykudXBsb2FkKDxEaXJlY3RUYXNrPnRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoVXBsb2FkZXIuaXNDaHVua1Rhc2sodGFzaykpIHtcbiAgICAgICAgICAgICAgICBsb2cuZCgn6K+l5LiK5Lyg5Lu75Yqh5Li65YiG54mH5Lu75YqhJyk7XG4gICAgICAgICAgICAgICAgLy/liIblnZfkuIrkvKBcbiAgICAgICAgICAgICAgICBuZXcgQ2h1bmtVcGxvYWRQYXR0ZXJuKHRoaXMpLnVwbG9hZCg8Q2h1bmtUYXNrPnRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfpnZ7ms5XnmoR0YXNr57G75Z6LJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiYDmnInku7vliqHmmK/lkKblrozmiJBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUYXNrUXVldWVGaW5pc2goKSB7XG4gICAgICAgIGZvciAobGV0IHRhc2sgb2YgdGhpcy50YXNrUXVldWUpIHtcbiAgICAgICAgICAgIGlmICghdGFzay5pc0ZpbmlzaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgInmi6nmlofku7ZcbiAgICAgKi9cbiAgICBwdWJsaWMgY2hvb3NlRmlsZSgpIHtcbiAgICAgICAgdGhpcy5maWxlSW5wdXQuY2xpY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9rZW4odGFzazogQmFzZVRhc2spOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAodGhpcy5fdG9rZW5TaGFyZSAmJiB0aGlzLl90b2tlbiAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fdG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGxvZy5kKGDlvIDlp4vojrflj5bkuIrkvKB0b2tlbmApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3Rva2VuRnVuYyh0aGlzLCB0YXNrKSkudGhlbigodG9rZW46IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBsb2cuZChg5LiK5LygdG9rZW7ojrflj5bmiJDlip86ICR7dG9rZW59YCk7XG4gICAgICAgICAgICB0aGlzLl90b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVxdWVzdFRhc2tUb2tlbih0YXNrOiBCYXNlVGFzaywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlU2F2ZUtleSh0YXNrKS50aGVuKChzYXZlS2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RUb2tlbih1cmwsIHNhdmVLZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RUb2tlbih1cmw6IHN0cmluZywgc2F2ZUtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2F2ZUtleSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9ICgoL1xcPy8pLnRlc3QodXJsKSA/IFwiJlwiIDogXCI/XCIpICsgXCJzYXZlS2V5PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNhdmVLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXJsICs9ICgoL1xcPy8pLnRlc3QodXJsKSA/IFwiJlwiIDogXCI/XCIpICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgbGV0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZS51cHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWplY3QoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub25hYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ2Fib3J0ZWQnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNvbHZlU2F2ZUtleSh0YXNrOiBCYXNlVGFzayk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCBzYXZlS2V5ID0gdGhpcy5fc2F2ZUtleTtcbiAgICAgICAgaWYgKHR5cGVvZiBzYXZlS2V5ICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNhdmVLZXkpXG4gICAgICAgICAgICAudGhlbih0aGlzLnJlc29sdmVVVUlEKVxuICAgICAgICAgICAgLnRoZW4oc2F2ZUtleSA9PiB0aGlzLnJlc29sdmVJbWFnZUluZm8odGFzay5maWxlLCBzYXZlS2V5KSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMub25TYXZlS2V5UmVzb2x2ZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzb2x2ZVVVSUQgPSAoczogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgbGV0IHJlID0gL1xcJFxcKHV1aWRcXCkvO1xuICAgICAgICBpZiAocmUudGVzdChzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHMucmVwbGFjZShyZSwgVVVJRC51dWlkKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHJlc29sdmVJbWFnZUluZm8gPSAoYmxvYjogQmxvYiwgczogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgbGV0IHdpZHRoUmUgPSAvXFwkXFwoaW1hZ2VJbmZvXFwud2lkdGhcXCkvO1xuICAgICAgICBsZXQgaGVpZ2h0UmUgPSAvXFwkXFwoaW1hZ2VJbmZvXFwuaGVpZ2h0XFwpLztcbiAgICAgICAgaWYgKCF3aWR0aFJlLnRlc3QocykgJiYgIWhlaWdodFJlLnRlc3QocykpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBzID0gcy5yZXBsYWNlKHdpZHRoUmUsIGltZy53aWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBzID0gcy5yZXBsYWNlKGhlaWdodFJlLCBpbWcuaGVpZ2h0LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBvblNhdmVLZXlSZXNvbHZlZCA9IChzYXZlS2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICB0aGlzLl90b2tlblNoYXJlID0gdGhpcy5fdG9rZW5TaGFyZSAmJiB0aGlzLl9zYXZlS2V5ID09IHNhdmVLZXk7XG4gICAgICAgIHJldHVybiBzYXZlS2V5O1xuICAgIH07XG5cbiAgICBnZXQgcmV0cnkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JldHJ5O1xuICAgIH1cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIGdldCBhdXRvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0bztcbiAgICB9XG5cbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBnZXQgYWNjZXB0KCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjY2VwdDtcbiAgICB9XG5cbiAgICBnZXQgY29tcHJlc3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXByZXNzO1xuICAgIH1cblxuICAgIGdldCBzY2FsZSgpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgICB9XG5cbiAgICBnZXQgbGlzdGVuZXIoKTogVXBsb2FkTGlzdGVuZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXI7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGVJbnB1dCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVJbnB1dDtcbiAgICB9XG5cbiAgICBnZXQgY2h1bmsoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaHVuaztcbiAgICB9XG5cbiAgICBnZXQgdGFza1F1ZXVlKCk6IEJhc2VUYXNrW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFza1F1ZXVlO1xuICAgIH1cblxuXG4gICAgZ2V0IHRhc2tpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YXNraW5nO1xuICAgIH1cblxuICAgIHNldCB0YXNraW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Rhc2tpbmcgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgaW50ZXJjZXB0b3JzKCk6IEludGVyY2VwdG9yW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJjZXB0b3JzO1xuICAgIH1cblxuICAgIGdldCBkb21haW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvbWFpbjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVwbG9hZGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cGxvYWQvVXBsb2FkZXIudHMiLCJpbXBvcnQgVXBsb2FkZXIgZnJvbSBcIi4vVXBsb2FkZXJcIjtcbmltcG9ydCBCYXNlVGFzayBmcm9tIFwiLi90YXNrL0Jhc2VUYXNrXCI7XG5pbXBvcnQgVG9rZW5GdW5jIGZyb20gXCIuL1Rva2VuRnVuY1wiO1xuaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuL2ludGVyY2VwdG9yL1VwbG9hZEludGVyY2VwdG9yXCI7XG5pbXBvcnQgU2ltcGxlVXBsb2FkSW50ZXJjZXB0b3IgZnJvbSBcIi4vaW50ZXJjZXB0b3IvU2ltcGxlVXBsb2FkSW50ZXJjZXB0b3JcIjtcbmltcG9ydCBVcGxvYWRMaXN0ZW5lciBmcm9tIFwiLi9ob29rL1VwbG9hZExpc3RlbmVyXCI7XG5pbXBvcnQge1NjaGVtZSwgRG9tYWlufSBmcm9tIFwiLi91cmwvRG9tYWluXCI7XG5cbi8qKlxuICogVXBsb2FkZXJCdWlsZGVyXG4gKlxuICovXG5jbGFzcyBVcGxvYWRlckJ1aWxkZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgTUFYX0NIVU5LX1NJWkUgPSA0ICogMTAyNCAqIDEwMjQ7Ly/liIbniYfmnIDlpKflgLxcbiAgICBwdWJsaWMgc3RhdGljIEJMT0NLX1NJWkUgPSBVcGxvYWRlckJ1aWxkZXIuTUFYX0NIVU5LX1NJWkU7Ly/liIblnZflpKflsI/vvIzlj6rmnInlpKfkuo7ov5nkuKrmlbDmiY3pnIDopoHliIblnZdcbiAgICBwdWJsaWMgc3RhdGljIFVQTE9BRF9ET01BSU4gPSB7aHR0cDogJ2h0dHA6Ly91cGxvYWQucWluaXUuY29tJywgaHR0cHM6ICdodHRwczovL3VwLnFib3gubWUnfTtcblxuICAgIHByaXZhdGUgX3JldHJ5OiBudW1iZXIgPSAwOy8v5pyA5aSn6YeN6K+V5qyh5pWwXG4gICAgcHJpdmF0ZSBfZG9tYWluOiBEb21haW4gPSBVcGxvYWRlckJ1aWxkZXIuVVBMT0FEX0RPTUFJTjsvL+S4iuS8oOWfn+WQjVxuICAgIHByaXZhdGUgX3NjaGVtZTogU2NoZW1lID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sOy8v5LiK5Lyg5Z+f5ZCN55qEIHNjaGVtZVxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlciA9IDEwMjQgKiAxMDI0Oy8v5YiG54mH5aSn5bCPLOWNleS9jeWtl+iKgizkuIrpmZA0bSzkuI3og73kuLowXG4gICAgcHJpdmF0ZSBfY2h1bms6IGJvb2xlYW4gPSB0cnVlOy8v5YiG5Z2X5LiK5LygXG4gICAgcHJpdmF0ZSBfYXV0bzogYm9vbGVhbiA9IHRydWU7Ly/oh6rliqjkuIrkvKAs5q+P5qyh6YCJ5oup5paH5Lu25ZCOXG4gICAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSB0cnVlOy8v5piv5ZCm5pSv5oyB5aSa5paH5Lu2XG4gICAgcHJpdmF0ZSBfYWNjZXB0OiBzdHJpbmdbXSA9IFtdOy8v5o6l5Y+X55qE5paH5Lu257G75Z6LXG4gICAgcHJpdmF0ZSBfYnV0dG9uOiBzdHJpbmc7Ly/kuIrkvKDmjInpkq5cbiAgICBwcml2YXRlIF9idXR0b25FdmVudE5hbWU6IHN0cmluZzsvL+S4iuS8oOaMiemSrueahOebkeWQrOS6i+S7tuWQjeensFxuICAgIHByaXZhdGUgX2NvbXByZXNzOiBudW1iZXIgPSAxOy8v5Zu+54mH5Y6L57yp6LSo6YePXG4gICAgcHJpdmF0ZSBfc2NhbGU6IG51bWJlcltdID0gWzAsIDBdOy8v57yp5pS+5aSn5bCPLOmZkOWumumrmOW6puetieavlFtoOjIwMCx3OjBdLOmZkOWumuWuveW6puetieavlFtoOjAsdzoxMDBdLOmZkOWumumVv+WuvVtoOjIwMCx3OjEwMF1cbiAgICBwcml2YXRlIF9saXN0ZW5lcjogVXBsb2FkTGlzdGVuZXI7Ly/nm5HlkKzlmahcbiAgICBwcml2YXRlIF9zYXZlS2V5OiBib29sZWFuIHwgc3RyaW5nID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfdG9rZW5GdW5jOiBUb2tlbkZ1bmM7Ly90b2tlbuiOt+WPluWHveaVsFxuICAgIHByaXZhdGUgX3Rva2VuU2hhcmU6IGJvb2xlYW4gPSB0cnVlOy8v5YiG5LqrdG9rZW4s5aaC5p6c5Li6ZmFsc2Us5q+P5LiA5qyhSFRUUOivt+axgumDvemcgOimgeaWsOiOt+WPllRva2VuXG4gICAgcHJpdmF0ZSBfaW50ZXJjZXB0b3JzOiBJbnRlcmNlcHRvcltdID0gW107Ly/ku7vliqHmi6bmiKrlmahcbiAgICBwcml2YXRlIF9pc0RlYnVnOiBib29sZWFuID0gZmFsc2U7Ly9cblxuXG4gICAgLyoqXG4gICAgICog6K6+572u5LiK5Lyg55qE5Z+f5ZCNLOm7mOiupOaYryB7aHR0cDogJ2h0dHA6Ly91cGxvYWQucWluaXUuY29tJywgaHR0cHM6ICdodHRwczovL3VwLnFib3gubWUnfVxuICAgICAqIEBwYXJhbSBkb21haW5cbiAgICAgKiBAcmV0dXJucyB7VXBsb2FkZXJCdWlsZGVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBkb21haW4oZG9tYWluOiBEb21haW4pOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl9kb21haW4gPSBkb21haW47XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9ruS4iuS8oOWfn+WQjeeahOWNj+iuruexu+Wei++8jOm7mOiupOS7jiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wg6K+75Y+WXG4gICAgICogQHBhcmFtIHNjaGVtZVxuICAgICAqIEByZXR1cm5zIHtVcGxvYWRlckJ1aWxkZXJ9XG4gICAgICovXG4gICAgcHVibGljIHNjaGVtZShzY2hlbWU6IFNjaGVtZSk6IFVwbG9hZGVyQnVpbGRlciB7XG4gICAgICAgIHRoaXMuX3NjaGVtZSA9IHNjaGVtZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5LiA5Liq5oum5oiq5ZmoXG4gICAgICogQHBhcmFtIGludGVyY2VwdG9yXG4gICAgICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgaW50ZXJjZXB0b3IoaW50ZXJjZXB0b3I6IEludGVyY2VwdG9yKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JzLnB1c2goT2JqZWN0LmFzc2lnbihuZXcgU2ltcGxlVXBsb2FkSW50ZXJjZXB0b3IoKSwgaW50ZXJjZXB0b3IpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiK5Lyg5aSx6LSl5ZCO55qE6YeN5Lyg5bCd6K+V5qyh5pWwXG4gICAgICogQHBhcmFtIHJldHJ5IOm7mOiupDDmrKHvvIzkuI3lsJ3or5XmrKHph43kvKBcbiAgICAgKiBAcmV0dXJucyB7VXBsb2FkZXJCdWlsZGVyfVxuICAgICAqL1xuICAgIHB1YmxpYyByZXRyeShyZXRyeTogbnVtYmVyKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5fcmV0cnkgPSByZXRyeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICog6K6+572u5YiG54mH5aSn5bCPXG4gICAgLy8gICogQHBhcmFtIHNpemUg5YiG5Z2X5aSn5bCPLOWNleS9jeWtl+iKgizpu5jorqQ0KjEwMjQqMTAyNOWtl+iKgig0bWIpXG4gICAgLy8gICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAvLyAgKi9cbiAgICAvLyBwcml2YXRlIHNpemUoc2l6ZTogbnVtYmVyKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAvLyAgICAgdGhpcy5fc2l6ZSA9IE1hdGgubWluKE1hdGgubWF4KHNpemUsIDEpLCBVcGxvYWRlckJ1aWxkZXIuTUFYX0NIVU5LX1NJWkUpO1xuICAgIC8vICAgICByZXR1cm4gdGhpcztcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDpgInmi6nmlofku7blkI4s5piv5ZCm6Ieq5Yqo5LiK5LygXG4gICAgICogQHBhcmFtIGF1dG8g6buY6K6kdHJ1ZVxuICAgICAqIEByZXR1cm5zIHtVcGxvYWRlckJ1aWxkZXJ9XG4gICAgICovXG4gICAgcHVibGljIGF1dG8oYXV0bzogYm9vbGVhbik6IFVwbG9hZGVyQnVpbGRlciB7XG4gICAgICAgIHRoaXMuX2F1dG8gPSBhdXRvO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmlK/mjIHlpJrmlofku7bpgInmi6lcbiAgICAgKiBAcGFyYW0gbXVsdGlwbGUg6buY6K6kdHJ1ZVxuICAgICAqIEByZXR1cm5zIHtVcGxvYWRlckJ1aWxkZXJ9XG4gICAgICovXG4gICAgcHVibGljIG11bHRpcGxlKG11bHRpcGxlOiBib29sZWFuKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5fbXVsdGlwbGUgPSBtdWx0aXBsZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o6l5Y+X5LiK5Lyg55qE5paH5Lu257G75Z6LXG4gICAgICogQHBhcmFtIGFjY2VwdCDmlbDnu4TlvaLlvI/kvovlpoI6WycucG5nJywndmlkZW8vKiddXG4gICAgICpcbiAgICAgKiDor6bnu4bphY3nva7op4FodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9hdHRfaW5wdXRfYWNjZXB0LmFzcFxuICAgICAqXG4gICAgICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYWNjZXB0KGFjY2VwdDogc3RyaW5nW10pOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl9hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9ruS4iuS8oOaMiemSrlxuICAgICAqIEBwYXJhbSBidXR0b24g5LiK5Lyg5oyJ6ZKuSURcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIOS4iuS8oOaMiemSrueahOebkeWQrOS6i+S7tuWQjeensO+8jOm7mOiupOS4uiBcImNsaWNrXCIg44CCXG4gICAgICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYnV0dG9uKGJ1dHRvbjogc3RyaW5nLCBldmVudE5hbWUgPSBcImNsaWNrXCIpOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl9idXR0b24gPSBidXR0b247XG4gICAgICAgIHRoaXMuX2J1dHRvbkV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zu+54mH6LSo6YeP5Y6L57ypLOWPquWcqOS4iuS8oOeahOaWh+S7tuaYr+WbvueJh+eahOaXtuWAmeacieaViFxuICAgICAqIEBwYXJhbSBjb21wcmVzcyAwLTEs6buY6K6kMSzkuI3ljovnvKlcbiAgICAgKiBAcmV0dXJucyB7VXBsb2FkZXJCdWlsZGVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBjb21wcmVzcyhjb21wcmVzczogbnVtYmVyKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5fY29tcHJlc3MgPSBNYXRoLm1heChNYXRoLm1pbihjb21wcmVzcywgMSksIDApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlm77niYfnvKnmlL5cbiAgICAgKiBAcmV0dXJucyB7VXBsb2FkZXJCdWlsZGVyfVxuICAgICAqIEBwYXJhbSBzY2FsZVxuICAgICAqL1xuICAgIHB1YmxpYyBzY2FsZShzY2FsZTogbnVtYmVyW10pOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva4gc2F2ZUtleVxuICAgICAqIEBwYXJhbSBzYXZlS2V5XG4gICAgICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc2F2ZUtleShzYXZlS2V5OiBib29sZWFuIHwgc3RyaW5nKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5fc2F2ZUtleSA9IHNhdmVLZXk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllRva2Vu55qE5Zyw5Z2AXG4gICAgICogQHBhcmFtIHRva2VuVXJsXG4gICAgICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9rZW5VcmwodG9rZW5Vcmw6IHN0cmluZyk6IFVwbG9hZGVyQnVpbGRlciB7XG4gICAgICAgIHRoaXMuX3Rva2VuRnVuYyA9ICh1cGxvYWRlcjogVXBsb2FkZXIsIHRhc2s6IEJhc2VUYXNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdXBsb2FkZXIucmVxdWVzdFRhc2tUb2tlbih0YXNrLCB0b2tlblVybCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPllRva2Vu55qE5Ye95pWwXG4gICAgICogQHBhcmFtIHRva2VuRnVuY1xuICAgICAqIEByZXR1cm5zIHtVcGxvYWRlckJ1aWxkZXJ9XG4gICAgICovXG4gICAgcHVibGljIHRva2VuRnVuYyh0b2tlbkZ1bmM6IEZ1bmN0aW9uKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5fdG9rZW5GdW5jID0gKHVwbG9hZGVyOiBVcGxvYWRlciwgdGFzazogQmFzZVRhc2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRva2VuRnVuYyhyZXNvbHZlLCB0YXNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIrkvKDnlJ/lkb3lkajmnJ/pkqnlrZBcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcmV0dXJucyB7VXBsb2FkZXJCdWlsZGVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBsaXN0ZW5lcihsaXN0ZW5lcjogVXBsb2FkTGlzdGVuZXIpOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbliIbkuqt0b2tlbizlpoLmnpzkuLpmYWxzZeavj+S4iuS8oOS4gOS4quaWh+S7tumDvemcgOimgeivt+axguS4gOasoVRva2Vu44CCXG4gICAgICogQHBhcmFtIHRva2VuU2hhcmVcbiAgICAgKiBAcmV0dXJucyB7VXBsb2FkZXJCdWlsZGVyfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b2tlblNoYXJlKHRva2VuU2hhcmU6IGJvb2xlYW4pOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl90b2tlblNoYXJlID0gdG9rZW5TaGFyZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5YiG5Z2X5LiK5LygXG4gICAgICogQHBhcmFtIGNodW5rIOm7mOiupGZhbHNlXG4gICAgICogQHJldHVybnMge1VwbG9hZGVyQnVpbGRlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgY2h1bmsoY2h1bms6IGJvb2xlYW4pOiBVcGxvYWRlckJ1aWxkZXIge1xuICAgICAgICB0aGlzLl9jaHVuayA9IGNodW5rO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKblvIDlkK9kZWJ1Z+aooeW8j1xuICAgICAqIEBwYXJhbSBkZWJ1ZyDpu5jorqRmYWxzZVxuICAgICAqIEByZXR1cm5zIHtVcGxvYWRlckJ1aWxkZXJ9XG4gICAgICovXG4gICAgcHVibGljIGRlYnVnKGRlYnVnOiBib29sZWFuKTogVXBsb2FkZXJCdWlsZGVyIHtcbiAgICAgICAgdGhpcy5faXNEZWJ1ZyA9IGRlYnVnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgZ2V0UmV0cnkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JldHJ5O1xuICAgIH1cblxuICAgIGdldCBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIGdldCBnZXRBdXRvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0bztcbiAgICB9XG5cbiAgICBnZXQgZ2V0TXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBnZXQgZ2V0QWNjZXB0KCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjY2VwdDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0QnV0dG9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b247XG4gICAgfVxuXG4gICAgZ2V0IGdldEJ1dHRvbkV2ZW50TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uRXZlbnROYW1lO1xuICAgIH1cblxuICAgIGdldCBnZXRDb21wcmVzcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcHJlc3M7XG4gICAgfVxuXG4gICAgZ2V0IGdldFNjYWxlKCk6IG51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICAgIH1cblxuICAgIGdldCBnZXRMaXN0ZW5lcigpOiBVcGxvYWRMaXN0ZW5lciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcjtcbiAgICB9XG5cbiAgICBnZXQgZ2V0U2F2ZUtleSgpOiBib29sZWFuIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhdmVLZXk7XG4gICAgfVxuXG4gICAgZ2V0IGdldFRva2VuRnVuYygpOiBUb2tlbkZ1bmMge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5GdW5jO1xuICAgIH1cblxuICAgIGdldCBnZXRUb2tlblNoYXJlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5TaGFyZTtcbiAgICB9XG5cbiAgICBnZXQgZ2V0Q2h1bmsoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaHVuaztcbiAgICB9XG5cbiAgICBnZXQgZ2V0SXNEZWJ1ZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGVidWc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEludGVyY2VwdG9ycygpOiBJbnRlcmNlcHRvcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcbiAgICB9XG5cbiAgICBnZXQgZ2V0RG9tYWluKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBkb21haW46IGFueSA9IHRoaXMuX2RvbWFpbjtcbiAgICAgICAgaWYgKGRvbWFpbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBkb21haW4gPSBVcGxvYWRlckJ1aWxkZXIuVVBMT0FEX0RPTUFJTjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvbWFpbiAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgc2NoZW1lID0gdGhpcy5fc2NoZW1lO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWUgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGxldCBwcm90b2NvbCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBwcm90b2NvbC5zdWJzdHJpbmcoMCwgcHJvdG9jb2wubGVuZ3RoIC0gMSkgYXMgU2NoZW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb21haW4gPSBkb21haW5bc2NoZW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9tYWluLmVuZHNXaXRoKCcvJykgPyBkb21haW4uc3Vic3RyaW5nKDAsIGRvbWFpbi5sZW5ndGggLSAxKSA6IGRvbWFpbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGQoKTogVXBsb2FkZXIge1xuICAgICAgICByZXR1cm4gbmV3IFVwbG9hZGVyKHRoaXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXBsb2FkZXJCdWlsZGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cGxvYWQvVXBsb2FkZXJCdWlsZGVyLnRzIiwiLyoqXG4gKiDkuIrkvKDku7vliqFcbiAqL1xuYWJzdHJhY3QgY2xhc3MgQmFzZVRhc2sge1xuICAgIHByb3RlY3RlZCBfZmlsZTogRmlsZTtcbiAgICBwcm90ZWN0ZWQgX3JldHJ5OiBudW1iZXIgPSAwOy8v5bey6YeN6K+V5qyh5pWwXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVEYXRlOiBEYXRlOy8v5Yib5bu65pe26Ze0XG4gICAgcHJvdGVjdGVkIF9zdGFydERhdGU6IERhdGU7Ly/lvIDlp4vml7bpl7RcbiAgICBwcm90ZWN0ZWQgX2VuZERhdGU6IERhdGU7Ly/nu5PmnZ/ml7bpl7RcbiAgICBwcm90ZWN0ZWQgX2tleTogc3RyaW5nOy8va2V55paH5Lu25ZCNXG4gICAgcHJvdGVjdGVkIF9wcm9ncmVzczogbnVtYmVyID0gMDsvL+S7u+WKoei/m+W6pizmnIDlpKcxMDBcbiAgICBwcm90ZWN0ZWQgX2lzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5LiK5Lyg5oiQ5YqfXG4gICAgcHJvdGVjdGVkIF9pc0ZpbmlzaDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm57uT5p2fXG4gICAgcHJvdGVjdGVkIF9yZXN1bHQ6IE9iamVjdDtcbiAgICBwcm90ZWN0ZWQgX2Vycm9yOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihmaWxlOiBGaWxlKSB7XG4gICAgICAgIHRoaXMuX2ZpbGUgPSBmaWxlO1xuICAgICAgICB0aGlzLl9jcmVhdGVEYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZpbGUoKTogRmlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZmlsZShmaWxlOiBGaWxlKSB7XG4gICAgICAgIHRoaXMuX2ZpbGUgPSBmaWxlO1xuICAgIH1cblxuICAgIGdldCByZXRyeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmV0cnk7XG4gICAgfVxuXG4gICAgc2V0IHJldHJ5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcmV0cnkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgY3JlYXRlRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0IGNyZWF0ZURhdGUodmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlRGF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBzdGFydERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydERhdGU7XG4gICAgfVxuXG4gICAgc2V0IHN0YXJ0RGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9zdGFydERhdGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgZW5kRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZERhdGU7XG4gICAgfVxuXG4gICAgc2V0IGVuZERhdGUodmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fZW5kRGF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBpc1N1Y2Nlc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1N1Y2Nlc3M7XG4gICAgfVxuXG4gICAgc2V0IGlzU3VjY2Vzcyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc1N1Y2Nlc3MgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcHJvZ3Jlc3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzO1xuICAgIH1cblxuICAgIHNldCBwcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Byb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgdmFsdWUpLCAxMDApO1xuICAgIH1cblxuXG4gICAgZ2V0IHJlc3VsdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdDtcbiAgICB9XG5cbiAgICBzZXQgcmVzdWx0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBlcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yO1xuICAgIH1cblxuICAgIHNldCBlcnJvcih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9lcnJvciA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGtleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgIH1cblxuICAgIHNldCBrZXkodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9rZXkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgaXNGaW5pc2goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0ZpbmlzaDtcbiAgICB9XG5cbiAgICBzZXQgaXNGaW5pc2godmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNGaW5pc2ggPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VUYXNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cGxvYWQvdGFzay9CYXNlVGFzay50cyIsImltcG9ydCBVcGxvYWRlciBmcm9tIFwiLi91cGxvYWQvVXBsb2FkZXJcIjtcbmltcG9ydCBVcGxvYWRlckJ1aWxkZXIgZnJvbSBcIi4vdXBsb2FkL1VwbG9hZGVyQnVpbGRlclwiO1xuZXhwb3J0ICB7VXBsb2FkZXIsIFVwbG9hZGVyQnVpbGRlcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL01haW4udHMiLCJpbXBvcnQgVGFzayBmcm9tIFwiLi4vdGFzay9EaXJlY3RUYXNrXCI7XG5pbXBvcnQgVXBsb2FkTGlzdGVuZXIgZnJvbSBcIi4vVXBsb2FkTGlzdGVuZXJcIjtcbmNsYXNzIFNpbXBsZVVwbG9hZExpc3RlbmVyIGltcGxlbWVudHMgVXBsb2FkTGlzdGVuZXIge1xuXG4gICAgb25SZWFkeSh0YXNrUXVldWU6IFRhc2tbXSk6IHZvaWQge1xuICAgIH1cblxuICAgIG9uU3RhcnQodGFza1F1ZXVlOiBUYXNrW10pOiB2b2lkIHtcbiAgICB9XG5cbiAgICBvblRhc2tQcm9ncmVzcyh0YXNrOiBUYXNrKTogdm9pZCB7XG4gICAgfVxuXG4gICAgb25UYXNrR2V0S2V5KHRhc2s6IFRhc2spOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBvblRhc2tGYWlsKHRhc2s6IFRhc2spOiB2b2lkIHtcbiAgICB9XG5cbiAgICBvblRhc2tTdWNjZXNzKHRhc2s6IFRhc2spOiB2b2lkIHtcbiAgICB9XG5cbiAgICBvblRhc2tSZXRyeSh0YXNrOiBUYXNrKTogdm9pZCB7XG4gICAgfVxuXG4gICAgb25GaW5pc2godGFza1F1ZXVlOiBUYXNrW10pOiB2b2lkIHtcbiAgICB9XG59XG5cbmV4cG9ydCAgZGVmYXVsdCBTaW1wbGVVcGxvYWRMaXN0ZW5lcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXBsb2FkL2hvb2svU2ltcGxlVXBsb2FkTGlzdGVuZXIudHMiLCJpbXBvcnQgQmFzZVRhc2sgZnJvbSBcIi4uL3Rhc2svQmFzZVRhc2tcIjtcbmltcG9ydCBVcGxvYWRJbnRlcmNlcHRvciBmcm9tIFwiLi9VcGxvYWRJbnRlcmNlcHRvclwiO1xuXG5jbGFzcyBTaW1wbGVVcGxvYWRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIFVwbG9hZEludGVyY2VwdG9yIHtcblxuICAgIG9uSW50ZXJjZXB0KHRhc2s6IEJhc2VUYXNrKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkludGVycnVwdCh0YXNrOiBCYXNlVGFzayk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZVVwbG9hZEludGVyY2VwdG9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VwbG9hZC9pbnRlcmNlcHRvci9TaW1wbGVVcGxvYWRJbnRlcmNlcHRvci50cyIsImltcG9ydCBJVXBsb2FkUGF0dGVybiBmcm9tIFwiLi9JVXBsb2FkUGF0dGVyblwiO1xuaW1wb3J0IFVwbG9hZGVyIGZyb20gXCIuLi9VcGxvYWRlclwiO1xuaW1wb3J0IHtDaHVua1Rhc2ssIENodW5rfSBmcm9tIFwiLi4vdGFzay9DaHVua1Rhc2tcIjtcbmltcG9ydCBsb2cgZnJvbSBcIi4uLy4uL3V0aWwvTG9nXCI7XG5cbi8qKlxuICog5YiG5Z2X5LiK5LygXG4gKi9cbmNsYXNzIENodW5rVXBsb2FkUGF0dGVybiBpbXBsZW1lbnRzIElVcGxvYWRQYXR0ZXJuIHtcbiAgICBwcml2YXRlIHVwbG9hZGVyOiBVcGxvYWRlcjtcbiAgICBwcml2YXRlIHRhc2s6IENodW5rVGFzaztcblxuICAgIGNvbnN0cnVjdG9yKHVwbG9hZGVyOiBVcGxvYWRlcikge1xuICAgICAgICB0aGlzLnVwbG9hZGVyID0gdXBsb2FkZXI7XG4gICAgfVxuXG4gICAgaW5pdCh1cGxvYWRlcjogVXBsb2FkZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGxvYWRlciA9IHVwbG9hZGVyO1xuICAgIH1cblxuICAgIHVwbG9hZCh0YXNrOiBDaHVua1Rhc2spOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXNrID0gdGFzaztcblxuICAgICAgICB0aGlzLnVwbG9hZGVyLmdldFRva2VuKHRhc2spLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRhc2suc3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkQmxvY2sodG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwbG9hZEJsb2NrKHRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgbG9nLmQoYOWHhuWkh+W8gOWni+S4iuS8oOWdl2ApO1xuICAgICAgICBsZXQgY2hhaW46IFByb21pc2U8YW55PiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBsb2cuZChg5YWxJHt0aGlzLnRhc2suYmxvY2tzLmxlbmd0aH3lnZfnrYnlvoXkuIrkvKBgKTtcbiAgICAgICAgbG9nLmQoYOWFsSR7dGhpcy50YXNrLnRvdGFsQ2h1bmtDb3VudH3liIbniYfnrYnlvoXkuIrkvKBgKTtcblxuICAgICAgICB0aGlzLnRhc2suYmxvY2tzLmZvckVhY2goKGJsb2NrLCBibG9ja0luZGV4KSA9PiB7XG4gICAgICAgICAgICBibG9jay5jaHVua3MuZm9yRWFjaCgoY2h1bmssIGNodW5rSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjaGFpbiA9IGNoYWluLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2cuZChg5byA5aeL5LiK5Lyg56ysJHsoYmxvY2tJbmRleCArIDEpfeWdlyznrKwkeyhjaHVua0luZGV4ICsgMSl954mHYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwbG9hZENodW5rKGNodW5rLCB0b2tlbilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNoYWluLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uY2F0Q2h1bmtzKHRva2VuKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvL+aJgOacieS7u+WKoemDvee7k+adn+S6hlxuICAgICAgICAgICAgaWYgKHRoaXMudXBsb2FkZXIuaXNUYXNrUXVldWVGaW5pc2goKSkge1xuICAgICAgICAgICAgICAgIGxvZy5kKGDkuIrkvKDku7vliqHpmJ/liJflt7Lnu5PmnZ9gKTtcblxuICAgICAgICAgICAgICAgIC8v5pu05pS55Lu75Yqh5omn6KGM5Lit5qCH5b+XXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlci50YXNraW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL+ebkeWQrOWZqOiwg+eUqFxuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZXIubGlzdGVuZXIub25GaW5pc2godGhpcy51cGxvYWRlci50YXNrUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxvZy53KGAke3RoaXMudGFzay5maWxlLm5hbWV95YiG5Z2X5LiK5Lyg5aSx6LSlYCk7XG4gICAgICAgICAgICB0aGlzLnRhc2suZXJyb3IgPSByZXNwb25zZTtcbiAgICAgICAgICAgIHRoaXMudGFzay5pc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFzay5pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRhc2suZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGVyLmxpc3RlbmVyLm9uVGFza0ZhaWwodGhpcy50YXNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGxvYWRDaHVuayhjaHVuazogQ2h1bmssIHRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0Q2h1bmtJbkJsb2NrID0gY2h1bmsuYmxvY2suY2h1bmtzLmluZGV4T2YoY2h1bmspID09IDA7XG4gICAgICAgICAgICBsZXQgY2h1bmtJbmRleCA9IGNodW5rLmJsb2NrLmNodW5rcy5pbmRleE9mKGNodW5rKTtcbiAgICAgICAgICAgIC8v5YmN5LiA5LiqY2h1bmss5aaC5p6c5a2Y5Zyo55qE6K+dXG4gICAgICAgICAgICBsZXQgcHJldkNodW5rOiBhbnkgPSBpc0ZpcnN0Q2h1bmtJbkJsb2NrID8gbnVsbCA6IGNodW5rLmJsb2NrLmNodW5rc1tjaHVua0luZGV4IC0gMV07XG5cbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IGlzRmlyc3RDaHVua0luQmxvY2sgPyB0aGlzLmdldFVwbG9hZEJsb2NrVXJsKGNodW5rLmJsb2NrLmRhdGEuc2l6ZSkgOiB0aGlzLmdldFVwbG9hZENodW5rVXJsKGNodW5rLnN0YXJ0LCBwcmV2Q2h1bmsgPyBwcmV2Q2h1bmsuY3R4IDogbnVsbCwgcHJldkNodW5rID8gcHJldkNodW5rLmhvc3QgOiBudWxsKTtcblxuICAgICAgICAgICAgbGV0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsICs9ICgoL1xcPy8pLnRlc3QodXJsKSA/IFwiJlwiIDogXCI/XCIpICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpOy8v6K6+572uY29udGVudFR5cGVcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYFVwVG9rZW4gJHt0b2tlbn1gKTsvL+a3u+WKoHRva2Vu6aqM6K+B5aS0XG5cbiAgICAgICAgICAgIC8v5YiG54mH5LiK5Lyg5LitXG4gICAgICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSAoZTogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gTWF0aC5yb3VuZCgoKHRoaXMudGFzay5maW5pc2hlZEJsb2Nrc1NpemUgKyBjaHVuay5zdGFydCArIGUubG9hZGVkKSAvIHRoaXMudGFzay5maWxlLnNpemUpICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGFzay5wcm9ncmVzcyA8IHByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2sucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZXIubGlzdGVuZXIub25UYXNrUHJvZ3Jlc3ModGhpcy50YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8v5YiG54mH5LiK5Lyg5a6M5oiQXG4gICAgICAgICAgICB4aHIudXBsb2FkLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKCgodGhpcy50YXNrLmZpbmlzaGVkQmxvY2tzU2l6ZSArIGNodW5rLnN0YXJ0ICsgY2h1bmsuZGF0YS5zaXplKSAvIHRoaXMudGFzay5maWxlLnNpemUpICogMTAwKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXNrLnByb2dyZXNzIDwgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZXIubGlzdGVuZXIub25UYXNrUHJvZ3Jlc3ModGhpcy50YXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL+WTjeW6lOi/lOWbnlxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDAgJiYgeGhyLnJlc3BvbnNlVGV4dCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rLmlzRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rLmN0eCA9IHJlc3VsdC5jdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHVuay5ob3N0ID0gcmVzdWx0Lmhvc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2h1bmtJbmRleDogbnVtYmVyID0gY2h1bmsuYmxvY2suY2h1bmtzLmluZGV4T2YoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc05leHRDaHVua0luVGhpc0Jsb2NrOiBib29sZWFuID0gY2h1bmtJbmRleCAhPSBjaHVuay5ibG9jay5jaHVua3MubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzTmV4dENodW5rSW5UaGlzQmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVuay5ibG9jay5pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmsuYmxvY2sucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIuc2VuZChjaHVuay5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGNvbmNhdENodW5rcyh0b2tlbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgZW5jb2RlZEtleTogYW55ID0gdGhpcy50YXNrLmtleSA/IGJ0b2EodGhpcy50YXNrLmtleSkgOiBudWxsO1xuICAgICAgICAgICAgLy8g5a6J5YWo5a2X56ym5LiyIOWPguiAg++8mmh0dHBzOi8vZGV2ZWxvcGVyLnFpbml1LmNvbS9rb2RvL2FwaS9ta2ZpbGVcbiAgICAgICAgICAgIGlmIChlbmNvZGVkS2V5KSB7XG4gICAgICAgICAgICAgICAgZW5jb2RlZEtleSA9IGVuY29kZWRLZXkucmVwbGFjZSgvXFwrL2csICctJyk7XG4gICAgICAgICAgICAgICAgZW5jb2RlZEtleSA9IGVuY29kZWRLZXkucmVwbGFjZSgvXFwvL2csICdfJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRNYWtlRmlsZVVybCh0aGlzLnRhc2suZmlsZS5zaXplLCBlbmNvZGVkS2V5KTtcbiAgICAgICAgICAgIC8v5p6E5bu65omA5pyJ5pWw5o2u5Z2X5pyA5ZCO5LiA5Liq5pWw5o2u54mH5LiK5Lyg5ZCO5b6X5Yiw55qEPGN0eD7nmoTnu4TlkIjmiJDnmoTliJfooajlrZfnrKbkuLJcbiAgICAgICAgICAgIGxldCBjdHhMaXN0U3RyaW5nID0gJyc7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGJsb2NrIG9mIHRoaXMudGFzay5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdENodW5rID0gYmxvY2suY2h1bmtzW2Jsb2NrLmNodW5rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBjdHhMaXN0U3RyaW5nICs9IGxhc3RDaHVuay5jdHggKyAnLCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHhMaXN0U3RyaW5nLmVuZHNXaXRoKCcsJykpIHtcbiAgICAgICAgICAgICAgICBjdHhMaXN0U3RyaW5nID0gY3R4TGlzdFN0cmluZy5zdWJzdHJpbmcoMCwgY3R4TGlzdFN0cmluZy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsICs9ICgoL1xcPy8pLnRlc3QodXJsKSA/IFwiJlwiIDogXCI/XCIpICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvcGxhaW4nKTsvL+iuvue9rmNvbnRlbnRUeXBlXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBVcFRva2VuICR7dG9rZW59YCk7Ly/mt7vliqB0b2tlbumqjOivgeWktFxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2suaXNGaW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDAgJiYgeGhyLnJlc3BvbnNlVGV4dCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFzay5pc1N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFzay5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZXIubGlzdGVuZXIub25UYXNrU3VjY2Vzcyh0aGlzLnRhc2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmV0cnlUYXNrKHRoaXMudGFzaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy53KGAke3RoaXMudGFzay5maWxlLm5hbWV95YiG5Z2X5LiK5Lyg5aSx6LSlLOWHhuWkh+W8gOWni+mHjeS8oGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlci5saXN0ZW5lci5vblRhc2tSZXRyeSh0aGlzLnRhc2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoY3R4TGlzdFN0cmluZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWdl+S4iuS8oOeahHVybFxuICAgICAqIEBwYXJhbSBibG9ja1NpemVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHByaXZhdGUgIGdldFVwbG9hZEJsb2NrVXJsKGJsb2NrU2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudXBsb2FkZXIuZG9tYWlufS9ta2Jsay8ke2Jsb2NrU2l6ZX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueJh+S4iuS8oOeahHVybFxuICAgICAqIEBwYXJhbSBzdGFydCDniYfnmoTlnKjlnZfkuK3nmoTotbflp4vkvY3nva5cbiAgICAgKiBAcGFyYW0gY3R4IOWJjeS4gOasoeS4iuS8oOi/lOWbnueahOWdl+e6p+S4iuS8oOaOp+WItuS/oeaBr+OAglxuICAgICAqIEBwYXJhbSBob3N0IOaMh+Wummhvc3RcbiAgICAgKi9cbiAgICBwcml2YXRlICBnZXRVcGxvYWRDaHVua1VybChzdGFydDogbnVtYmVyLCBjdHg6IHN0cmluZywgaG9zdD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtob3N0ID8gaG9zdCA6IHRoaXMudXBsb2FkZXIuZG9tYWlufS9icHV0LyR7Y3R4fS8ke3N0YXJ0fS9gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWQiOW5tuWdl+S4uuaWh+S7tueahHVybFxuICAgICAqIEBwYXJhbSBmaWxlU2l6ZSDmlofku7blpKflsI9cbiAgICAgKiBAcGFyYW0gZW5jb2RlZEtleSBiYXNlNjRVcmxFbmNvZGXlkI7nmoTotYTmupDlkI3np7As6Iul5pyq5oyH5a6a77yM5YiZ5L2/55Soc2F2ZUtlee+8m+iLpeacquaMh+WumnNhdmVLZXnvvIzliJnkvb/nlKjotYTmupDlhoXlrrnnmoRTSEEx5YC85L2c5Li66LWE5rqQ5ZCN44CCXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwcml2YXRlICBnZXRNYWtlRmlsZVVybChmaWxlU2l6ZTogbnVtYmVyLCBlbmNvZGVkS2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoZW5jb2RlZEtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudXBsb2FkZXIuZG9tYWlufS9ta2ZpbGUvJHtmaWxlU2l6ZX0va2V5LyR7ZW5jb2RlZEtleX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudXBsb2FkZXIuZG9tYWlufS9ta2ZpbGUvJHtmaWxlU2l6ZX1gO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHJldHJ5VGFzayh0YXNrOiBDaHVua1Rhc2spOiBib29sZWFuIHtcbiAgICAgICAgLy/ovr7liLDph43or5XmrKHmlbBcbiAgICAgICAgaWYgKHRhc2sucmV0cnkgPj0gdGhpcy51cGxvYWRlci5yZXRyeSkge1xuICAgICAgICAgICAgbG9nLncoYCR7dGFzay5maWxlLm5hbWV96L6+5Yiw6YeN5Lyg5qyh5pWw5LiK6ZmQJHt0aGlzLnVwbG9hZGVyLnJldHJ5fSzlgZzmraLph43kvKBgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0YXNrLnJldHJ5Kys7XG4gICAgICAgIGxvZy53KGAke3Rhc2suZmlsZS5uYW1lfeW8gOWni+mHjeS8oCzlvZPliY3ph43kvKDmrKHmlbAke3Rhc2sucmV0cnl9YCk7XG4gICAgICAgIC8vIHRoaXMudXBsb2FkKHRhc2spO1xuXG4gICAgICAgIC8vdG9kb1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgIGRlZmF1bHQgQ2h1bmtVcGxvYWRQYXR0ZXJuO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cGxvYWQvcGF0dHJlbi9DaHVua1VwbG9hZFBhdHRlcm4udHMiLCJpbXBvcnQgSVVwbG9hZFBhdHRlcm4gZnJvbSBcIi4vSVVwbG9hZFBhdHRlcm5cIjtcbmltcG9ydCBVcGxvYWRlciBmcm9tIFwiLi4vVXBsb2FkZXJcIjtcbmltcG9ydCBEaXJlY3RUYXNrIGZyb20gXCIuLi90YXNrL0RpcmVjdFRhc2tcIjtcbmltcG9ydCBsb2cgZnJvbSBcIi4uLy4uL3V0aWwvTG9nXCI7XG4vKipcbiAqIOebtOaOpeS4iuS8oFxuICovXG5jbGFzcyBEaXJlY3RVcGxvYWRQYXR0ZXJuIGltcGxlbWVudHMgSVVwbG9hZFBhdHRlcm4ge1xuICAgIHByaXZhdGUgdXBsb2FkZXI6IFVwbG9hZGVyO1xuICAgIHByaXZhdGUgdGFzazogRGlyZWN0VGFzaztcblxuICAgIGNvbnN0cnVjdG9yKHVwbG9hZGVyOiBVcGxvYWRlcikge1xuICAgICAgICB0aGlzLnVwbG9hZGVyID0gdXBsb2FkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5a6e546w5o6l5Y+j55qE5LiK5Lyg5pa55rOVXG4gICAgICogQHBhcmFtIHRhc2tcbiAgICAgKi9cbiAgICB1cGxvYWQodGFzazogRGlyZWN0VGFzayk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhc2sgPSB0YXNrO1xuXG4gICAgICAgIHRoaXMudXBsb2FkZXIuZ2V0VG9rZW4odGFzaykudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGFzay5zdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlKHRva2VuKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuihqOWNlVxuICAgICAqIEBwYXJhbSB0b2tlblxuICAgICAqIEByZXR1cm5zIHtGb3JtRGF0YX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUZvcm1EYXRhKHRva2VuOiBzdHJpbmcpOiBGb3JtRGF0YSB7XG4gICAgICAgIGxldCB0YXNrOiBEaXJlY3RUYXNrID0gdGhpcy50YXNrO1xuICAgICAgICBsZXQgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgLy9rZXnlrZjlnKjvvIzmt7vliqDliLBmb3JtRGF0YeS4re+8jOiLpeS4jeiuvue9ru+8jOS4g+eJm+acjeWKoeWZqOS8muiHquWKqOeUn+aIkGhhc2gga2V5XG4gICAgICAgIGlmICh0YXNrLmtleSAhPT0gbnVsbCAmJiB0YXNrLmtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2tleScsIHRhc2sua2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndG9rZW4nLCB0b2tlbik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIHRhc2suZmlsZSk7XG5cbiAgICAgICAgbG9nLmQoYOWIm+W7umZvcm1EYXRh5a+56LGhYCk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5LiK5Lyg5paH5Lu2XG4gICAgICogQHBhcmFtIHRva2VuXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGxvYWRGaWxlKHRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRhc2s6IERpcmVjdFRhc2sgPSB0aGlzLnRhc2s7XG5cbiAgICAgICAgbGV0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAvL+S4iuS8oOS4rVxuICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSAoZTogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IE1hdGgucm91bmQoKGUubG9hZGVkICogMTAwKSAvIGUudG90YWwpO1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLnByb2dyZXNzIDwgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFzay5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGVyLmxpc3RlbmVyLm9uVGFza1Byb2dyZXNzKHRhc2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvL+S4iuS8oOWujOaIkFxuICAgICAgICB4aHIudXBsb2FkLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXNrLnByb2dyZXNzIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgdGFzay5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGVyLmxpc3RlbmVyLm9uVGFza1Byb2dyZXNzKHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXBsb2FkZXIuZG9tYWluO1xuICAgICAgICAvL+mBv+WFjea1j+iniOWZqOe8k+WtmGh0dHDor7fmsYJcbiAgICAgICAgdXJsICs9ICgoL1xcPy8pLnRlc3QodGhpcy51cGxvYWRlci5kb21haW4pID8gXCImXCIgOiBcIj9cIikgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwICYmIHhoci5yZXNwb25zZVRleHQgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFzay5yZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmlzU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRhc2suaXNGaW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGVyLmxpc3RlbmVyLm9uVGFza1N1Y2Nlc3ModGFzayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmV0cnlUYXNrKHRhc2spKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy53KGAke3Rhc2suZmlsZS5uYW1lfeS4iuS8oOWksei0pSzlh4blpIflvIDlp4vph43kvKBgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlci5saXN0ZW5lci5vblRhc2tSZXRyeSh0YXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy53KGAke3Rhc2suZmlsZS5uYW1lfeS4iuS8oOWksei0pWApO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmVycm9yID0geGhyLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmlzU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmlzRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGFzay5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlci5saXN0ZW5lci5vblRhc2tGYWlsKHRhc2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8v5omA5pyJ5Lu75Yqh6YO957uT5p2f5LqGXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBsb2FkZXIuaXNUYXNrUXVldWVGaW5pc2goKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+abtOaUueS7u+WKoeaJp+ihjOS4reagh+W/l1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGVyLnRhc2tpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvL29uRmluaXNoIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZXIubGlzdGVuZXIub25GaW5pc2godGhpcy51cGxvYWRlci50YXNrUXVldWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgZm9ybURhdGE6IEZvcm1EYXRhID0gdGhpcy5jcmVhdGVGb3JtRGF0YSh0b2tlbik7XG4gICAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgICAgICAgbG9nLmQoXCLlj5HpgIFhamF4IHBvc3Qg6K+35rGCXCIpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6YeN5LygXG4gICAgICogQHBhcmFtIHRhc2tcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwcml2YXRlIHJldHJ5VGFzayh0YXNrOiBEaXJlY3RUYXNrKTogYm9vbGVhbiB7XG4gICAgICAgIGxvZy5kKFwi5byA5aeL5bCd6K+V6YeN5LygXCIpO1xuICAgICAgICAvL+i+vuWIsOmHjeivleasoeaVsFxuICAgICAgICBpZiAodGFzay5yZXRyeSA+PSB0aGlzLnVwbG9hZGVyLnJldHJ5KSB7XG4gICAgICAgICAgICBsb2cudyhgJHt0YXNrLmZpbGUubmFtZX3ovr7liLDph43kvKDmrKHmlbDkuIrpmZAke3RoaXMudXBsb2FkZXIucmV0cnl9LOWBnOatoumHjeS8oGApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRhc2sucmV0cnkrKztcbiAgICAgICAgbG9nLncoYCR7dGFzay5maWxlLm5hbWV95byA5aeL6YeN5LygLOW9k+WJjemHjeS8oOasoeaVsCR7dGFzay5yZXRyeX1gKTtcbiAgICAgICAgdGhpcy51cGxvYWQodGFzayk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuXG5leHBvcnQgIGRlZmF1bHQgRGlyZWN0VXBsb2FkUGF0dGVybjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXBsb2FkL3BhdHRyZW4vRGlyZWN0VXBsb2FkUGF0dGVybi50cyIsImltcG9ydCBCYXNlVGFzayBmcm9tIFwiLi9CYXNlVGFza1wiO1xuLyoqXG4gKiDliIblnZfku7vliqFcbiAqL1xuY2xhc3MgQ2h1bmtUYXNrIGV4dGVuZHMgQmFzZVRhc2sge1xuICAgIC8v5YiG5Z2XXG4gICAgcHJpdmF0ZSBfYmxvY2tzOiBCbG9ja1tdID0gW107XG4gICAgcHJpdmF0ZSBfYmxvY2tTaXplOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2NodW5rU2l6ZTogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIOaehOmAoOWHveaVsFxuICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICogQHBhcmFtIGJsb2NrU2l6ZSDlnZflpKflsI9cbiAgICAgKiBAcGFyYW0gY2h1bmtTaXplIOeJh+Wkp+Wwj1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGU6IEZpbGUsIGJsb2NrU2l6ZTogbnVtYmVyLCBjaHVua1NpemU6IG51bWJlcikge1xuICAgICAgICBzdXBlcihmaWxlKTtcbiAgICAgICAgdGhpcy5fYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICB0aGlzLl9jaHVua1NpemUgPSBjaHVua1NpemU7XG4gICAgICAgIHRoaXMuc3BsaWNlRmlsZTJCbG9jaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhuaWh+S7tuWIhuWdl1xuICAgICAqL1xuICAgIHB1YmxpYyBzcGxpY2VGaWxlMkJsb2NrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ibG9ja3MgPSBbXTtcbiAgICAgICAgbGV0IGZpbGVTaXplOiBudW1iZXIgPSB0aGlzLl9maWxlLnNpemU7XG4gICAgICAgIGxldCBmaWxlOiBGaWxlID0gdGhpcy5fZmlsZTtcbiAgICAgICAgLy/mgLvlnZfmlbBcbiAgICAgICAgbGV0IGJsb2NrQ291bnQgPSBNYXRoLmNlaWwoZmlsZVNpemUgLyB0aGlzLl9ibG9ja1NpemUpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQ6IG51bWJlciA9IGkgKiB0aGlzLl9ibG9ja1NpemU7Ly/otbflp4vkvY3nva5cbiAgICAgICAgICAgIGxldCBlbmQ6IG51bWJlciA9IHN0YXJ0ICsgdGhpcy5fYmxvY2tTaXplOy8v57uT5p2f5L2N572uXG4gICAgICAgICAgICAvL+aehOmAoOS4gOS4quWdl+WunuS+i1xuICAgICAgICAgICAgbGV0IGJsb2NrOiBCbG9jayA9IG5ldyBCbG9jayhzdGFydCwgZW5kLCBmaWxlLnNsaWNlKHN0YXJ0LCBlbmQpLCB0aGlzLl9jaHVua1NpemUsIGZpbGUpO1xuICAgICAgICAgICAgLy/mt7vliqDliLDmlbDnu4TkuK1cbiAgICAgICAgICAgIHRoaXMuX2Jsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaJgOacieeahGJsb2NrXG4gICAgICogQHJldHVybnMge0Jsb2NrW119XG4gICAgICovXG4gICAgZ2V0IGJsb2NrcygpOiBCbG9ja1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2NrcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmraPlnKjlpITnkIbnmoRibG9ja1xuICAgICAqIEByZXR1cm5zIHtCbG9ja31cbiAgICAgKi9cbiAgICBnZXQgcHJvY2Vzc2luZ0Jsb2NrKCk6IEJsb2NrIHtcbiAgICAgICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICBpZiAoIWJsb2NrLnByb2Nlc3NpbmcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBibG9jaztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBFcnJvcihcIuaJvuS4jeWIsOato+WcqOWkhOeQhueahEJsb2NrXCIpXG4gICAgfVxuXG4gICAgZ2V0IGZpbmlzaGVkQmxvY2tzU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMDtcbiAgICAgICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICBzaXplICs9IChibG9jay5pc0ZpbmlzaCA/IGJsb2NrLmRhdGEuc2l6ZSA6IDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cblxuICAgIGdldCBjaHVua3MoKTogQ2h1bmtbXSB7XG4gICAgICAgIGxldCBhcnJheTogQ2h1bmtbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBibG9jayBvZiB0aGlzLl9ibG9ja3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNodW5rIG9mIGJsb2NrLmNodW5rcykge1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmraPlnKjlpITnkIbnmoRjaHVua1xuICAgICAqIEByZXR1cm5zIHtCbG9ja31cbiAgICAgKi9cbiAgICBnZXQgcHJvY2Vzc2luZ0NodW5rKCk6IENodW5rIHtcbiAgICAgICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5fYmxvY2tzKSB7XG4gICAgICAgICAgICBpZiAoIWJsb2NrLnByb2Nlc3NpbmcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGNodW5rIG9mIGJsb2NrLmNodW5rcykge1xuICAgICAgICAgICAgICAgIGlmICghY2h1bmsucHJvY2Vzc2luZykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNodW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IEVycm9yKFwi5om+5LiN5Yiw5q2j5Zyo5aSE55CG55qEQ2h1bmtcIilcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmgLvlhbHliIbniYfmlbDph48o5omA5pyJ5YiG5Z2X55qE5YiG54mH5pWw6YeP5oC75ZKMKVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IHRvdGFsQ2h1bmtDb3VudCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBibG9jayBvZiB0aGlzLl9ibG9ja3MpIHtcbiAgICAgICAgICAgIGNvdW50ICs9IGJsb2NrLmNodW5rcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbn1cblxuLyoqXG4gKiDliIblnZfvvIzliIblnZflpKflsI/kuIPniZvlm7rlrprmmK80TVxuICovXG5jbGFzcyBCbG9jayB7XG4gICAgcHJpdmF0ZSBfZGF0YTogQmxvYjsvL+Wdl+aVsOaNrlxuICAgIHByaXZhdGUgX3N0YXJ0OiBudW1iZXI7Ly/otbflp4vkvY3nva5cbiAgICBwcml2YXRlIF9lbmQ6IG51bWJlcjsvL+e7k+adn+S9jee9rlxuICAgIHByaXZhdGUgX2NodW5rczogQ2h1bmtbXSA9IFtdO1xuICAgIHByaXZhdGUgX2lzRmluaXNoOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbkuIrkvKDlrozmiJBcbiAgICBwcml2YXRlIF9wcm9jZXNzaW5nOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmraPlnKjkuIrkvKBcbiAgICBwcml2YXRlIF9maWxlOiBGaWxlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnQg6LW35aeL5L2N572uXG4gICAgICogQHBhcmFtIGVuZCDnu5PmnZ/kvY3nva5cbiAgICAgKiBAcGFyYW0gZGF0YSDlnZfmlbDmja5cbiAgICAgKiBAcGFyYW0gY2h1bmtTaXplIOWIhueJh+aVsOaNrueahOacgOWkp+Wkp+Wwj1xuICAgICAqIEBwYXJhbSBmaWxlIOWIhuWdl+aJgOWxnuaWh+S7tlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBkYXRhOiBCbG9iLCBjaHVua1NpemU6IG51bWJlciwgZmlsZTogRmlsZSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcbiAgICAgICAgdGhpcy5fZW5kID0gZW5kO1xuICAgICAgICB0aGlzLl9maWxlID0gZmlsZTtcbiAgICAgICAgdGhpcy5zcGxpY2VCbG9jazJDaHVuayhjaHVua1NpemUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhuWdl+WIhueJh1xuICAgICAqL1xuICAgIHByaXZhdGUgc3BsaWNlQmxvY2syQ2h1bmsoY2h1bmtTaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJsb2NrU2l6ZTogbnVtYmVyID0gdGhpcy5fZGF0YS5zaXplO1xuICAgICAgICBsZXQgZGF0YTogQmxvYiA9IHRoaXMuX2RhdGE7XG4gICAgICAgIC8v5oC754mH5pWwXG4gICAgICAgIGxldCBjaHVua0NvdW50ID0gTWF0aC5jZWlsKGJsb2NrU2l6ZSAvIGNodW5rU2l6ZSk7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBjaHVua0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzdGFydDogbnVtYmVyID0gaSAqIGNodW5rU2l6ZTsvL+i1t+Wni+S9jee9rlxuICAgICAgICAgICAgbGV0IGVuZDogbnVtYmVyID0gc3RhcnQgKyBjaHVua1NpemU7Ly/nu5PmnZ/kvY3nva5cbiAgICAgICAgICAgIC8v5p6E6YCg5LiA5Liq54mH5a6e5L6LXG4gICAgICAgICAgICBsZXQgY2h1bms6IENodW5rID0gbmV3IENodW5rKHN0YXJ0LCBlbmQsIGRhdGEuc2xpY2Uoc3RhcnQsIGVuZCksIHRoaXMpO1xuICAgICAgICAgICAgLy/mt7vliqDliLDmlbDnu4TkuK1cbiAgICAgICAgICAgIHRoaXMuX2NodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuS4iuS8oOS4rVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBwcm9jZXNzaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc2luZztcbiAgICB9XG5cbiAgICBzZXQgcHJvY2Vzc2luZyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wcm9jZXNzaW5nID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YiG5Z2X5omA5bGe55qE5paH5Lu2XG4gICAgICogQHJldHVybnMge0ZpbGV9XG4gICAgICovXG4gICAgZ2V0IGZpbGUoKTogRmlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuW3sue7j+e7k+adn1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBpc0ZpbmlzaCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRmluaXNoO1xuICAgIH1cblxuICAgIHNldCBpc0ZpbmlzaCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc0ZpbmlzaCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnuWIhuWdl+aVsOaNrlxuICAgICAqIEByZXR1cm5zIHtCbG9ifVxuICAgICAqL1xuICAgIGdldCBkYXRhKCk6IEJsb2Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5Tlm57lrZfoioLotbflp4vkvY3nva5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBzdGFydCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L+U5Zue5a2X6IqC57uT5p2f5L2N572uXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgZW5kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XG4gICAgfVxuXG4gICAgZ2V0IGNodW5rcygpOiBDaHVua1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NodW5rcztcbiAgICB9XG59XG5cbi8qKlxuICog5YiG54mH77yM5YiG54mH5aSn5bCP5Y+v5Lul6Ieq5a6a5LmJ77yM6Iez5bCRMeWtl+iKglxuICovXG5jbGFzcyBDaHVuayB7XG4gICAgcHJpdmF0ZSBfc3RhcnQ6IG51bWJlcjsvL+i1t+Wni+S9jee9rlxuICAgIHByaXZhdGUgX2VuZDogbnVtYmVyOy8v57uT5p2f5L2N572uXG4gICAgcHJpdmF0ZSBfZGF0YTogQmxvYjsvL+eJh+aVsOaNrlxuICAgIHByaXZhdGUgX3Byb2Nlc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuato+WcqOS4iuS8oFxuICAgIHByaXZhdGUgX2lzRmluaXNoOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbkuIrkvKDlrozmiJBcbiAgICBwcml2YXRlIF9jdHg6IHN0cmluZzsvL+WJjeS4gOasoeS4iuS8oOi/lOWbnueahOWdl+e6p+S4iuS8oOaOp+WItuS/oeaBryznrKzkuIDkuKpjaHVua+atpOWAvOS4uuepulxuICAgIHByaXZhdGUgX2Jsb2NrOiBCbG9jazsvL+WIhueJh+aJgOWxnueahOWdl+WvueixoVxuICAgIHByaXZhdGUgX2hvc3Q6IHN0cmluZzsvL+WJjeS4gOasoeS4iuS8oOi/lOWbnueahOaMh+WumuS4iuS8oOWcsOWdgFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnQg5a2X6IqC6LW35aeL5L2N572uXG4gICAgICogQHBhcmFtIGVuZCDlrZfoioLnu5PmnZ/kvY3nva5cbiAgICAgKiBAcGFyYW0gZGF0YSDliIbniYfmlbDmja5cbiAgICAgKiBAcGFyYW0gYmxvY2sg5YiG5Z2X5a+56LGhXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGRhdGE6IEJsb2IsIGJsb2NrOiBCbG9jaykge1xuICAgICAgICB0aGlzLl9zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLl9lbmQgPSBlbmQ7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9ibG9jayA9IGJsb2NrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnmNodW5r5omA5bGe55qEQmxvY2vlr7nosaFcbiAgICAgKiBAcmV0dXJucyB7QmxvY2t9XG4gICAgICovXG4gICAgZ2V0IGJsb2NrKCk6IEJsb2NrIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2NrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnuWtl+iKgui1t+Wni+S9jee9rlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IHN0YXJ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5Tlm57lrZfoioLnu5PmnZ/kvY3nva5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBlbmQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5Tlm57liIbniYfmlbDmja5cbiAgICAgKiBAcmV0dXJucyB7QmxvYn1cbiAgICAgKi9cbiAgICBnZXQgZGF0YSgpOiBCbG9iIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5bey57uP57uT5p2fXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IGlzRmluaXNoKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNGaW5pc2g7XG4gICAgfVxuXG5cbiAgICBzZXQgaXNGaW5pc2godmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNGaW5pc2ggPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBob3N0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob3N0O1xuICAgIH1cblxuICAgIHNldCBob3N0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faG9zdCA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5LiK5Lyg5LitXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IHByb2Nlc3NpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzaW5nO1xuICAgIH1cblxuICAgIHNldCBwcm9jZXNzaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NpbmcgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnuS4iuS8oOaOp+WItuS/oeaBryjkuIPniZvmnI3liqHlmajov5Tlm57liY3kuIDmrKHkuIrkvKDov5Tlm57nmoTliIbniYfkuIrkvKDmjqfliLbkv6Hmga8s55So5LqO5LiL5LiA5qyh5LiK5LygLOesrOS4gOS4qmNodW5r5q2k5YC85Li656m6KVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IGN0eCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3R4O1xuICAgIH1cblxuICAgIHNldCBjdHgodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jdHggPSB2YWx1ZTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtDaHVua1Rhc2ssIEJsb2NrLCBDaHVua307XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VwbG9hZC90YXNrL0NodW5rVGFzay50cyIsImltcG9ydCBCYXNlVGFzayBmcm9tIFwiLi9CYXNlVGFza1wiO1xuLyoqXG4gKiDnm7TkvKDku7vliqFcbiAqL1xuY2xhc3MgRGlyZWN0VGFzayBleHRlbmRzIEJhc2VUYXNrIHtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXJlY3RUYXNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cGxvYWQvdGFzay9EaXJlY3RUYXNrLnRzIiwiY2xhc3MgVVVJRCB7XG4gICAgcHVibGljIHN0YXRpYyB1dWlkKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBsZXQgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgICAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVVSUQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXBsb2FkL3V1aWQvVVVJRC50cyIsIi8vIC8qKlxuLy8gICogT2JqZWN0LmFzc2lnbiBwb2x5ZmlsbFxuLy8gICovXG4vLyBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuLy8gICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4vLyAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuLy8gICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xuLy8gICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuLy8gICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4vLyAgICAgICAgICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbi8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4vLyAgICAgfTtcbi8vIH1cbi8vXG4vLyAvKipcbi8vICAqIGNhbnZhcy50b0Jsb2IgcG9seWZpbGxcbi8vICAqL1xuLy8gaWYgKCFIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUudG9CbG9iKSB7XG4vLyAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZSwgJ3RvQmxvYicsIHtcbi8vICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChjYWxsYmFjaywgdHlwZSwgcXVhbGl0eSkge1xuLy9cbi8vICAgICAgICAgICAgIGxldCBiaW5TdHIgPSBhdG9iKHRoaXMudG9EYXRhVVJMKHR5cGUsIHF1YWxpdHkpLnNwbGl0KCcsJylbMV0pLFxuLy8gICAgICAgICAgICAgICAgIGxlbiA9IGJpblN0ci5sZW5ndGgsXG4vLyAgICAgICAgICAgICAgICAgYXJyID0gbmV3IFVpbnQ4QXJyYXkobGVuKTtcbi8vXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4vLyAgICAgICAgICAgICAgICAgYXJyW2ldID0gYmluU3RyLmNoYXJDb2RlQXQoaSk7XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgY2FsbGJhY2sobmV3IEJsb2IoW2Fycl0sIHt0eXBlOiB0eXBlIHx8ICdpbWFnZS9wbmcnfSkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vLyB9XG4vL1xuLy8gLyoqXG4vLyAgKiBlbmRzV2l0aCBwb2x5ZmlsbFxuLy8gICovXG4vLyBpZiAoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpIHtcbi8vICAgICBsZXQgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcbi8vICAgICBsZXQgZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoKSB7XG4vLyAgICAgICAgIGlmICh0aGlzID09IG51bGwpIHtcbi8vICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGxldCBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4vLyAgICAgICAgIGlmIChzZWFyY2ggJiYgdG9TdHJpbmcuY2FsbChzZWFyY2gpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4vLyAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBsZXQgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbi8vICAgICAgICAgbGV0IHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuLy8gICAgICAgICBsZXQgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbi8vICAgICAgICAgbGV0IHBvcyA9IHN0cmluZ0xlbmd0aDtcbi8vICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4vLyAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBhcmd1bWVudHNbMV07XG4vLyAgICAgICAgICAgICBpZiAocG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICAgICAgICAgIC8vIGBUb0ludGVnZXJgXG4vLyAgICAgICAgICAgICAgICAgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbi8vICAgICAgICAgICAgICAgICBpZiAocG9zICE9IHBvcykgeyAvLyBiZXR0ZXIgYGlzTmFOYFxuLy8gICAgICAgICAgICAgICAgICAgICBwb3MgPSAwO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBsZXQgZW5kID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbi8vICAgICAgICAgbGV0IHN0YXJ0ID0gZW5kIC0gc2VhcmNoTGVuZ3RoO1xuLy8gICAgICAgICBpZiAoc3RhcnQgPCAwKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4vLyAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgc2VhcmNoTGVuZ3RoKSB7XG4vLyAgICAgICAgICAgICBpZiAoc3RyaW5nLmNoYXJDb2RlQXQoc3RhcnQgKyBpbmRleCkgIT0gc2VhcmNoU3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH07XG4vLyAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuLy8gICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgJ2VuZHNXaXRoJywge1xuLy8gICAgICAgICAgICAgJ3ZhbHVlJzogZW5kc1dpdGgsXG4vLyAgICAgICAgICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbi8vICAgICAgICAgICAgICd3cml0YWJsZSc6IHRydWVcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGVuZHNXaXRoO1xuLy8gICAgIH1cbi8vIH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9Qb2x5ZmlsbC50cyJdLCJzb3VyY2VSb290IjoiIn0=