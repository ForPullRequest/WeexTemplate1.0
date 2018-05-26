<template>
    <columnT ref="column" title="title" :items="items" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="getHasMore()" borderLeftWidthCol="4" @columnAdapter="getList" @columnAppear="appear" @columnPage="columnPage">
        <cell v-for="itemData, index in list" :key="itemData">
            <list-item class="itemDiv" @onclick="itemClick(index)">
                <text class="item">{{itemData.text}}</text>
            </list-item>
        </cell>
    </columnT>
</template>

<style>

.itemDiv{
    flex-direction: column;
}
.item {
    height: 88px;
    align-items: center;
    font-size: 32
}
</style>

<script>
const normal = require('./normal.js').normal;
export default{
    components: {
        columnT: require('./columnT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
        //cache数据集
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
        list:[],
        selectIndex:0,
        isCache:false,
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.getDeptList();
        },
        getHasMore() {
            return this.items[this.selectIndex].pageNo >= this.items[this.selectIndex].totalPage
        },
        itemClick(index) {
            normal.toast(index)
        },
        getDeptList() {
            //模拟数据获取
            setTimeout(function() {
                this.$refs.column.refresh();
            }.bind(this), 300);
        },
        columnPage(page) {
            this.selectIndex = page.selectIndex;
            //如果已在当前页又点击了当前页tab则返回，也可根据项目需求进行刷新
            if(page.selectIndex == page.lastIndex){
                return;
            }
            this.isCache = true;
            page.showData();
        },
        getList(columnT) {//columnT.selectIndex
            if(columnT.isRefresh){//刷新
                //当缓存中有数据时且
                if(this.isCache && this.items[this.selectIndex].list.length > 0){
                    this.isCache = false;
                    this.cache(columnT);
                }else{
                    this.items[columnT.selectIndex].pageNo = 1;
                    this.refresh(columnT);
                }
            }else{//加载更多
                this.items[columnT.selectIndex].pageNo++;
                this.load(columnT);
            }
        },
        cache(columnT) {
            normal.toast('cache' + columnT.selectIndex)
            this.list = this.items[columnT.selectIndex].list;
            columnT.lastIndex = columnT.selectIndex;
            columnT.end();
        },
        refresh(columnT) {
            normal.toast('refresh' + columnT.selectIndex)
            //模拟数据获取
            setTimeout(function() {
                //赋值total
                this.items[columnT.selectIndex].totalPage = 3;
                //赋值list
                this.list = [{
                    text:'text'+columnT.selectIndex
                }];
                //赋值cache
                this.items[columnT.selectIndex].list = this.list;
                //结束
                columnT.end();
            }.bind(this), 1000);
        },
        load(columnT) {
            normal.toast('load' + columnT.selectIndex)
            //模拟数据获取
            setTimeout(function() {
                //赋值list 一般为list的concat操作
                this.list.push({
                    text:'empty'+columnT.selectIndex,
                })
                //赋值cache
                this.items[columnT.selectIndex].list = this.list;
                //结束
                columnT.end();
            }.bind(this), 1000);
        }
    }
}
</script>