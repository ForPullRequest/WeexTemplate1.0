<tsl-navpage background-color="{{backgroundColor}}" right-item-src="contact-detail-ico4" title="tsl-components" onviewappear="viewappear">
    <tsl-listview editstyle="delete" canmove="{{canMove}}" onmove="{{moveCell}}" action="{{actions}}" onaction="{{actionHandle}}">
        <tsl-cell repeat="{{list}}">
            <tsl-list-item class="item">
                <div class="alignItem" index={{$index}} onclick="itemClick">
                    <text class="title">{{title}}</text>
                </div>
            </tsl-list-item>
        </tsl-cell>
    </tsl-listview>
</tsl-navpage>

tsl-navpage控件中有个<content></content>，控件中没有用到，意味着navpage两个标签中可以放入内容
<tsl-listview>、<tsl-cell>、<tls-list-item>组成了一个listview，<tsl-cell>指定数据源<tsl-list-item>中包裹着item的布局

<indicator>必须为<slider>的子组件，height决定了距离底部的高度，而不是控件高度。item-size决定了控件高度，平板一般为8，手机一般为20。

<tsl-listview>在<scroller>中如果初始时被初始化了上半部分，则下半部分永远不会显示

<tsl-navbar>如果background-color="white"，在平板上有白色沉浸式状态栏

<scroller scroll-direction="horizontal" style="flex:1;flex-direction:row;" show-scrollbar="false">

在css文件中 用@import "../../style/base.css";引入基准文件，用"var({name})"来引用 如：font-size: var(--s6);

在自定义控件开发中要想居中：
垂直居中
.tabbar {
    flex-direction: column;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    width: 51;
}
水平居中
.tabbar {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50;
}

flex-wrap: wrap;类似wrap_content

跳转界面require('@weex-module/navigator').push({url:[doc_name]},function () {});

各模块的调用 js:
require('../../components/tsl-input.we');
require('../../components/tsl-button.we');
var loginRequest = require('../js/api.js').request;
var navigator = require('@weex-module/navigator');
var cache = require('@weex-module/TSLCache');
var utility = require('@weex-module/TSLUtility');
var modal = require('@weex-module/modal');
var IM = require('../js/IM.js');
css:
@import "../../style/base.css";
@import "../../style/layout.css";

var utility
__weex_define__('@weex-temp/x', function (__weex_require__) {
    utility = __weex_require__('@weex-module/TSLUtility')
});

api.js中exports.request为文件主入口 其他的函数只是供其调用

text-overflow: ellipsis;lines:1

text-align={{gravity}}

tsl-tabmenu的bar-height为栏的高度item-width为下划线的宽度line-height为下划线高度

tsl-ver-tabbar因searchbar唤起软键盘而压缩的解决在于把position的absolute改成relative

本地图片的引用 注意使用图片必须设置width和height不然不显示

用flex:1的方式设置高度、宽度全屏

凡是对data中数据(需要双向绑定)进行初始化处理的，必须写在ready中而不是created中

<tsl-input>需被包裹在<div>中

需要规范的内容
字体大小
比例大小
颜色
线


var m = require('@weex-module/modal');
m.alert({message: 'msg'}, function () {
    console.log("hkq" + " ing");
});
m.toast({message: '修改性别发生错误'});

var modal = require('@weex-module/TSLModal');
modal.alert({
    src: 'select-trans',
    width: 690,
    height: 700
});

注册监听：
this.$dispatch('work-detail.collect',{
    isCollect:flag,
    fromWhich:this.fromWhich,
    index:this.mIndex});

接受监听
this.$on('work-detail.collect', function (e) {
    //e.detail.fromWhich/isCollect/index
});

发送通知：
var container = require('@weex-module/TSLContainer');
container.notify('work-detail.collect', {
    isCollect:flag,
    fromWhich:this.fromWhich,
    index:this.mIndex,
});

接送通知：
var modal = require('@weex-module/TSLModal');
modal.registerAlert('work-detail.collect', function (e) {
    //e.itemData, e.index, e.fromWhich
}.bind(this));

接送通知：
modal.registerAlert('my-list-item.itemClick', function (e) {
    this.select(e.itemData, e.index, e.fromWhich);
}.bind(this));

关闭弹窗
modal.closeAlert(function () {})

存取缓存
var cache = require('@weex-module/TSLCache');
cache.save(resp.ret_data, 'userInfo', function () {
    navigator.push({url: 'index'}, function () {});
});
cache.getValue('userInfo', function (ret) {
    modal.alert({message: JSON.stringify(ret.val)});
}.bind(this));
cache.remove('userInfo', function{}())

JSON.stringify()

cache.getValue('userInfo', function (ret) {
    modal.alert({message: ret.val.Token}, function(){});
}.bind(this));

this.timer = setTimeout(function () {
}.bind(this), this.timeout);
cleartimer(this.timer);

想要title居中
text：align-self: center;
container：justify-content: center;

console.log("hkq" + JSON.stringify());

tsl-input 需要去掉padding让用户自己加

//关闭软键盘
require('@weex-module/TSLUtility').closeKeyboard();

// modal.alert({message: item.name}, function () {});

flex-wrap:wrap用于解决gridview




###Vue
在template中的双向绑定时，使用model.name进行绑定，在iOS中会失败，如v-if，v-for