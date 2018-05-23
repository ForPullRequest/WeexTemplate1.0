<template>
    <base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :isIndex="isIndex" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <columnview :items="columnList" :leftSelectionWidth="250" :borderLeftWidth="4" @itemSelect="itemSelect">
            <!-- myWidth必须要填 为了iOS中的显示问题 -->
            <tsl-refresh-list class="list white" ref="mlist" :hasData="hasData" :hasMore="items[selectIndex].page_no >= items[selectIndex].total_page" :myWidth="500" @mload="load" @mrefresh="refresh">
                <!-- <cell v-for="itemData, index in list" :key="itemData">
                    <listitem class="itemDiv" v-on:onclick="itemClick(index)">
                        <text class="text">{{itemData}}</text>
                    </listitem>
                </cell> -->
                <slot></slot>
            </tsl-refresh-list>
        </columnview>
    </base>
</template>
<script>
const normal = require('../js/normal.js').normal;
export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'column'},
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

        //第三部分来自于columnview
        //左列表数据
        columnList:       {default: []},
        //cache数据集
        items:          {default: [{
                                        title:'',
                                        list:[],
                                        page_no:1,
                                        total_page:1,
                                    }]},
    },
    data:()=> ({
        // //主列表数据集
        // list:[],
        selectIndex:0,//columnView的index
    }),
    components: {
        base: require('./base.vue'),
        columnview: require('../../components/tsl-columnview.vue'),
        'tsl-refresh-list': require('../../components/tsl-refresh-list.vue'),
    },
    methods: {
        appear(){
            // this.refresh(true);
            this.$emit("columnAppear",{});
        },
        itemSelect:function (val) {
            //保证load.refresh正常赋值 第二次点击不干扰第一次的赋值结果
            if(this.selectIndex!=val){
                setTimeout(function () {
                    this.selectIndex = val;
                    // this.refresh(false);
                }.bind(this), 500);
            }
        },
        load() {
            this.getList(false, function(){
                this.$refs.mlist.endLoad();
            }.bind(this));
        },
        refresh(){
            this.getList(true, function(){
                this.$refs.mlist.endRefresh();
            }.bind(this));
        },
        getList(isRefresh, end){
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("columnAdapter",{
                selectIndex:this.selectIndex,
                isRefresh:isRefresh,
                end:end
            }.bind(this));
        },
    },
    created: function () {
    }
}
</script>

<style>
.row{
    flex-direction: row;    
}
.column{
    flex-direction: column;
}
.jcCenter{
    justify-content: center;
}
.aiCenter{
    align-items: center;
}
.flex{
    flex: 1;
}
.red{
    background-color:red; 
}
.yellow{
    background-color:yellow; 
}
.white{
    background-color: white;
}
.line{
    background-color: #e5e5e5;
    height: 1;
    width: 750;
}

.text {
    font-size: 36;
    align-self: center;
}
.list{
    flex: 1;
}
.itemDiv{
    padding: 20;
}
</style>