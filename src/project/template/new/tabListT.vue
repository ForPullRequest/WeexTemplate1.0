<!-- 
    本页以base为父类
    是多个可切换标签的单list页面的模板
 -->
<template>
<div>
    <base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" :isIndex="isIndex" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
        <!-- 左侧类型的tab 可以滚动 -->
        <div style="flex-direction: row;" v-if="!isCenter">
            <tabpage :items="items" @touchPage="touchPage"></tabpage>
        </div>
        <!-- 中间类型的tab 不能滚动 -->
        <div style="flex-direction: row;width: 750;justify-content: center;" v-if="isCenter">
            <centerTabpage style="width: 750;" :items="items" @touchPage="touchPage"></centerTabpage>
        </div>
        <div style="flex: 1">
            <tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasMore="hasMore" @mload="load" @mrefresh="refresh">
                <!-- 通过slot将item布局外放 -->
                <slot></slot>
            </tsl-refresh-list>
        </div>
    </base>
</div>
</template>

<style>

.list{
    flex: 1;
}
</style>

<script>
const normal = require('./normal.js').normal;
export default{
    props:{
        //第一部分继承自base
        //页面的标题
        title:          {default: 'tabList'},
        //页面的标题颜色
        barTitleColor:  {default: '#333333'},
        //标题栏的返回图片
        backItemImage:  {default: 'back'},
        //标题栏的右侧文字
        rightItemText:  {default: ''},
        //标题栏的右侧图片
        rightItemImage: {default: ''},
        //是否自定义返回事件
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

        //第三部分继承自tabpage
        itemViewColor:      {type: String, default: '#FAFAFA'},
        itemViewHeight:     {type: String, default: '96'},
        itemTextFont:       {type: String, default: '34'},
        itemNormolColor:    {type: String, default: '#000000'},
        itemSelectColor:    {type: String, default: '#1c97fc'},
        //此处数据格式必须为 [{name: "value",isSelect: true/false,其他自定义属性}]
        items:              {type: Array,  default: []},

        //第四部分是自有的
        //是center还是左边开始的tab
        isCenter:        {default: false},
    },
    components: {
        base: require('./base.vue'),
        tabpage: require('./UITabPage.vue'),
        centerTabpage: require('./UICenterTabPage.vue'),
        'tsl-refresh-list': require('./UIRefreshList.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        selectIndex:0,
        lastIndex:0,
        isRefresh:false,
    }),
    created(){
        
    },
    methods:{
        //继承自base
        back(){
            if(this.customBack){
                //页面自定义退出事件
                this.$emit('tabListBack',{});
            }else{
                normal.back();
            }
        },
        appear() {
            //此处不处理refresh和listAppear的关系
            //而交由下级页面的listGet自行解决
            //页面显示事件
            this.$emit("tabListAppear",{});
            // this.refresh();
        },
        disappear() {
            //页面隐藏事件
            this.$emit('tabListDisappear',{});
        },
        right() {
            //右侧点击通用事件
            this.$emit('tabListRight',{});
        },
        titleClick(){
            //页面标题点击事件
            this.$emit('tabListTitle',{});
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
                    // this.selectIndex = page.index;
                    page.ui();
                    this.selectIndex = page.index;
                    this.$emit("tabListPage",{
                        selectIndex: page.index,
                        lastIndex: temp,
                        showData: showData,
                    });
                }
            }, 400)
        },
        //继承自list
        refresh() {
            this.getList(true, function(){
                this.isRefresh = false;
                this.$refs.mlist.endRefresh();
            }.bind(this));
        },
        load() {
            this.getList(false, function(){
                this.isRefresh = false;
                this.$refs.mlist.endLoad();
            }.bind(this));
        },
        getList(isRefresh, end){
            this.isRefresh = true;
            //列表数据源的获取 控件的end由下级页面控制
            this.$emit("tabListAdapter",{
                selectIndex: this.selectIndex,
                lastIndex: this.lastIndex,
                isRefresh: isRefresh,
                end: end
            });
        },
    }
}
</script>