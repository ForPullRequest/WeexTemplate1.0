<template>
    <listT ref="list" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" @listAdapter="getList" @listAppear="appear">
        <cell v-for="item, index in list" >
            <list-item class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </list-item>
        </cell>
    </listT>
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
        listT: require('./listT.vue'),
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
        getList() {
            
        },
    }
}
</script>