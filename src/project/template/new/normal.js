/*
* 引导用户使用壳中的原生函数 做到整个项目中的集中处理
* 新版本中的管理更合理 且import有些问题 因而本js只作为参考 不能被直接使用
*
* 图片选择 TSLImagePicker
* 导航 navigator
* 全局提醒 TSLContainer
* 提示 TSLModal/modal
* 简单数据存储 TSLCache
*/


import { modal, navigator, image, cache } from "tesla-native-js"
/* im, toast, bragent, contact, container, file, patch 还没 */
/*
 * 使用新的navigator.push
 * 以下的原先param放到app.json中配置全局一致
 * @param hardwareAccelerated 硬件加速 默认true
 * @param immergeColor        沉浸色 默认无
 * @param screenOrientation   屏幕方向 默认portrait 可选landscape
 * @param option              给下个界面的参数
*/
function newPush(option, model, func){
    var src = option.src ? option.src : '';
    navigator.push({
            url: src,
            option: model,
        }, function () {
            func();
        });
}
//import navigator from "tesla-native-js"
exports.newNormal = {

/* modal */

    /**
     * 控制台日志
     */
    log: function(msg){
        console.log(msg);
    },
    /**
     * 把对象变为json
     */
    json: function(model){
        return JSON.stringify(model);
    },
    /**
     * 把json变为对象
     */
    parse: function(json){
        return JSON.parse(json);
    },
    /**
     * 新
     * 普通toast
     */
    toast: function(msg){
        modal.showToast({title:msg});
    },
    /**
     * 新
     * 弹出toast
     */
    toast: function(msg, duration, image, mask){
        modal.showToast({
            title:msg,
            duration:duration,
            image:image,
            mask:mask,
        });
    },
    /**
     * 新
     * 弹出提示框
     */
    alert: function(msg, func){
        weex.requireModule('modal').alert({message:msg,okTitle:"确定"}, function(e){
            if(func){
                func(e);
            }
        });
    },
    /**
     * 新
     * 显示加载框
     */
    showLoading: function(title, mask){
        modal.showLoading({title:title, mask:mask});
    },
    //
    /**
     * 新
     * 隐藏加载框
     */
    hideLoading: function(){
        modal.hideLoading();
    },
    //开启弹窗 弃用
    // alertWindow: function(src, width, height, isGlobal, data){
    //  weex.requireModule('TSLModal').alert({
    //      src: src,
    //      width: width,
    //      height: height,
    //      global: isGlobal,
    //      data: data
    //  })
    // },
    //关闭弹窗 弃用
    // closeAlert: function(func){
    //  weex.requireModule('TSLModal').closeAlert(function () {
    //      if(func){
    //          func();
    //      }
    //  });
    // },
    //弹出操作表 弃用
    // sheet: function(items, cancel, func){
    //  weex.requireModule('TSLModal').sheet({
    //      items: items,
    //      cancel: cancel
    //  }, function (e) {
    //      if(func){
    //          //e.selectedIndex-1对应items中的position，
    //          //e.selectedIndex为0对应取消
    //          if(e.selectedIndex!=0){
    //              func(e.selectedIndex-1);
    //          }
    //      }
    //  });
    // },
    /**
     * 暂无
     * 注册处理全局事件
     */
    registerAlert: function(name, func){
        // weex.requireModule('globalEvent').addEventListener(name, func);
    },
    /**
     * 暂无
     * 请求全局事件
     */
    notify: function(name, map){
        // var evt = new Event(name);
        // evt.data = map;
        // weex.document.dispatchEvent(evt);
    },

/* modal */
/* navigator */

    push: function(option){
        newPush(option, {}, function(){});
    },
    push: function(option, model){
        newPush(option, model, function(){});
    },
    push: function(option, model, func){
        if(func){
            newPush(option, model, func);
        }else{
            newPush(option, model, function(){});
        }
    },
    /**
     * 返回到上一页
     */
    back: function(){
        navigator.pop({
            delta:1
        });
    },
    /**
     * 返回到首页
     */
    backToRoot: function () {
        navigator.pop({
            delta:999
        });
    },
    /**
     * 返回到哪一页
     * @param page  页码
     */
    backToPage: function (page) {
        navigator.pop({
            delta:1
        });
    },
    /**
     * 返回多少页
     * @param pages 返回的页数
     */
    backPages: function (pages) {
        navigator.pop({
            delta:pages
        });
    },
    /*
     * 关闭所有页面，关闭App
    */
    exit: function(){
        navigator.exit();
    },
    /*
     * 重定向到新的页面。 关闭当前页面，跳转到应用内的某个页面。
     * @param url      新页面的地址, 相对地址,可以url中通过?拼接简单参数
     * @param option   Object 跳转到新页面需要携带的参数
     * @param success  成功回调
     * @param fail     失败回调
     * @param complete 完成回调
    */
    redirectTo: function(url, option, success, fail, complete){
        navigator.redirectTo({
            url:url,
            option:option,
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
     * 退至后台（Android）
    */
    moveToback: function(){
        if(weex.config.env.platform == 'android'){
            navigator.moveToback();
        }
    },
    /*
     * 目前未知
    */
    canAssistBack: function(canBack){
        // weex.requireModule('TSLNavigation').canAssistBack(canBack);
    },
    /*
     * 获取当前的页面栈,同步方法;获取页面栈的信息，包括每一页的具体信息返回值为一个页面信息的数组
     * @param pagetype weex/native
     * @param route    weex:页面的路径/native:页面的名称
    */
    getPageStack: function(pagetype, route){
        return navigator.getCurrentPagesSync();
    },

/* navigator */
/* image 还有很多没有加*/
    /*
     * 从本地相册选择图片或使用相机拍照。
     * @param count       最多可以选择的图片张数，默认9
     * @param sizeType    original 原图，compressed 压缩图，默认二者都有
     * @param sourceType  album 从相册选图，camera 使用相机，默认二者都有
     * @param filePaths   已经选择的图片,防止重复选择
     * @param success     成功回调
     * @param fail        失败回调
     * @param complete    完成回调
    */
    imagePicker: function(num, option, success, fail, complete){
        image.chooseImage({
            count: num,
            sizeType: option.sizeType,
            sourceType: option.sourceType,
            filePaths: option.filePaths,
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

/* image */
/* cache Sync慎用 容易出bug*/

    /**
     * 异步保存数据
     * @param name      存储的key
     * @param tar       存储的对象
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
     */
    saveStorage: function(name, tar, success, fail, complete){
        cache.setStorage({
            key: name,
            data: tar,
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
     * 保存数据
     * @param name      存储的key
     * @param tar       存储的对象
    */
    saveStorageSync: function(name, tar){
        return cache.setStorageSync(name, tar);
    },
    /*
     * 从本地缓存中异步获取指定 key 对应的内容
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    getStorage: function(name, success, fail, complete){
        cache.getStorage({
            key:name,
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
     * 从本地缓存中获取指定 key 对应的内容
     * @param name      存储的key
    */
    getStorageSync: function(name){
        return cache.getStorageSync(name)
    },
    /*
     * 从本地缓存中异步移除指定 key
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    removeStorage: function(name, success, fail, complete){
        cache.removeStorage({
            key:name,
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
     * 从本地缓存中移除指定 key
     * @param name      存储的key
    */
    removeStorageSync: function(name){
        return cache.removeStorageSync({key:name});
    },
    /*
     * 异步清空本地缓存
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    clearStorage: function(name, success, fail, complete){
        cache.clearStorage({
            key:name,
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
     * 清空本地缓存
    */
    clearStorageSync: function(){
        return cache.clearStorageSync();
    },
    /*
     * 异步判断本地缓存中是否存在指定 key 对应的内容
     * @param name      存储的key
     * @param success   成功回调
     * @param fail      失败回调
     * @param complete  完成回调
    */
    containStorage: function(name, success, fail, complete){
        cache.containsStorage({
            key:name,
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
     * 判断本地缓存中是否存在指定 key 对应的内容
     * @param name      存储的key
    */
    containStorageSync: function(name){
        return cache.containsStorageSync(name)
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
        bragent.start({
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
        bragent.onMemberId(memberId);
    },
    /*
     * 页面统计,进入，与onPageEnd成对出现
    */
    onPageStart: function(pageId, pageName){
        bragent.onPageStart({
            pageId:pageId,
            pageName:pageName
        });
    },
    /*
     * 页面统计,离开,与onPageStart成对出现
    */
    onPageEnd: function(pageId, pageName){
        bragent.onPageEnd({
            pageId:pageId,
            pageName:pageName
        });
    },
    /*
     * 事件统计
    */
    onEvent: function(pageId, pageName){
        bragent.onEvent({
            eventId:pageId,
            eventName:pageName
        });
    },
}