<template>
	<columnT ref="column" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" :items="items" :columnList="deptList" @columnAdapter="getList" @columnAppear="appear">
		<cell v-for="itemData, index in list" :key="itemData">
            <list-item class="itemDiv" v-on:onclick="itemClick(index)">
                <text class="text">{{itemData}}</text>
            </list-item>
        </cell>
	</columnT>
</template>

<style>

.itemDiv{
    flex-direction: column;
}
</style>

<script>
const normal = require('../js/normal.js').normal;
export default{
	components: {
        columnT: require('./columnT.vue'),
        'list-item': require('../../components/tsl-list-item.vue'),
	},
	data:()=>({
        pageNo:1,
        totalPage:1,
        deptList: [],
        //cache数据集
        items:[{
            title:'',
            list:[],
            page_no:1,
            total_page:1,
        }],
        list:[],
	}),
	created(){
		
	},
	methods:{
		appear() {
			this.getDeptList();
		},
        itemClick(index) {

        },
        getDeptList() {
        	this.deptList = ['呼吸科','内科1','内科2'];
        	this.$refs.column.refresh();
        },
        getList(columnT) {//columnT.selectIndex
            //模拟数据获取
            setTimeout(function() {
                if(columnT.isRefresh){//刷新
		            // //保证index final
		            // var index = this.selectIndex;
		            // //如果存在于缓存内且不为主动刷新则取缓存
		            // if(isTrueRefresh==false && this.items[index].list.length!=0){
		            //     normal.toast('cache'+index);
		            //     this.list = this.items[index].list;
		            //     this.$refs.mlist.endRefresh();
		            // }else{
		            //     this.items[index].page_no = 1;
		            //     //模拟正常网络
		            //     setTimeout(function () {
		            //         if(this.selectIndex!=index){
		            //             this.items[index].list = [index + '呼吸科','内科1','内科2','内科3','内科4','内科5','内科6','内科7','内科8','内科9'];
		            //             // normal.alert(normal.json(this.items[index].list));
		            //             this.$refs.mlist.endRefresh();
		            //             return;
		            //         }
		            //         normal.toast('net'+index);
		            //         this.items[index].list = [index + '呼吸科','内科1','内科2','内科3','内科4','内科5','内科6','内科7','内科8','内科9'];
		            //         this.list = this.items[index].list;
		            //         this.$refs.mlist.endRefresh();
		            //     }.bind(this), 500);
		            // }
                    this.items = [{
                                title:'呼吸科',
                                list:[],
                                page_no:1,
                                total_page:1,
                            },{
                                title:'内科1',
                                list:[],
                                page_no:1,
                                total_page:2,
                            },{
                                title:'内科2',
                                list:[],
                                page_no:1,
                                total_page:3,
                            }];
                }else{//加载更多
                    // //保证index final
		            // var index = this.selectIndex;
		            // //模拟正常网络
		            // setTimeout(function () {
		            //     this.items[index].page_no++;
		            //     if(this.selectIndex!=index){
		            //         this.items[index].list.push('儿科'+index);
		            //         // normal.alert(normal.json(this.items[index].list));
		            //         this.$refs.mlist.endLoad();
		            //         return;
		            //     }
		            //     this.items[index].list.push('儿科'+index);
		            //     this.$refs.mlist.endLoad();
		            // }.bind(this), 500);
                }
                //结束
                columnT.end();
            }.bind(this), 500);
        },
	}
}
</script>