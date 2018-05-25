<!-- 
    本页以base为父类
    是带筛选条件的list页面的模板
 -->
<template>
    <base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :isIndex="isIndex" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <div class="under-line">
            <div style="flex-direction: row;flex: 1;" v-for="item,index in items">
                <text class = "sheetTitle" @click="sheetClick(item,index)">{{item.text}}</text><text class="arrow"> ▼</text>
                <text class = "line"></text>
            </div>
        </div>
        <div style="flex: 1">
            <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasMore="hasMore" @mload="load" @mrefresh="refresh">
                <slot></slot>
            </tsl-refresh-list>
            <sheet :showActionSheet="showSelect" :as_width=sheetWidth :as_height=sheetHeight :as_model="sheetModel" border_width='1' border_radius='sheetBorderRadius' @touchBg="actionSheet">
                <!-- <slot name="section"></slot> -->
                <select-section :tag="tag" :list="sheetList" :itemHeight="sheetItemHeight"></select-section>
            </sheet>
        </div>
    </base>
</template>

<script>
const normal = require('../js/normal.js').normal;

export default {
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'sheet'},
        //页面的标题颜色
        barTitleColor:  {default: '#333333'},
        //标题栏的返回图片
        backItemImage:  {default: 'back'},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //是否自定义返回事件 配合事件listBack
        customBack:     {default: false},
        //用于在iOS中进行appear问题的修复
        isIndex:        {default: false},

        //第二部分是listT自有
        //用来控制“无数据页面”的显示和隐藏 通常为list.length!=0 因为listT不直接与list接触 所以由外部给
        hasData:        {default: 0},
        //用来控制是否能进行load操作 通常为pageNo >= totalPage（pageNo为当前的页码 totalPage为当前list的总页数）
        hasMore:        {default: true},
        //是否启用刷新控件
        hasRefresh:     {default: true},
        //是否启用加载控件
        hasLoad:        {default: true},

        //第三部分来自自身
        //sheet显示的位置 top bottom left right
        sheetModel:        {default: 'top'},
        //sheet的底部左右的圆角
        sheetBorderRadius: {default: 18},
        //sheet的最大显示数量
        maxShowNum:        {default: 5},
        //sheet的显示高度
        sheetHeight:       {default: 580},
        //sheet单项的高度
        sheetItemHeight:   {default: 100},
    },
    components: {
        base: require('./base.vue'),
        'tsl-refresh-list':require('./UIRefreshList.vue'),
        'sheet':require('./UISheet.vue'),
        'select-section':require('./UISelectSection.vue'),
    },
    data:()=> ({
        items:[{
            tag:'status',
            text:'全部',
            list:['全部','未审批','待诊断','被退回','已诊断','未审批','待诊断','被退回','已诊断','未审批','待诊断','被退回','已诊断'],
        },{
            tag:'hospital',
            text:'全部医院',
            list:['全部医院','浙一','浙二','浙三'],
        }],
        showSelect:false,//内部
        sheetList:[],//内部
        tag:'',//内部
        sheetWidth:750,//定死
        sheetIndex:0,//内部
        // sheetModel:'top',//放出 
        // sheetBorderRadius:'18',//放出
        // maxShowNum:5,//放出
        // sheetHeight:580,//放出
        // selectItemHeight:100,//放出
    }),
    created(){
        this.refresh();
        normal.registerAlert('cancelModal', function(e){
            this.actionSheet();
            //e.tag用来区别是哪个sheet
            //e.index用来区别点击了哪一项
            this.sheetFinish(e.tag, e.index);
            this.refresh();
        }.bind(this));
    },
    methods: {
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('sheetBack',{});
            }else{
                normal.back();
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("sheetAppear",{});
            //显示刷新事件 谁用谁管 不逾矩
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('sheetDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('sheetRight',{});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('sheetTitle',{});
        },
        //用于sheet
        sheetFinish(tag, index) {
            this.items[this.sheetIndex].text = this.items[this.sheetIndex].list[index];
        },
        sheetClick(item,index) {
            this.sheetIndex = index;
            //sheet样式
            this.sheetList = item.list;
            this.tag = item.tag;
            if(this.sheetList.length >= this.maxShowNum){
                this.sheetHeight = this.maxShowNum * this.selectItemHeight;
            }else{
                this.sheetHeight = this.sheetList.length * this.selectItemHeight;
            }

            this.actionSheet();
        },
        actionSheet() {
            this.showSelect = !this.showSelect;
        },
        //继承自list
        refresh() {
            this.getList(true, function(){
                this.$refs.mlist.endRefresh();
            }.bind(this));
            // this.getList(true);
        },
        load() {
            this.getList(false, function(){
                this.$refs.mlist.endLoad();
            }.bind(this));
            // this.getList(false);
        },
        getList(isRefresh, end){
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("sheetAdapter",{
                isRefresh:isRefresh,
                end:end
            });
        },
    },
}
</script>

<style>
.list{
    width: 750px;
    flex: 1;
}
.itemDiv{
    padding: 20;
}
.item {
    height: 88px;
    align-items: center;
    font-size: 32
}
.sheetTitle {
    margin-top: 20;
    flex: 1;
    margin-left: 20;
    height: 60;
    color: #999999;
    font-size: 28;
    text-align: center;
    lines: 1;
    text-overflow: end;
}
.arrow{
    margin-top: 20;
    margin-right: 20;
    color: #999999;
    font-size: 28;
    text-align: center;
}
.line {
    margin-top: 20;
    width: 1;
    height: 40;
    background-color: #999999;
}
.under-line {
    border-bottom-width: 1;
    border-bottom-color: #cccccc;
    flex-direction: row;
    background-color: white;
}
</style>
