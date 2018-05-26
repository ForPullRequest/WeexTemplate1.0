<template>
    <base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :isIndex="isIndex" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <columnview :selectColor="selectColorCol" :unSelectColor="unSelectColorCol" :titleSize="titleSizeCol" :selectTitleColor="selectTitleColorCol" :unSelectTitleColor="unSelectTitleColorCol" :borderLeftWidth="borderLeftWidthCol" :borderLeftColor="borderLeftColorCol" :items="items" :leftColumnWidth="leftColumnWidthCol" @touchPage="touchPage">
            <!-- myWidth必须要填 为了iOS中的显示问题 -->
            <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasMore="hasMore" :myWidth="750-leftColumnWidthCol" @mload="load" @mrefresh="refresh">
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
const normal = require('./normal.js').normal;
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
        items:            { default: [] },
        //左列表宽度
        leftColumnWidthCol: { default: 250 },
        //已选背景色
        selectColorCol:        { default: '#ffffff' },
        //未选背景色
        unSelectColorCol:      { default: '#f5f5f5' },
        //标题字号
        titleSizeCol:          { default: '36' },
        //已选标题颜色
        selectTitleColorCol:   { default: '#333333' },
        //未选标题颜色
        unSelectTitleColorCol: { default: '#8f8f8f' },
        //已选标记宽度
        borderLeftWidthCol:    { default: '1' },
        //已选标记颜色
        borderLeftColorCol:    { default: '#1c98fc' },
    },
    data:()=> ({
        // //主列表数据集
        // list:[],
        selectIndex:0,//columnView的index
        lastIndex:0,
        isRefresh:false,
    }),
    components: {
        base: require('./base.vue'),
        columnview: require('./UIColumnView.vue'),
        'tsl-refresh-list': require('./UIRefreshList.vue'),
    },
    methods: {
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('columnBack',{});
            }else{
                normal.back();
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("columnAppear",{});
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('columnDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('columnRight',{});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('columnTitle',{});
        },
        //继承自tab
        touchPage(page){
            var showData = function(){
                this.refresh();
            }.bind(this);
            
            setTimeout(() => {
                if(this.isRefresh){
                    normal.toast('正在获取数据中..')
                    return;
                }else{
                    let temp = this.selectIndex;
                    this.lastIndex = temp;
                    page.ui();
                    this.selectIndex = page.index;
                    this.$emit("columnPage",{
                        selectIndex: page.index,
                        lastIndex: temp,
                        showData: showData,
                    });
                }
            }, 400)
        },
        //继承自column
        load() {
            this.getList(false, function(){
                this.isRefresh = false;
                this.$refs.mlist.endLoad();
            }.bind(this));
        },
        refresh(){
            this.getList(true, function(){
                this.isRefresh = false;
                this.$refs.mlist.endRefresh();
            }.bind(this));
        },
        getList(isRefresh, end){
            this.isRefresh = true;
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("columnAdapter",{
                selectIndex:this.selectIndex,
                isRefresh:isRefresh,
                end:end
            });
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