<!-- 
    本页可以算作是listT的demo
 -->
<template>
	<listT ref="list" title="index" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" @listAdapter="getList" @listAppear="appear">
		<cell v-for="itemData, index in list" >
            <list-item class="itemDiv" @onclick="itemClick(index)" @longpress="longpress(index)">
                <text class="item" :value="itemData.text"></text>
            </list-item>
        </cell>
	</listT>
</template>
<script>
const normal = require('../js/normal.js').normal;
export default {
    components: {
        listT: require('./listT.vue'),
        'list-item': require('../../components/tsl-list-item.vue'),
    },
    data:()=> ({
        pageNo:1,
        totalPage:1,
        list:[],
    }),
    created(){
        
    },
    methods: {
        getList(listT){
            //模拟数据获取
            setTimeout(function() {
                if(listT.isRefresh){//刷新
                    this.pageNo = 1;
                    this.totalPage = 3;
                    this.list = [{
                        text:'base【推荐使用】',
                        src:'template/base'
                    },{
                        text:'list【推荐使用】',
                        src:'template/listT'
                    },{
                        text:'tabList【推荐使用】',//TODO 使用UITabPage
                        src:'template/tabListT'
                    },{
                        text:'tabbar【推荐借鉴】',//太简易 不需要template
                        src:'template/tabbarT'
                    },{
                        text:'form【推荐借鉴】',//TODO 可以直接拿list续写
                        src:'template/formT'
                    },{
                        text:'sheet【推荐借鉴】',//TODO
                        src:'template/sheetT'
                    },{
                        text:'column【推荐借鉴】',//TODO
                        src:'template/columnT'
                    },{
                        text:'empty(只用于复制粘贴)',
                        src:'template/empty'
                    },{
                        text:'baseEmpty(如何使用base，只用于复制粘贴)',
                        src:'template/baseEmpty'
                    },{
                        text:'listEmpty(如何使用base，只用于复制粘贴)',
                        src:'template/listEmpty'
                    }];
                }else{//加载更多
                    this.pageNo += this.pageNo;
                    this.list.push({
                        text:'empty',
                        src:'template/empty'
                    })
                }
                //结束
                listT.end();
            }.bind(this), 500);
        },
        appear(){

        },
        itemClick(index) {
            // normal.toast(this.list[index]);
            normal.push({src:this.list[index].src})
        },
        longpress(index) {
        	normal.toast(this.list[index].src);
        }
    }
}
</script>
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