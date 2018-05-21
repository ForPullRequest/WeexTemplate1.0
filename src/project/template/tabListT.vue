<template>
	<base :backItemImage="backItemImage" :barTitleColor="barTitleColor" :title="title" :rightItemText="rightItemText" :rightItemImage="rightItemImage" @baseAppear="appear" @baseBack="back" @baseTitle="titleClick" @baseRight="right" @baseDisappear="disappear">
		<div style="flex-direction: row;">
			<tabpage :items="items" @touchPage="touchPage"></tabpage>
		</div>
		<div style="flex: 1">
			<tsl-refresh-list :hasLoad="hasLoad" :hasRefresh="hasRefresh" class="list" ref="mlist" :hasData="hasData" :hasMore="hasMore" @mload="load" @mrefresh="refresh">
	            <!-- 通过slot将item布局外放 -->
				<slot></slot>
	            <!-- <cell>
		            <list-item class="itemDiv" @onclick="itemClick(index)" @longpress="longpress(index)">
		                <text class="item" :value="selectIndex"></text>
		            </list-item>
		        </cell> -->
	        </tsl-refresh-list>
		</div>
	</base>
</template>

<style>

.list{
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
</style>

<script>
const normal = require('../js/normal.js').normal;
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
		itemViewColor: 	    {type: String, default: '#FAFAFA'},
		itemViewHeight: 	{type: String, default: '96'},
		itemTextFont: 		{type: String, default: '34'},
		itemNormolColor: 	{type: String, default: '#000000'},
		itemSelectColor: 	{type: String, default: '#1c97fc'},
		//此处数据格式必须为 [{name: "value",isSelect: true/false,其他自定义属性}]
		items: 				{type: Array,  default: []}
    },
	components: {
        base: require('./base.vue'),
        tabpage: require('./UITabPage.vue'),
        'tsl-refresh-list': require('../../components/tsl-refresh-list.vue'),
        'list-item': require('../../components/tsl-list-item.vue'),
	},
	data:()=>({
		selectIndex:0,
	}),
	created(){
		
	},
	methods:{
		touchPage(e){
			this.selectIndex = e.index;
			this.$emit("tabPageTouch",{
                index:e.index
            });
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
            this.$emit("tabListAdapter",{
                isRefresh:isRefresh,
                end:end
            });
        },
	}
}
</script>