# qiniu4js
qiniu4js目前可能是七牛JavaScript浏览器文件上传的最好实现。

使用TypeScript编写，不依赖任何三方库，纯代码不包含任何界面元素，使用HTML5 文件API上传(目前和未来不会支持HTML4以及FLASH)。

支持UMD模块导入。

## 已完成

- [x] 文件直传
- [x] 多文件上传
- [x] token共享
- [x] 自动重传
- [x] 任务拦截器
- [x] 文件过滤
- [x] 多实例(可以创建多个上传实例,互不影响)

## 待完成

- [ ] 分块上传
- [ ] 图片裁剪
- [ ] 图片质量压缩
- [ ] 使用七牛API进行图片处理

## 安装

```bash
sudo npm install qiniu4js --save
```

## 导入

### 浏览器
```html
    <script src="qiniu4js.js"></script>
```
### es6
```javascript
    import {UploaderBuilder} from 'Qiniu'
```

### CommonJS
```javascript
    {UploaderBuilder} =  require('Qiniu')
```

## 使用方法


```javascript
//构建uploader实例
let uploader = new Qiniu.UploaderBuilder()
	.debug(false)//开启debug，默认false
	.retry(0)//设置重传次数，默认0，不重传
	.auto(true)//选中文件后立即上传，默认true
	.multiple(true)//是否支持多文件选中，默认true
	.accept(['.gif','.png','video/*'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp
	.tokenShare(true)//在一次上传队列中，是否分享token,如果为false每上传一个文件都需要请求一次Token，默认true
	.tokenFunc(function (setToken,task) {
	    //token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
		setTimeout(function () {
			setToken("token");
		}, 1000);
	})
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
    	},
    }   
    //你可以添加多个任务拦截器
    .interceptor({...})
	.listener({
		onReady(tasks) {
			//选择上传文件确定后,该生命周期函数会被回调。
			
		},onStart(tasks){
			//开始上传
			
		},onTaskGetKey(task){
		    //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
			return "test.png";
			
		},onTaskProgress: function (task) {
		    //每一个任务的上传进度,通过`task.progress`获取
			console.log(task.progress);
			
		},onTaskSuccess(task){
			//一个任务上传成功后回调
			
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
