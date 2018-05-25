/*
* 引导用户使用壳中的原生函数 做到整个项目中的集中处理
*
* 图片选择 TSLImagePicker
* 导航 navigator
* 全局提醒 TSLContainer
* 提示 TSLModal/modal
* 简单数据存储 TSLCache
*/

const cache = weex.requireModule('TSLCache');
const tslModal = weex.requireModule('TSLModal');
const modal = weex.requireModule('modal');
const container = weex.requireModule('TSLContainer');
const navigator = weex.requireModule('TSLNavigation');
var imagePicker = weex.requireModule('TSLImagePicker');


const defHardwareAccelerated = true;
const defScreenOrientation = 'portrait';
const defImmergeColor = '';
//hardwareAccelerated 硬件加速 默认true
//immergeColor 沉浸色 默认无
//screenOrientation 屏幕方向 默认portrait 可选landscape
//option 给下个界面的参数
function push(option, model, func){
	var src = option.src ? option.src : '';
	var hardwareAccelerated = option.hardwareAccelerated ? option.hardwareAccelerated : defHardwareAccelerated;
	var screenOrientation = option.screenOrientation ? option.screenOrientation : defScreenOrientation;
	var immergeColor = option.immergeColor ? option.immergeColor : defImmergeColor;
	navigator.push({
			url: src,
			hardwareAccelerated:hardwareAccelerated,
			option: model,
			screenOrientation: screenOrientation,
			immergeColor: immergeColor
		}, function () {
			func();
		});
}

//接口输出
exports.normal = {

/* modal */

	log: function(msg){
		console.log(msg);
	},
	//把对象变为json
	json: function(model){
		return JSON.stringify(model);
	},
	//把json变为对象
	parse: function(json){
		return JSON.parse(json);
	},
	//短暂显示
	toast: function(msg){
		modal.toast({message:msg});
	},
	//弹出提示框
	alert: function(msg, func){
		modal.alert({message:msg,okTitle:"确定"}, function(e){
			if(func){
				func(e);
			}
		});
	},
	//开启弹窗 弃用
	alertWindow: function(src, width, height, isGlobal, data){
		tslModal.alert({
			src: src,
			width: width,
			height: height,
			global: isGlobal,
			data: data
		})
	},
	//关闭弹窗 弃用
	closeAlert: function(func){
		tslModal.closeAlert(function () {
			if(func){
				func();
			}
		});
	},
	//弹出操作表 弃用
	sheet: function(items, cancel, func){
		tslModal.sheet({
			items: items,
			cancel: cancel
		}, function (e) {
			if(func){
				//e.selectedIndex-1对应items中的position，
				//e.selectedIndex为0对应取消
				if(e.selectedIndex!=0){
					func(e.selectedIndex-1);
				}
			}
		});
	},
	//注册处理全局事件
	registerAlert: function(name, func){
		tslModal.registerAlert(name, function(e) {
			func(e);
		});
	},
	//请求全局事件
	notify: function(name, map){
		container.notify(name, map);
	},

/* modal */
/* navigator */

	push: function(option){
		push(option, {}, function(){});
	},
	push: function(option, model){
		push(option, model, function(){});
	},
	push: function(option, model, func){
		if(func){
			push(option, model, func);
		}else{
			push(option, model, function(){});
		}
	},
    /**
     * 返回到上一页
     */
    back: function(){
        navigator.pop();
    },
    /**
	 * 返回到首页
     */
	backToRoot: function () {
        navigator.goBack(0);
    },
    /**
	 * 返回到哪一页
     * @param page  页码
     */
	backToPage: function (page) {
        navigator.goBack(page);
    },
    /**
	 * 返回多少页
     * @param pages 返回的页数
     */
	backPages: function (pages) {
        navigator.backpage(pages);
    },
	backPage: function(num){
		navigator.backpage(num);
	},
	canAssistBack: function(canBack){
		navigator.canAssistBack(canBack);
	},
	// getPageStack: function(func){
	// 	navigator.getPageStack(function(pages){
	// 		func(pages);
	// 	});
	// },

/* navigator */
/* picker */

	imagePicker: function(num, func){
		picker.imagepicker({num : num}, function (imgList) {
			func(imgList);
		});
	},

/* picker */
/* cache */

    /**
	 * 缓存信息
     * @param tar		存储的对象
     * @param name		存储的key
     * @param func		处理方法
     */
	save: function(tar, name, func){
		cache.save(tar, name, function () {
			if(func){
				func();
			}
		});
	},
	get: function(name, func){
		cache.getValue(name, function(ret){
			func(ret.val);
		});
	},
	getString: function(name){
		return cache.getString(name);
	},
	remove: function(name, func){
		cache.remove(name, function(ret){
			if(func){
				func(ret);
			}
		});
	},
	clear: function(func){
		cache.clearCache(function(){
			if(func){
				func();
			}
		});
	},
	contain: function(name, func){
		cache.contain(name, function(){
			if(func){
				func();
			}
		});
	},

/* cache */
}
