<template>
	<tabListT ref="tabList" title="title" :items="items" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="getHasMore()" :isCenter="false" @tabListAdapter="getList" @tabListAppear="appear" @tabListPage="tabListPage">
		<cell v-for="itemData, index in list">
            <list-item class="itemDiv" @onclick="itemClick(index)" @longpress="longpress(index)">
                <text class="item" :value="itemData.text"></text>
            </list-item>
        </cell>
	</tabListT>
</template>

<style>

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
	components: {
        tabListT: require('./tabListT.vue'),
	},
	data:()=>({
		items:[{
			name: "tab1",
			isSelect: true,
			list: [],
			pageNo: 1,
			pageSize: 10,
			totalPage: 1,
		},{
			name: "tab2",
			isSelect: false,
			list: [],
			pageNo: 1,
			pageSize: 10,
			totalPage: 1,
		}],
		list:[],//只用于显示
		selectIndex:0,//当前选择的tab
		lastIndex:0,//上次显示的tab
	}),
	created(){
		
	},
	methods:{
		appear() {
			this.$refs.tabList.refresh();
		},
		tabListPage(e) {
			let temp = this.selectIndex;
			this.lastIndex = temp;
			this.selectIndex = e.index;
		},
		getHasMore() {
			// normal.alert(this.items[this.selectIndex].pageNo+'==='+this.items[this.selectIndex].totalPage)
			return this.items[this.selectIndex].pageNo >= this.items[this.selectIndex].totalPage
		},
		getList(tabListT) {
                if(tabListT.isRefresh){//刷新
                	// normal.alert(this.lastIndex+'/'+tabListT.index)
                	if(this.lastIndex == tabListT.index){//如果点击的和上次选择的一样纯粹刷新
                		this.refresh(tabListT);
                	}else{
                		this.refresh(tabListT);
                		this.lastIndex = this.selectIndex;
                	}
                }else{//加载更多
                    this.items[this.selectIndex].pageNo++;
                    this.load(tabListT);
                }
		},
		refresh(tabListT) {
			//调用看是否能调用items[tabListT.index].list 不能再刷新
    		if(this.items[tabListT.index].list.length>0){
				normal.toast('cache' + this.selectIndex)
    			this.list = this.items[tabListT.index].list;
                tabListT.end();
    		}else{//纯粹刷新
				normal.toast('refresh' + this.selectIndex)
    			//模拟数据获取
	            setTimeout(function() {
		            this.items[this.selectIndex].pageNo = 1;
		            this.items[this.selectIndex].totalPage = 3;
		            this.list = [{
		            	text:'text'+tabListT.index
		            }];
		            this.items[this.selectIndex].list = this.list;
	                //结束
	                tabListT.end();
	            }.bind(this), 1500);
    		}
		},
		load(tabListT) {
			normal.toast('load' + this.selectIndex)
			setTimeout(function() {
                this.list.push({
                    text:'empty'+tabListT.index,
                })
	            this.items[this.selectIndex].list = this.list;
                //结束
                tabListT.end();
            }.bind(this), 1500);
		}
	}
}
</script>