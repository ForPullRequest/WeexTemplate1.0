/*
* 引导用户使用壳中的原生函数 做到整个项目中的集中处理
*
* 图片选择 TSLImagePicker
* 导航 navigator
* 全局提醒 TSLContainer
* 提示 TSLModal/modal
* 简单数据存储 TSLCache
*/


const defHardwareAccelerated = true;
const defScreenOrientation = 'portrait';
const defImmergeColor = '';
/*
 * @param hardwareAccelerated 硬件加速 默认true
 * @param immergeColor        沉浸色 默认无
 * @param screenOrientation   屏幕方向 默认portrait 可选landscape
 * @param option              给下个界面的参数
*/
function push(option, model, func){
    var src = option.src ? option.src : '';
    var hardwareAccelerated = option.hardwareAccelerated ? option.hardwareAccelerated : defHardwareAccelerated;
    var screenOrientation = option.screenOrientation ? option.screenOrientation : defScreenOrientation;
    var immergeColor = option.immergeColor ? option.immergeColor : defImmergeColor;
    weex.requireModule('TSLNavigation').push({
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
        weex.requireModule('modal').toast({message:msg});
    },
    //弹出提示框
    alert: function(msg, func){
        weex.requireModule('modal').alert({message:msg,okTitle:"确定"}, function(e){
            if(func){
                func(e);
            }
        });
    },
    //开启弹窗 弃用
    alertWindow: function(src, width, height, isGlobal, data){
        weex.requireModule('TSLModal').alert({
            src: src,
            width: width,
            height: height,
            global: isGlobal,
            data: data
        })
    },
    //关闭弹窗 弃用
    closeAlert: function(func){
        weex.requireModule('TSLModal').closeAlert(function () {
            if(func){
                func();
            }
        });
    },
    //弹出操作表 弃用
    sheet: function(items, cancel, func){
        weex.requireModule('TSLModal').sheet({
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
        weex.requireModule('TSLModal').registerAlert(name, function(e) {
            func(e);
        });
    },
    //请求全局事件
    notify: function(name, map){
        weex.requireModule('TSLContainer').notify(name, map);
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
        weex.requireModule('TSLNavigation').pop();
    },
    /**
     * 返回到首页
     */
    backToRoot: function () {
        weex.requireModule('TSLNavigation').goBack(0);
    },
    /**
     * 返回到哪一页
     * @param page  页码
     */
    backToPage: function (page) {
        weex.requireModule('TSLNavigation').goBack(page);
    },
    /**
     * 返回多少页
     * @param pages 返回的页数
     */
    backPages: function (pages) {
        weex.requireModule('TSLNavigation').backpage(pages);
    },
    backPage: function(num){
        weex.requireModule('TSLNavigation').backpage(num);
    },
    canAssistBack: function(canBack){
        weex.requireModule('TSLNavigation').canAssistBack(canBack);
    },
    // getPageStack: function(func){
    //  navigator.getPageStack(function(pages){
    //      func(pages);
    //  });
    // },

/* navigator */
/* picker */

    imagePicker: function(num, func){
        weex.requireModule('TSLImagePicker').imagepicker({num : num}, function (imgList) {
            func(imgList);
        });
    },

/* picker */
/* cache */

    /**
     * 缓存信息
     * @param tar       存储的对象
     * @param name      存储的key
     * @param func      处理方法
     */
    save: function(name, tar, func){
        weex.requireModule('TSLCache').save(tar, name, function () {
            if(func){
                func();
            }
        });
    },
    get: function(name, func){
        weex.requireModule('TSLCache').getValue(name, function(ret){
            func(ret.val);
        });
    },
    getString: function(name){
        return weex.requireModule('TSLCache').getString(name);
    },
    remove: function(name, func){
        weex.requireModule('TSLCache').remove(name, function(ret){
            if(func){
                func(ret);
            }
        });
    },
    clear: function(func){
        weex.requireModule('TSLCache').clearCache(function(){
            if(func){
                func();
            }
        });
    },
    contain: function(name, func){
        weex.requireModule('TSLCache').contain(name, function(){
            if(func){
                func();
            }
        });
    },

/* cache */
}

exports.br = {
    /*
     * 启动统计
     * @param option
     * @      token                 必填
     * @      ConfigUrl             必填
     * @      NougatEnable          非必填 默认true
     * @      CrashReportingEnabled 非必填 默认true
     * @      AsynchronismEnabled   非必填 默认false
     * @      RateOfLaunch          非必填 默认1.0
     * @      channelId             非必填 
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    start: function(option, success, fail, complete){
        weex.requireModule('BRAgent').start({
            token: option.token,
            ConfigUrl: option.ConfigUrl,//https://apmupload.zwjk.com/config
            NougatEnable: option.NougatEnable,
            CrashReportingEnabled: option.CrashReportingEnabled,
            AsynchronismEnabled: option.AsynchronismEnabled,
            RateOfLaunch: option.RateOfLaunch,
            channelId: option.channelId,
            success: function(res){
                if(success){
                    success(res);
                }
            },
            fail: function(error){
                if(fail){
                    fail(error);
                }
            },
            complete: function(res){
                if(complete){
                    complete(res);
                }
            }
        });
    },
    /*
     * 设置统计中的用户id,区分不同用户
    */
    onMemberId: function(memberId){
        weex.requireModule('BRAgent').onMemberId(memberId);
    },
    /*
     * 页面统计,进入，与onPageEnd成对出现
    */
    onPageStart: function(pageId, pageName){
        weex.requireModule('BRAgent').onPageStart({
            pageId:pageId,
            pageName:pageName
        });
    },
    /*
     * 页面统计,离开,与onPageStart成对出现
    */
    onPageEnd: function(pageId, pageName){
        weex.requireModule('BRAgent').onPageEnd({
            pageId:pageId,
            pageName:pageName
        });
    },
    /*
     * 事件统计
    */
    onEvent: function(pageId, pageName){
        weex.requireModule('BRAgent').onEvent({
            eventId:pageId,
            eventName:pageName
        });
    },
}