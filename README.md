# qiniu4js
TypeScript编写，不依赖任何三方库。

## 已完成

- [x] 文件直传
- [x] 分块上传
- [x] 多文件上传
- [x] token共享
- [x] 自动重传
- [x] 任务拦截器
- [x] 文件过滤
- [x] 多实例(可以创建多个上传实例,互不影响)
- [x] 图片缩放
- [x] 图片质量压缩

## 待完成
- [ ] 完善文档
- [ ] 自定义变量
- [ ] 使用七牛API进行图片处理

## 安装

```bash
sudo npm install qiniu4js --save
```

## 导入

### 浏览器
```html
    <script src="qiniu4js.js"></script>
    <script>
        var uploader = new Qiniu.UploaderBuilder().build();
    </script>
```
### es6
```javascript
    import {UploaderBuilder,Uploader} from 'qiniu4js';
    let uploader = new UploaderBuilder().build();
```

### CommonJS
```javascript
    var Qiniu =  require('qiniu4js');
    var uploader = new Qiniu.UploaderBuilder().build();
```

## 使用方法


```javascript
//es6
//构建uploader实例
let uploader = new UploaderBuilder()
	.debug(false)//开启debug，默认false
	.button('uploadButton')//指定上传按钮
	.domain({http: "http://img.yourdomain.com", https: "https://img.yourdomain.com"})//默认为{http: "http://upload.qiniu.com", https: "https://up.qbox.me"}
	.scheme("https")//默认从 window.location.protocol 获取，可以通过指定域名为 "http://img.yourdomain.com" 来忽略域名选择。
	.retry(0)//设置重传次数，默认0，不重传
	.compress(0.5)//默认为1,范围0-1
	.scale([200,0])第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
	.size(1024*1024)//分片大小，最多为4MB,单位为字节,默认1MB
	.chunk(true)//是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
	.auto(true)//选中文件后立即上传，默认true
	.multiple(true)//是否支持多文件选中，默认true
	.accept(['.gif','.png','video/*'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp

	// 在一次上传队列中，是否分享token，如果为false每上传一个文件都需要请求一次token，默认true。
	//
	// 如果saveKey中有需要在客户端解析的变量，则忽略该值。
	.tokenShare(true)

	// 设置token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
	//
	// 覆盖tokenUrl的设置。
	.tokenFunc(function (setToken,task) {
		setTimeout(function () {
			setToken("token");
		}, 1000);
	})

	// 设置token获取URL：客户端向该地址发送HTTP GET请求, 若成功，服务器端返回{"uptoken": 'i-am-token'}。
	//
	// 覆盖tokenFunc的设置。
	.tokenUrl('/qiniu/upload-token')

	// 设置token获取过程是否使用了saveKey，默认false。
	//
	// 若为true，则listener中的onTaskGetKey不会被调用。
	.saveKey(true)

	// 设置tokenUrl请求中的saveKey参数和七牛上传策略中的saveKey字段。
	//
	// 客户端解析变量（七牛不支持在saveKey中使用这些变量）：
	// * $(uuid)
	// * $(imageInfo.width) $(imageInfo.height)
	//
	// 如参数中有需要在客户端解析的变量，则忽略tokenShare的设置。
	//
	// 若设置了，则listener中的onTaskGetKey不会被调用。
	//
	// 关于saveKey，见https://developer.qiniu.com/kodo/manual/vars
	.saveKey('dir1/dir2/$(uuid)_$(imageInfo.width)x$(imageInfo.height)$(ext)')

	//任务拦截器
    .interceptor({
        //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
    	onIntercept: function (task) {
    		return task.file.size > 1024 * 1024;
    	},
    	//中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
    	onInterrupt: function (task) {
    		if (this.onIntercept(task)) {
    			alert("请上传小于1m的文件");
    			return true;
    		}
    		else {
    			return false;
    		}
    	}
    }   
    //你可以添加多个任务拦截器
    .interceptor({...})
	.listener({
		onReady(tasks) {
		    //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
			//选择上传文件确定后,该生命周期函数会被回调。
			
		},onStart(tasks){
		    //所有内部图片任务处理后执行
			//开始上传
			
		},onTaskGetKey(task){
		    //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
			return "test.png";
			
		},onTaskProgress: function (task) {
		    //每一个任务的上传进度,通过`task.progress`获取
			console.log(task.progress);
			
		},onTaskSuccess(task){
			//一个任务上传成功后回调
			console.log(task.result.key);//文件的key
			console.log(task.result.hash);//文件hash
		},onTaskFail(task) {
        	//一个任务在经历重传后依然失败后回调此函数
        	
        },onTaskRetry(task) {
        	//开始重传
        	
        },onFinish(tasks){
            //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
            
		}}
	}).build();
	
	
//如果auto设置为false,则需要手动启动上传。
//uploader.start();


//由于安全原因，display:none的file input，无法通过代码调用click方法，必须通过如下处理，让用户来实现click，从而打开文件选择窗口:

//你可以自行监听HTML元素的click事件，在回调函数内部打开文件选择窗口。你也可以使用jQuery监听，下面使用的是原生的JavaScript的方式。
button = document.getElementById('button');
button.addEventListener("click", function () {
	uploader.chooseFile();
}
```


## 版本说明
- 1.0.10 (2017-3-4)
    - fix https://github.com/lsxiao/qiniu4js/issues/21
    - fix https://github.com/lsxiao/qiniu4js/issues/18
- 1.0.8 (2017-2-7)
    - button方法，可以指定上传按钮，传入id
    
- 1.0.7 (2016-11-28)
    - scheme方法,可选上传协议。
    
- 1.0.6 (2016-11-25)
    - 修复微信x5内核不支持Object.assign的问题，添加Object.assign polyfill.
    - 微信x5 对input.accept属性做了限制，如果要上传图片请使用accept(['image/*'])
    - Canvas.toBlob polyfill
    - String.endsWith polyfill

- 1.0.3 (2016-11-22)
    - fix typescript编译出错导致无法被uglify。

- 1.0.1 (2016-11-18)
    - 图片缩放后，无法分块上传的问题。

- 1.0.0 (2016-11-9)
    - scale没有默认值的问题，正式版本发布。

- 0.0.11 (2016-11-9)
    - 图片质量压缩和宽高缩放,修复progress在分块上传的时候相同值可能会多次重复出现的问题。
    
- 0.0.10 (2016-10-21)
    - 修复JSON parse失败导致的task.result为false的问题。
    
- 0.0.9 (2016-10-21)
    - 分块上传，自定义上传域名

- 0.0.8 (2016-10-19)
    - fix bug,当没有选中任何文件的时候，会触发上传函数。

- 0.0.7 (2016-10-19)
    - 更换上传域名为upload.qiniu.com 
    
- 0.0.6 (2016-10-19)
    - 绕过缓存，避免每次都上传同样的文件。

- 0.0.5 (2016-10-19)
    - tokenFunc(setToken,task)增加task参数
    
- 0.0.4 (2016-10-19)
    - 修复了一个关于accept选项的bug。

- 0.0.3 (2016-10-19)
    - 任务拦截器实现。

- 0.0.2 (2016-10-19)
    - 基本功能的实现。



## 维护人
知乎 : [@面条](https://www.zhihu.com/people/lsxiao)

Github : [@lsxiao](https://github.com/lsxiao)


## 开源许可
MIT
