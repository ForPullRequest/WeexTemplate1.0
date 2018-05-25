<template>
    <tabListT ref="tabList" title="title" :items="tabs" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="getHasMore()" :isCenter="true" @tabListAdapter="getList" @tabListAppear="appear" @tabListPage="tabListPage">
        <cell v-for="itemData, index in list" :key="itemData">
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
        tabs:[{
            name: "tab1",
            isSelect: true,
        },{
            name: "tab2",
            isSelect: false,
        }],
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
        selectIndex:0,//当前选择的tab 为了HasMore
        isCache:false,
        // lastIndex:0,//上次显示的tab
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.tabList.refresh();
        },
        tabListPage(page) {
            this.selectIndex = page.selectIndex;
            //如果已在当前页又点击了当前页tab则返回，也可根据项目需求进行刷新
            if(page.selectIndex == page.lastIndex){
                return;
            }
            this.isCache = true;
            page.showData();
        },
        getHasMore() {
            return this.items[this.selectIndex].pageNo >= this.items[this.selectIndex].totalPage
        },
        getList(tabListT) {
            if(tabListT.isRefresh){//刷新
                //当缓存中有数据时且是通过tab取缓存
                if(this.isCache && this.items[this.selectIndex].list.length > 0){
                    this.isCache = false;
                    this.cache(tabListT);
                }else{
                    this.items[tabListT.selectIndex].pageNo = 1;
                    this.refresh(tabListT);
                }
            }else{//加载更多
                this.items[tabListT.selectIndex].pageNo++;
                this.load(tabListT);
            }
        },
        cache(tabListT) {
            normal.toast('cache' + tabListT.selectIndex)
            this.list = this.items[tabListT.selectIndex].list;
            tabListT.lastIndex = tabListT.selectIndex;
            tabListT.end();
        },
        refresh(tabListT) {
            normal.toast('refresh' + tabListT.selectIndex)
            //模拟数据获取
            setTimeout(function() {
                //赋值total
                this.items[tabListT.selectIndex].totalPage = 3;
                //赋值list
                this.list = [{
                    text:'text'+tabListT.selectIndex
                }];
                //赋值cache
                this.items[tabListT.selectIndex].list = this.list;
                //结束
                tabListT.end();
            }.bind(this), 1000);
        },
        load(tabListT) {
            normal.toast('load' + tabListT.selectIndex)
            //模拟数据获取
            setTimeout(function() {
                //赋值list 一般为list的concat操作
                this.list.push({
                    text:'empty'+tabListT.selectIndex,
                })
                //赋值cache
                this.items[tabListT.selectIndex].list = this.list;
                //结束
                tabListT.end();
            }.bind(this), 1000);
        }
    }
}
</script>