<!-- 
    本页可以算作是base的demo，以base为父类
    但也是单list页面的模板
 -->
<template>
    <base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasMore="hasMore" @mload="load" @mrefresh="refresh">
            <!-- 通过slot将item布局外放 -->
            <slot></slot>
        </tsl-refresh-list>
    </base>
</template>

<script>
const normal = require('../js/normal.js').normal;

export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'list'},
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

        //第二部分是listT自有
        //用来控制“无数据页面”的显示和隐藏 通常为list.length!=0 因为listT不直接与list接触 所以由外部给
        hasData:        {default: 0},
        //用来控制是否能进行load操作 通常为pageNo >= totalPage（pageNo为当前的页码 totalPage为当前list的总页数）
        hasMore:        {default: true},
        //是否启用刷新控件
        hasRefresh:     {default: true},
        //是否启用加载控件
        hasLoad:        {default: true},
    },
    components: {
        'tsl-refresh-list': require('../../components/tsl-refresh-list.vue'),
        base: require('./base.vue'),
    },
    data:()=>({

    }),
    created(){
        
    },
    methods:{
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('listBack',{});
            }else{
                normal.back();
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("listAppear",{});
            this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('listDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('listRight',{});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('listTitle',{});
        },
        refresh() {
            this.getList(true, function(){
                this.$refs.mlist.endRefresh();
            }.bind(this));
        },
        load() {
            this.getList(false, function(){
                this.$refs.mlist.endLoad();
            }.bind(this));
        },
        getList(isRefresh, end){
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("listAdapter",{
                isRefresh:isRefresh,
                end:end
            });
        },
    },
}
</script>

<style>
.item {
    height: 88px;
    align-items: center;
}
.list{
    flex: 1;
}
.itemDiv{
    padding: 20;
}
</style>
