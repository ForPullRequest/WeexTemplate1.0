<!-- 
    本页以base为父类
    是带筛选条件的list页面的模板
 -->
<template>
    <base title="sheet" @baseAppear="onappear">
        <div class="under-line">
            <text class = "all-hospital" @click="hospitalClick">{{hosTxt}}</text><text class="arrow"> ▼</text>
            <text class = "line"></text>
            <text class = "all-hospital" @click="statusClick">{{statusTxt}}</text><text class="arrow"> ▼</text>
        </div>
        <div style="flex: 1">
            <tsl-refresh-list ref="mlist" :hasData="list.length!=0" :hasMore="page_no >= total_page" style="width: 750px;flex: 1" @mload="load" @mrefresh="refresh">
                <cell v-for="itemData, index in list" >
                    <listitem class="itemDiv" v-on:onclick="itemClick(index)">
                        <text class="item" :value="itemData"></text>
                    </listitem>
                </cell>
            </tsl-refresh-list>
            <sheet :showActionSheet="showSelect" :as_width=sheetWidth :as_height=sheetHeight :as_model="sheetModel" border_width='1' border_radius='18' @touchBg="actionSheet">
                <select-section :tag="tag" :list="selectList" :itemHeight="selectItemHeight"></select-section>
            </sheet>
        </div>
    </base>
</template>

<script>
const normal = require('../js/normal.js').normal;

export default {
    data:()=> ({
        page_no:1,
        page_size:10,
        statusTxt:'全部',
        hosTxt:'全部医院',
        statusList:['全部','未审批','待诊断','被退回','已诊断'],
        hosList:['全部医院','浙一','浙二','浙三'],
        list:['全部'],
        showSelect:false,
        selectList:[],
        tag:'',
        sheetModel:'bottom',
        sheetWidth:750,
        sheetHeight:580,
        selectItemHeight:100,
    }),
    components: {
        base: require('./base.vue'),
        'tsl-refresh-list':require('./UIRefreshList.vue'),
        'sheet':require('./UISheet.vue'),
        'select-section':require('./UISelectSection.vue'),
        listitem: require('./UIListItem.vue'),
    },
    created(){
        this.refresh();
        normal.registerAlert('cancelModal', function(e){
            this.actionSheet();
            if(e.tag=="选择医院"){
                this.hosTxt = this.hosList[e.index];
                this.list = [this.hosTxt+this.statusTxt];
                this.refresh();
            }else if(e.tag=="选择状态"){
                this.statusTxt = this.statusList[e.index];
                this.list = [this.hosTxt+this.statusTxt];
                this.refresh();
            }
        }.bind(this));
    },
    methods: {
        actionSheet(type) {
            this.sheetModel = type;
            this.showSelect = !this.showSelect;
        },
        onappear() {
            // this.refresh();
        },
        refresh() {
            this.getList(true);
        },
        load() {
            this.getList(false);
        },
        getList(isRefresh) {
            setTimeout(function() {
                if(isRefresh){
                    this.$refs.mlist.endRefresh();
                }else{
                    this.$refs.mlist.endLoad();
                }
            }.bind(this), 100);
        },
        hospitalClick() {
            this.selectList = this.hosList;
            this.tag = '选择医院';
            if(this.hosList.length >= 5){
                this.sheetHeight = 5 * this.selectItemHeight;
            }else{
                this.sheetHeight = this.hosList.length * this.selectItemHeight;
            }
            this.actionSheet('top');
        },
        statusClick() {
            this.selectList = this.statusList;
            this.tag = '选择状态';
            this.sheetHeight = this.statusList.length * this.selectItemHeight;
            this.actionSheet('top');
        },
    },
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
.all-hospital {
    margin-top: 20;
    flex: 1;
    margin-left: 20;
    height: 60;
    color: #999999;
    font-size: 28;
    text-align: center;
    lines: 1;
    text-overflow: end;
}
.arrow{
    margin-top: 20;
    margin-right: 20;
    color: #999999;
    font-size: 28;
    text-align: center;
}
.line {
    margin-top: 20;
    width: 1;
    height: 40;
    background-color: #999999;
}
.under-line {
    border-bottom-width: 1;
    border-bottom-color: #cccccc;
    flex-direction: row;
    background-color: white;
}
</style>
