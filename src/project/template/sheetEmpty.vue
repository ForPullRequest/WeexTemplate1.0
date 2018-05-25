<template>
    <sheetT ref="list" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" @sheetAdapter="getList" @baseAppear="appear" @sheetClick="sheetClick">
        <cell v-for="item, index in list" >
            <list-item class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </list-item>
        </cell>
    </sheetT>
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
        sheetT: require('./sheetT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
        list:[],
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        itemClick(index) {

        },
        getList(sheetT) {
            if(listT.isRefresh){
                //刷新
            }else{
                //加载更多
            }
            listT.end();
        },
    }
}
</script>