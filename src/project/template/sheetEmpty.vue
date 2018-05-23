<template>
	<sheetT title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" @listAdapter="getList" @baseAppear="appear">
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
        'list-item': require('../../components/tsl-list-item.vue'),
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

		},
        itemClick(index) {

        },
		getList() {

		},
	}
}
</script>