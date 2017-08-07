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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Log {
    static get enable() {
        return this._enable;
    }
    static set enable(value) {
        this._enable = value;
    }
    static d(object) {
        if (!Log._enable) {
            return;
        }
        console.debug(object);
    }

    static l(object) {
        if (!Log._enable) {
            return;
        }
        console.log(object);
    }
    static e(object) {
        if (!Log._enable) {
            return;
        }
        console.error(object);
    }
    static w(object) {
        if (!Log._enable) {
            return;
        }
        console.warn(object);
    }
    static i(object) {
        if (!Log._enable) {
            return;
        }
        console.info(object);
    }
}
Log._enable = false;
/* harmony default export */ __webpack_exports__["a"] = (Log);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_DirectTask__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task_ChunkTask__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uuid_UUID__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UploaderBuilder__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_Log__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hook_SimpleUploadListener__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pattren_DirectUploadPattern__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pattren_ChunkUploadPattern__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_Polyfill__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_Polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__util_Polyfill__);









class Uploader {
    constructor(builder) {
        this.FILE_INPUT_EL_ID = 'qiniu4js-input';
        this._taskQueue = []; //任务队列
        this._tasking = false; //任务执行中
        this._scale = []; //缩放大小,限定高度等比缩放[h:200,w:0],限定宽度等比缩放[h:0,w:100],限定长宽[h:200,w:100]
        this._saveKey = false;
        this._files = []; //自定义上传文件列表
        /**
         * 处理文件
         */
        this.handleFiles = () => {
            //没有需要处理的文件
            if (this.hasFiles()) {
                return;
            }
            //生成task
            this.generateTask();
            //是否中断任务
            let isInterrupt = false;
            let interceptedTasks = [];
            //任务拦截器过滤
            for (let task of this.taskQueue) {
                for (let interceptor of this.interceptors) {
                    //拦截生效
                    if (interceptor.onIntercept(task, this.taskQueue)) {
                        interceptedTasks.push(task);
                        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("任务拦截器拦截了任务:");
                        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(task);
                    }
                    //打断生效
                    if (interceptor.onInterrupt(task, this.taskQueue)) {
                        //将打断标志位设为true
                        isInterrupt = true;
                        break;
                    }
                }
            }
            if (isInterrupt) {
                __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].w("任务拦截器中断了任务队列");
                return;
            }
            //从任务队列中去除任务
            for (let task of interceptedTasks) {
                let index = this.taskQueue.indexOf(task);
                if (index != -1) {
                    this.taskQueue.splice(index, 1);
                }
            }
            //回调函数函数
            this.listener.onReady(this.taskQueue);
            //处理图片
            this.handleImages().then(() => {
                //自动上传
                if (this.auto) {
                    __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("开始自动上传");
                    this.start();
                }
            });
        };
        this.resolveUUID = s => {
            let re = /\$\(uuid\)/;
            if (re.test(s)) {
                return s.replace(re, __WEBPACK_IMPORTED_MODULE_2__uuid_UUID__["a" /* default */].uuid());
            }
            return s;
        };
        this.resolveImageInfo = (blob, s) => {
            let widthRe = /\$\(imageInfo\.width\)/;
            let heightRe = /\$\(imageInfo\.height\)/;
            if (!widthRe.test(s) && !heightRe.test(s)) {
                return Promise.resolve(s);
            }
            return new Promise(resolve => {
                let img = new Image();
                img.src = URL.createObjectURL(blob);
                img.onload = () => {
                    s = s.replace(widthRe, img.width.toString());
                    s = s.replace(heightRe, img.height.toString());
                    resolve(s);
                };
            });
        };
        this.onSaveKeyResolved = saveKey => {
            this._tokenShare = this._tokenShare && this._saveKey == saveKey;
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
        this._listener = Object.assign(new __WEBPACK_IMPORTED_MODULE_5__hook_SimpleUploadListener__["a" /* default */](), builder.getListener);
        this._interceptors = builder.getInterceptors;
        this._domain = builder.getDomain;
        this._files = builder.getFiles;
        this._fileInputId = `${this.FILE_INPUT_EL_ID}_${new Date().getTime()}`;
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].enable = builder.getIsDebug;
        this.validateOptions();
        this.init();
    }
    /**
     * 初始化操作
     */
    init() {
        if (this.isFilesProvidedByUser()) {
            //由于直接提供了文件，跳过对input的处理
            this.handleFiles();
        } else {
            this.initFileInputEl();
        }
    }
    /**
     * 上传文件是否由用户提供，与input选取的方式区别
     * @returns {boolean}
     */
    isFilesProvidedByUser() {
        return this._files != null && this._files.length != 0;
    }
    /**
     * 初始化file input element
     */
    initFileInputEl() {
        //查询已经存在的file input
        let exist = document.getElementById(this._fileInputId);
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
            let acceptValue = '';
            for (let value of this.accept) {
                acceptValue += value;
                acceptValue += ',';
            }
            if (acceptValue.endsWith(',')) {
                acceptValue = acceptValue.substring(0, acceptValue.length - 1);
            }
            this.fileInput.accept = acceptValue;
            __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`accept类型 ${acceptValue}`);
        }
        //将input元素添加到body子节点的末尾
        document.body.appendChild(this.fileInput);
        //选择文件监听器
        this.fileInput.addEventListener('change', this.handleFiles, false);
        if (this._button != undefined) {
            let button = document.getElementById(this._button);
            button.addEventListener(this._buttonEventName, this.chooseFile.bind(this));
        }
    }
    /**
     * 上传完成或者失败后,对本次上传任务进行清扫
     */
    resetUploader() {
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("开始重置 uploader");
        this.taskQueue.length = 0;
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("任务队列已清空");
        this._token = null;
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("token已清空");
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("uploader 重置完毕");
    }
    /**
     * 获取待上传的文件
     * @returns {any}
     */
    getFiles() {
        //如果没有选中文件就返回
        if (this.fileInput && this.fileInput.files.length != 0) {
            return this.fileInput.files;
        } else {
            return this._files;
        }
    }
    /**
     * 是否存在需要上传的文件
     */
    hasFiles() {
        return this.getFiles().length != 0;
    }
    /**
     * 是否是分块任务
     * @param task
     * @returns {boolean}
     */
    static isChunkTask(task) {
        return task.constructor.name === __WEBPACK_IMPORTED_MODULE_1__task_ChunkTask__["a" /* ChunkTask */].name && task instanceof __WEBPACK_IMPORTED_MODULE_1__task_ChunkTask__["a" /* ChunkTask */];
    }
    /**
     * 是否是直传任务
     * @param task
     * @returns {boolean}
     */
    static isDirectTask(task) {
        return task.constructor.name === __WEBPACK_IMPORTED_MODULE_0__task_DirectTask__["a" /* default */].name && task instanceof __WEBPACK_IMPORTED_MODULE_0__task_DirectTask__["a" /* default */];
    }
    /**
     * 生成task
     */
    generateTask() {
        this.resetUploader();
        //遍历files 创建上传任务
        for (let i = 0; i < this.getFiles().length; i++) {
            let file = this.getFiles()[i];
            let task;
            //只有在开启分块上传，并且文件大小大于4mb的时候才进行分块上传
            if (this.chunk && file.size > __WEBPACK_IMPORTED_MODULE_3__UploaderBuilder__["a" /* default */].BLOCK_SIZE) {
                task = new __WEBPACK_IMPORTED_MODULE_1__task_ChunkTask__["a" /* ChunkTask */](file, __WEBPACK_IMPORTED_MODULE_3__UploaderBuilder__["a" /* default */].BLOCK_SIZE, this.size);
            } else {
                task = new __WEBPACK_IMPORTED_MODULE_0__task_DirectTask__["a" /* default */](file);
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
    handleImages() {
        let promises = [];
        if (this.compress != 1 || this.scale[0] != 0 || this.scale[1] != 0) {
            for (let task of this.taskQueue) {
                if (!task.file.type.match('image.*')) {
                    continue;
                }
                __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`${task.file.name} 处理前的图片大小:${task.file.size / 1024} kb`);
                let canvas = document.createElement('canvas');
                let img = new Image();
                let ctx = canvas.getContext('2d');
                img.src = URL.createObjectURL(task.file);
                let _this = this;
                promises.push(new Promise(resolve => img.onload = () => {
                    let imgW = img.width;
                    let imgH = img.height;
                    let scaleW = _this.scale[0];
                    let scaleH = _this.scale[1];
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
                    canvas.toBlob(blob => {
                        resolve(blob);
                        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`${task.file.name} 处理后的图片大小:${blob.size / 1024} kb`);
                    }, "image/jpeg", _this.compress * 0.95);
                }).then(blob => {
                    blob.name = task.file.name;
                    task.file = blob;
                    if (Uploader.isChunkTask(task)) {
                        task.spliceFile2Block();
                    }
                }));
            }
        }
        return Promise.all(promises);
    }
    /**
     * 检验选项合法性
     */
    validateOptions() {
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("开始检查构建参数合法性");
        if (!this._tokenFunc) {
            throw new Error('你必须提供一个获取Token的回调函数');
        }
        if (!this.scale || !(this.scale instanceof Array) || this.scale.length != 2 || this.scale[0] < 0 || this.scale[1] < 0) {
            throw new Error('scale必须是长度为2的number类型的数组,scale[0]为宽度，scale[1]为长度,必须大于等于0');
        }
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d("构建参数检查完毕");
    }
    /**
     * 开始上传
     */
    start() {
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`上传任务遍历开始`);
        if (!this.hasFiles()) {
            throw new Error('没有选中的文件，无法开始上传');
        }
        if (this.tasking) {
            throw new Error('任务执行中，请不要重复上传');
        }
        this.listener.onStart(this.taskQueue);
        //遍历任务队列
        for (let task of this.taskQueue) {
            __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`上传文件名：${task.file.name}`);
            __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`上传文件大小：${task.file.size}字节，${task.file.size / 1024} kb，${task.file.size / 1024 / 1024} mb`);
            //根据任务的类型调用不同的上传模式进行上传
            if (Uploader.isDirectTask(task)) {
                __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d('该上传任务为直传任务');
                //直传
                new __WEBPACK_IMPORTED_MODULE_6__pattren_DirectUploadPattern__["a" /* default */](this).upload(task);
            } else if (Uploader.isChunkTask(task)) {
                __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d('该上传任务为分片任务');
                //分块上传
                new __WEBPACK_IMPORTED_MODULE_7__pattren_ChunkUploadPattern__["a" /* default */](this).upload(task);
            } else {
                throw new Error('非法的task类型');
            }
        }
    }
    /**
     * 所有任务是否完成
     * @returns {boolean}
     */
    isTaskQueueFinish() {
        for (let task of this.taskQueue) {
            if (!task.isFinish) {
                return false;
            }
        }
        return true;
    }
    /**
     * 选择文件
     */
    chooseFile() {
        this.fileInput.click();
    }
    getToken(task) {
        if (this._tokenShare && this._token != undefined) {
            return Promise.resolve(this._token);
        }
        __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`开始获取上传token`);
        return Promise.resolve(this._tokenFunc(this, task)).then(token => {
            __WEBPACK_IMPORTED_MODULE_4__util_Log__["a" /* default */].d(`上传token获取成功: ${token}`);
            this._token = token;
            return token;
        });
    }
    requestTaskToken(task, url) {
        return this.resolveSaveKey(task).then(saveKey => {
            return this.requestToken(url, saveKey);
        });
    }
    requestToken(url, saveKey) {
        return new Promise((resolve, reject) => {
            if (typeof saveKey == "string") {
                url += (/\?/.test(url) ? "&" : "?") + "saveKey=" + encodeURIComponent(saveKey);
            }
            url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState != XMLHttpRequest.DONE) {
                    return;
                }
                if (xhr.status == 200) {
                    resolve(xhr.response.uptoken);
                    return;
                }
                reject(xhr.response);
            };
            xhr.onabort = () => {
                reject('aborted');
            };
            xhr.responseType = 'json';
            xhr.send();
        });
    }
    resolveSaveKey(task) {
        let saveKey = this._saveKey;
        if (typeof saveKey != "string") {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(saveKey).then(this.resolveUUID).then(saveKey => this.resolveImageInfo(task.file, saveKey)).then(this.onSaveKeyResolved);
    }
    get retry() {
        return this._retry;
    }
    get size() {
        return this._size;
    }
    get auto() {
        return this._auto;
    }
    get multiple() {
        return this._multiple;
    }
    get accept() {
        return this._accept;
    }
    get compress() {
        return this._compress;
    }
    get scale() {
        return this._scale;
    }
    get listener() {
        return this._listener;
    }
    get fileInput() {
        return this._fileInput;
    }
    get chunk() {
        return this._chunk;
    }
    get taskQueue() {
        return this._taskQueue;
    }
    get tasking() {
        return this._tasking;
    }
    set tasking(value) {
        this._tasking = value;
    }
    get interceptors() {
        return this._interceptors;
    }
    get domain() {
        return this._domain;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Uploader);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Uploader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interceptor_SimpleUploadInterceptor__ = __webpack_require__(6);


/**
 * UploaderBuilder
 *
 */
class UploaderBuilder {
    constructor() {
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
        this._files = []; //自定义上传文件列表
    }
    /**
     * 设置上传的文件
     * @param files
     * @returns {UploaderBuilder}
     */
    files(files) {
        if (files == null || files.length == 0) {
            return this;
        }
        for (let i = 0; i < files.length; i++) {
            this._files.push(files[i]);
        }
        return this;
    }
    /**
     * 设置上传的域名,默认是 {http: 'http://upload.qiniu.com', https: 'https://up.qbox.me'}
     * @param domain
     * @returns {UploaderBuilder}
     */
    domain(domain) {
        this._domain = domain;
        return this;
    }
    /**
     * 设置上传域名的协议类型，默认从 window.location.protocol 读取
     * @param scheme
     * @returns {UploaderBuilder}
     */
    scheme(scheme) {
        this._scheme = scheme;
        return this;
    }
    /**
     * 添加一个拦截器
     * @param interceptor
     * @returns {UploaderBuilder}
     */
    interceptor(interceptor) {
        this._interceptors.push(Object.assign(new __WEBPACK_IMPORTED_MODULE_1__interceptor_SimpleUploadInterceptor__["a" /* default */](), interceptor));
        return this;
    }
    /**
     * 上传失败后的重传尝试次数
     * @param retry 默认0次，不尝试次重传
     * @returns {UploaderBuilder}
     */
    retry(retry) {
        this._retry = retry;
        return this;
    }
    /**
     * 设置分片大小
     * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
     * @returns {UploaderBuilder}
     */
    size(size) {
        this._size = Math.min(Math.max(size, 1), UploaderBuilder.MAX_CHUNK_SIZE);
        return this;
    }
    /**
     * 选择文件后,是否自动上传
     * @param auto 默认true
     * @returns {UploaderBuilder}
     */
    auto(auto) {
        this._auto = auto;
        return this;
    }
    /**
     * 是否支持多文件选择
     * @param multiple 默认true
     * @returns {UploaderBuilder}
     */
    multiple(multiple) {
        this._multiple = multiple;
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
    accept(accept) {
        this._accept = accept;
        return this;
    }
    /**
     * 设置上传按钮
     * @param button 上传按钮ID
     * @param eventName 上传按钮的监听事件名称，默认为 "click" 。
     * @returns {UploaderBuilder}
     */
    button(button, eventName = "click") {
        this._button = button;
        this._buttonEventName = eventName;
        return this;
    }
    /**
     * 图片质量压缩,只在上传的文件是图片的时候有效
     * @param compress 0-1,默认1,不压缩
     * @returns {UploaderBuilder}
     */
    compress(compress) {
        this._compress = Math.max(Math.min(compress, 1), 0);
        return this;
    }
    /**
     * 图片缩放
     * @returns {UploaderBuilder}
     * @param scale
     */
    scale(scale) {
        this._scale = scale;
        return this;
    }
    /**
     * 设置 saveKey
     * @param saveKey
     * @returns {UploaderBuilder}
     */
    saveKey(saveKey) {
        this._saveKey = saveKey;
        return this;
    }
    /**
     * 获取Token的地址
     * @param tokenUrl
     * @returns {UploaderBuilder}
     */
    tokenUrl(tokenUrl) {
        this._tokenFunc = (uploader, task) => {
            return uploader.requestTaskToken(task, tokenUrl);
        };
        return this;
    }
    /**
     * 获取Token的函数
     * @param tokenFunc
     * @returns {UploaderBuilder}
     */
    tokenFunc(tokenFunc) {
        this._tokenFunc = (uploader, task) => {
            return new Promise(resolve => {
                tokenFunc(resolve, task);
            });
        };
        return this;
    }
    /**
     * 上传生命周期钩子
     * @param listener
     * @returns {UploaderBuilder}
     */
    listener(listener) {
        this._listener = listener;
        return this;
    }
    /**
     * 是否分享token,如果为false每上传一个文件都需要请求一次Token。
     * @param tokenShare
     * @returns {UploaderBuilder}
     */
    tokenShare(tokenShare) {
        this._tokenShare = tokenShare;
        return this;
    }
    /**
     * 是否分块上传
     * @param chunk 默认false
     * @returns {UploaderBuilder}
     */
    chunk(chunk) {
        this._chunk = chunk;
        return this;
    }
    /**
     * 是否开启debug模式
     * @param debug 默认false
     * @returns {UploaderBuilder}
     */
    debug(debug) {
        this._isDebug = debug;
        return this;
    }
    get getRetry() {
        return this._retry;
    }
    get getSize() {
        return this._size;
    }
    get getAuto() {
        return this._auto;
    }
    get getMultiple() {
        return this._multiple;
    }
    get getAccept() {
        return this._accept;
    }
    get getButton() {
        return this._button;
    }
    get getButtonEventName() {
        return this._buttonEventName;
    }
    get getCompress() {
        return this._compress;
    }
    get getScale() {
        return this._scale;
    }
    get getListener() {
        return this._listener;
    }
    get getSaveKey() {
        return this._saveKey;
    }
    get getTokenFunc() {
        return this._tokenFunc;
    }
    get getTokenShare() {
        return this._tokenShare;
    }
    get getChunk() {
        return this._chunk;
    }
    get getIsDebug() {
        return this._isDebug;
    }
    get getInterceptors() {
        return this._interceptors;
    }
    get getFiles() {
        return this._files;
    }
    get getDomain() {
        let domain = this._domain;
        if (!domain) {
            domain = UploaderBuilder.UPLOAD_DOMAIN;
        }
        if (typeof domain != "string") {
            let scheme = this._scheme;
            if (typeof scheme != "string") {
                let protocol = window.location.protocol;
                scheme = protocol.substring(0, protocol.length - 1);
            }
            domain = domain[scheme];
        }
        return domain.endsWith('/') ? domain.substring(0, domain.length - 1) : domain;
    }
    build() {
        return new __WEBPACK_IMPORTED_MODULE_0__Uploader__["a" /* default */](this);
    }
}
UploaderBuilder.MAX_CHUNK_SIZE = 4 * 1024 * 1024; //分片最大值
UploaderBuilder.BLOCK_SIZE = UploaderBuilder.MAX_CHUNK_SIZE; //分块大小，只有大于这个数才需要分块
UploaderBuilder.UPLOAD_DOMAIN = { http: 'http://upload.qiniu.com', https: 'https://up.qbox.me' };
/* harmony default export */ __webpack_exports__["a"] = (UploaderBuilder);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 上传任务
 */
class BaseTask {
    constructor(file) {
        this._retry = 0; //已重试次数
        this._progress = 0; //任务进度,最大100
        this._isSuccess = false; //是否上传成功
        this._isFinish = false; //是否结束
        this._file = file;
        this._createDate = new Date();
    }
    get file() {
        return this._file;
    }
    set file(file) {
        this._file = file;
    }
    get retry() {
        return this._retry;
    }
    set retry(value) {
        this._retry = value;
    }
    get createDate() {
        return this._createDate;
    }
    set createDate(value) {
        this._createDate = value;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        this._startDate = value;
    }
    get endDate() {
        return this._endDate;
    }
    set endDate(value) {
        this._endDate = value;
    }
    get isSuccess() {
        return this._isSuccess;
    }
    set isSuccess(value) {
        this._isSuccess = value;
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
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
    get key() {
        return this._key;
    }
    set key(value) {
        this._key = value;
    }
    get isFinish() {
        return this._isFinish;
    }
    set isFinish(value) {
        this._isFinish = value;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (BaseTask);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_Uploader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_UploaderBuilder__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Uploader", function() { return __WEBPACK_IMPORTED_MODULE_0__upload_Uploader__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UploaderBuilder", function() { return __WEBPACK_IMPORTED_MODULE_1__upload_UploaderBuilder__["a"]; });




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SimpleUploadListener {
    onReady(taskQueue) {}
    onStart(taskQueue) {}
    onTaskProgress(task) {}
    onTaskGetKey(task) {
        return null;
    }
    onTaskFail(task) {}
    onTaskSuccess(task) {}
    onTaskRetry(task) {}
    onFinish(taskQueue) {}
}
/* harmony default export */ __webpack_exports__["a"] = (SimpleUploadListener);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SimpleUploadInterceptor {
    onIntercept(task) {
        return false;
    }
    onInterrupt(task) {
        return false;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (SimpleUploadInterceptor);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Log__ = __webpack_require__(0);

/**
 * 分块上传
 */
class ChunkUploadPattern {
    constructor(uploader) {
        this.uploader = uploader;
    }
    init(uploader) {
        this.uploader = uploader;
    }
    upload(task) {
        this.task = task;
        this.uploader.getToken(task).then(token => {
            task.startDate = new Date();
            this.uploadBlock(token);
        });
    }
    uploadBlock(token) {
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d(`准备开始上传块`);
        let chain = Promise.resolve();
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d(`共${this.task.blocks.length}块等待上传`);
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d(`共${this.task.totalChunkCount}分片等待上传`);
        this.task.blocks.forEach((block, blockIndex) => {
            block.chunks.forEach((chunk, chunkIndex) => {
                chain = chain.then(() => {
                    __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d(`开始上传第${blockIndex + 1}块,第${chunkIndex + 1}片`);
                    return this.uploadChunk(chunk, token);
                });
            });
        });
        chain.then(() => {
            return this.concatChunks(token);
        }).then(() => {
            //所有任务都结束了
            if (this.uploader.isTaskQueueFinish()) {
                __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d(`上传任务队列已结束`);
                //更改任务执行中标志
                this.uploader.tasking = false;
                //监听器调用
                this.uploader.listener.onFinish(this.uploader.taskQueue);
            }
        }).catch(response => {
            __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${this.task.file.name}分块上传失败`);
            this.task.error = response;
            this.task.isSuccess = false;
            this.task.isFinish = true;
            this.task.endDate = new Date();
            this.uploader.listener.onTaskFail(this.task);
        });
    }
    uploadChunk(chunk, token) {
        return new Promise((resolve, reject) => {
            let isFirstChunkInBlock = chunk.block.chunks.indexOf(chunk) == 0;
            let chunkIndex = chunk.block.chunks.indexOf(chunk);
            //前一个chunk,如果存在的话
            let prevChunk = isFirstChunkInBlock ? null : chunk.block.chunks[chunkIndex - 1];
            let url = isFirstChunkInBlock ? this.getUploadBlockUrl(chunk.block.data.size) : this.getUploadChunkUrl(chunk.start, prevChunk ? prevChunk.ctx : null, prevChunk ? prevChunk.host : null);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url += (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream'); //设置contentType
            xhr.setRequestHeader('Authorization', `UpToken ${token}`); //添加token验证头
            //分片上传中
            xhr.upload.onprogress = e => {
                if (e.lengthComputable) {
                    let progress = Math.round((this.task.finishedBlocksSize + chunk.start + e.loaded) / this.task.file.size * 100);
                    if (this.task.progress < progress) {
                        this.task.progress = progress;
                        this.uploader.listener.onTaskProgress(this.task);
                    }
                }
            };
            //分片上传完成
            xhr.upload.onload = () => {
                let progress = Math.round((this.task.finishedBlocksSize + chunk.start + chunk.data.size) / this.task.file.size * 100);
                if (this.task.progress < progress) {
                    this.task.progress = progress;
                    this.uploader.listener.onTaskProgress(this.task);
                }
            };
            //响应返回
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200 && xhr.responseText != '') {
                        let result = JSON.parse(xhr.responseText);
                        chunk.isFinish = true;
                        chunk.processing = false;
                        chunk.ctx = result.ctx;
                        chunk.host = result.host;
                        let chunkIndex = chunk.block.chunks.indexOf(chunk);
                        let hasNextChunkInThisBlock = chunkIndex != chunk.block.chunks.length - 1;
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
    concatChunks(token) {
        return new Promise((resolve, reject) => {
            let encodedKey = this.task.key ? btoa(this.task.key) : null;
            // 安全字符串 参考：https://developer.qiniu.com/kodo/api/mkfile
            if (encodedKey) {
                encodedKey = encodedKey.replace(/\+/g, '-');
                encodedKey = encodedKey.replace(/\//g, '_');
            }
            let url = this.getMakeFileUrl(this.task.file.size, encodedKey);
            //构建所有数据块最后一个数据片上传后得到的<ctx>的组合成的列表字符串
            let ctxListString = '';
            for (let block of this.task.blocks) {
                let lastChunk = block.chunks[block.chunks.length - 1];
                ctxListString += lastChunk.ctx + ',';
            }
            if (ctxListString.endsWith(',')) {
                ctxListString = ctxListString.substring(0, ctxListString.length - 1);
            }
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url += (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
            xhr.setRequestHeader('Content-Type', 'text/plain'); //设置contentType
            xhr.setRequestHeader('Authorization', `UpToken ${token}`); //添加token验证头
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    this.task.isFinish = true;
                    if (xhr.status == 200 && xhr.responseText != '') {
                        let result = JSON.parse(xhr.responseText);
                        this.task.isSuccess = true;
                        this.task.result = result;
                        this.task.endDate = new Date();
                        this.uploader.listener.onTaskSuccess(this.task);
                        resolve();
                    } else if (this.retryTask(this.task)) {
                        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${this.task.file.name}分块上传失败,准备开始重传`);
                        this.uploader.listener.onTaskRetry(this.task);
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
    getUploadBlockUrl(blockSize) {
        return `${this.uploader.domain}/mkblk/${blockSize}`;
    }
    /**
     * 获取片上传的url
     * @param start 片的在块中的起始位置
     * @param ctx 前一次上传返回的块级上传控制信息。
     * @param host 指定host
     */
    getUploadChunkUrl(start, ctx, host) {
        return `${host ? host : this.uploader.domain}/bput/${ctx}/${start}/`;
    }
    /**
     * 获取合并块为文件的url
     * @param fileSize 文件大小
     * @param encodedKey base64UrlEncode后的资源名称,若未指定，则使用saveKey；若未指定saveKey，则使用资源内容的SHA1值作为资源名。
     * @returns {string}
     */
    getMakeFileUrl(fileSize, encodedKey) {
        if (encodedKey) {
            return `${this.uploader.domain}/mkfile/${fileSize}/key/${encodedKey}`;
        } else {
            return `${this.uploader.domain}/mkfile/${fileSize}`;
        }
    }
    retryTask(task) {
        //达到重试次数
        if (task.retry >= this.uploader.retry) {
            __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${task.file.name}达到重传次数上限${this.uploader.retry},停止重传`);
            return false;
        }
        task.retry++;
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${task.file.name}开始重传,当前重传次数${task.retry}`);
        // this.upload(task);
        //todo
        return true;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ChunkUploadPattern);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Log__ = __webpack_require__(0);

/**
 * 直接上传
 */
class DirectUploadPattern {
    constructor(uploader) {
        this.uploader = uploader;
    }
    /**
     * 实现接口的上传方法
     * @param task
     */
    upload(task) {
        this.task = task;
        this.uploader.getToken(task).then(token => {
            task.startDate = new Date();
            this.uploadFile(token);
        });
    }
    /**
     * 创建表单
     * @param token
     * @returns {FormData}
     */
    createFormData(token) {
        let task = this.task;
        let formData = new FormData();
        //key存在，添加到formData中，若不设置，七牛服务器会自动生成hash key
        if (task.key !== null && task.key !== undefined) {
            formData.append('key', task.key);
        }
        formData.append('token', token);
        formData.append('file', task.file);
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d(`创建formData对象`);
        return formData;
    }
    /**
     * 上传文件
     * @param token
     */
    uploadFile(token) {
        let task = this.task;
        let xhr = new XMLHttpRequest();
        //上传中
        xhr.upload.onprogress = e => {
            if (e.lengthComputable) {
                let progress = Math.round(e.loaded * 100 / e.total);
                if (task.progress < progress) {
                    task.progress = progress;
                    this.uploader.listener.onTaskProgress(task);
                }
            }
        };
        //上传完成
        xhr.upload.onload = () => {
            if (task.progress < 100) {
                task.progress = 100;
                this.uploader.listener.onTaskProgress(task);
            }
        };
        let url = this.uploader.domain;
        //避免浏览器缓存http请求
        url += (/\?/.test(this.uploader.domain) ? "&" : "?") + new Date().getTime();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200 && xhr.responseText != '') {
                    task.result = JSON.parse(xhr.responseText);
                    task.isSuccess = true;
                    task.isFinish = true;
                    task.endDate = new Date();
                    this.uploader.listener.onTaskSuccess(task);
                } else if (this.retryTask(task)) {
                    __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${task.file.name}上传失败,准备开始重传`);
                    this.uploader.listener.onTaskRetry(task);
                } else {
                    __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${task.file.name}上传失败`);
                    task.error = xhr.response;
                    task.isSuccess = false;
                    task.isFinish = true;
                    task.endDate = new Date();
                    this.uploader.listener.onTaskFail(task);
                }
                //所有任务都结束了
                if (this.uploader.isTaskQueueFinish()) {
                    __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d('上传队列结束');
                    //更改任务执行中标志
                    this.uploader.tasking = false;
                    //onFinish callback
                    this.uploader.listener.onFinish(this.uploader.taskQueue);
                }
            }
        };
        let formData = this.createFormData(token);
        xhr.send(formData);
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d('发送ajax post 请求');
    }
    /**
     * 重传
     * @param task
     * @returns {boolean}
     */
    retryTask(task) {
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].d("开始尝试重传");
        //达到重试次数
        if (task.retry >= this.uploader.retry) {
            __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${task.file.name}达到重传次数上限${this.uploader.retry},停止重传`);
            return false;
        }
        task.retry++;
        __WEBPACK_IMPORTED_MODULE_0__util_Log__["a" /* default */].w(`${task.file.name}开始重传,当前重传次数${task.retry}`);
        this.upload(task);
        return true;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DirectUploadPattern);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChunkTask; });
/* unused harmony export Block */
/* unused harmony export Chunk */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTask__ = __webpack_require__(3);

/**
 * 分块任务
 */
class ChunkTask extends __WEBPACK_IMPORTED_MODULE_0__BaseTask__["a" /* default */] {
    /**
     * 构造函数
     * @param file
     * @param blockSize 块大小
     * @param chunkSize 片大小
     */
    constructor(file, blockSize, chunkSize) {
        super(file);
        //分块
        this._blocks = [];
        this._blockSize = 0;
        this._chunkSize = 0;
        this._blockSize = blockSize;
        this._chunkSize = chunkSize;
        this.spliceFile2Block();
    }
    /**
     * 将文件分块
     */
    spliceFile2Block() {
        this._blocks = [];
        let fileSize = this._file.size;
        let file = this._file;
        //总块数
        let blockCount = Math.ceil(fileSize / this._blockSize);
        for (let i = 0; i < blockCount; i++) {
            let start = i * this._blockSize; //起始位置
            let end = start + this._blockSize; //结束位置
            //构造一个块实例
            let block = new Block(start, end, file.slice(start, end), this._chunkSize, file);
            //添加到数组中
            this._blocks.push(block);
        }
    }
    /**
     * 获取所有的block
     * @returns {Block[]}
     */
    get blocks() {
        return this._blocks;
    }
    /**
     * 获取正在处理的block
     * @returns {Block}
     */
    get processingBlock() {
        for (let block of this._blocks) {
            if (!block.processing) {
                continue;
            }
            return block;
        }
        throw Error("找不到正在处理的Block");
    }
    get finishedBlocksSize() {
        let size = 0;
        for (let block of this._blocks) {
            size += block.isFinish ? block.data.size : 0;
        }
        return size;
    }
    get chunks() {
        let array = [];
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
    get processingChunk() {
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
        throw Error("找不到正在处理的Chunk");
    }
    /**
     * 总共分片数量(所有分块的分片数量总和)
     * @returns {number}
     */
    get totalChunkCount() {
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
    /**
     *
     * @param start 起始位置
     * @param end 结束位置
     * @param data 块数据
     * @param chunkSize 分片数据的最大大小
     * @param file 分块所属文件
     */
    constructor(start, end, data, chunkSize, file) {
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
    spliceBlock2Chunk(chunkSize) {
        let blockSize = this._data.size;
        let data = this._data;
        //总片数
        let chunkCount = Math.ceil(blockSize / chunkSize);
        for (let i = 0; i < chunkCount; i++) {
            let start = i * chunkSize; //起始位置
            let end = start + chunkSize; //结束位置
            //构造一个片实例
            let chunk = new Chunk(start, end, data.slice(start, end), this);
            //添加到数组中
            this._chunks.push(chunk);
        }
    }
    /**
     * 是否上传中
     * @returns {boolean}
     */
    get processing() {
        return this._processing;
    }
    set processing(value) {
        this._processing = value;
    }
    /**
     * 分块所属的文件
     * @returns {File}
     */
    get file() {
        return this._file;
    }
    /**
     * 是否已经结束
     * @returns {boolean}
     */
    get isFinish() {
        return this._isFinish;
    }
    set isFinish(value) {
        this._isFinish = value;
    }
    /**
     * 返回分块数据
     * @returns {Blob}
     */
    get data() {
        return this._data;
    }
    /**
     * 返回字节起始位置
     * @returns {number}
     */
    get start() {
        return this._start;
    }
    /**
     * 返回字节结束位置
     * @returns {number}
     */
    get end() {
        return this._end;
    }
    get chunks() {
        return this._chunks;
    }
}
/**
 * 分片，分片大小可以自定义，至少1字节
 */
class Chunk {
    /**
     *
     * @param start 字节起始位置
     * @param end 字节结束位置
     * @param data 分片数据
     * @param block 分块对象
     */
    constructor(start, end, data, block) {
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
    get block() {
        return this._block;
    }
    /**
     * 返回字节起始位置
     * @returns {number}
     */
    get start() {
        return this._start;
    }
    /**
     * 返回字节结束位置
     * @returns {number}
     */
    get end() {
        return this._end;
    }
    /**
     * 返回分片数据
     * @returns {Blob}
     */
    get data() {
        return this._data;
    }
    /**
     * 是否已经结束
     * @returns {boolean}
     */
    get isFinish() {
        return this._isFinish;
    }
    set isFinish(value) {
        this._isFinish = value;
    }
    get host() {
        return this._host;
    }
    set host(value) {
        this._host = value;
    }
    /**
     * 是否上传中
     * @returns {boolean}
     */
    get processing() {
        return this._processing;
    }
    set processing(value) {
        this._processing = value;
    }
    /**
     * 返回上传控制信息(七牛服务器返回前一次上传返回的分片上传控制信息,用于下一次上传,第一个chunk此值为空)
     * @returns {string}
     */
    get ctx() {
        return this._ctx;
    }
    set ctx(value) {
        this._ctx = value;
    }
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTask__ = __webpack_require__(3);

/**
 * 直传任务
 */
class DirectTask extends __WEBPACK_IMPORTED_MODULE_0__BaseTask__["a" /* default */] {}
/* harmony default export */ __webpack_exports__["a"] = (DirectTask);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UUID {
    static uuid() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (UUID);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Object.assign polyfill
 */
if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index];
            if (source != null) {
                for (let key in source) {
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
            let binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
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
    let toString = {}.toString;
    let endsWith = function (search) {
        if (this == null) {
            throw TypeError();
        }
        let string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
            throw TypeError();
        }
        let stringLength = string.length;
        let searchString = String(search);
        let searchLength = searchString.length;
        let pos = stringLength;
        if (arguments.length > 1) {
            let position = arguments[1];
            if (position !== undefined) {
                // `ToInteger`
                pos = position ? Number(position) : 0;
                if (pos != pos) {
                    pos = 0;
                }
            }
        }
        let end = Math.min(Math.max(pos, 0), stringLength);
        let start = end - searchLength;
        if (start < 0) {
            return false;
        }
        let index = -1;
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
//# sourceMappingURL=qiniu4js.es.js.map