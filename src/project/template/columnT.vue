<template>
    <base title="column" @baseAppear="onappear">
    <!-- <navpage backItemImage="back" barTitleColor="#333333" title="远程病理" @viewWillAppear="onappear"> -->
        <columnview :items="deptList" :leftSelectionWidth="240" :borderLeftWidth="4" v-on:itemSelect="onitemclick">
            <tsl-refresh-list class="list white" ref="mlist" :hasData="list.length!=0" :hasMore="items[index].page_no >= items[index].total_page" @mload="load" @mrefresh="refresh">
                <cell v-for="itemData, index in list" :key="itemData">
                    <listitem class="itemDiv" v-on:onclick="itemClick(index)">
                        <text class="text">{{itemData}}</text>
                    </listitem>
                </cell>
            </tsl-refresh-list>
        </columnview>
    <!-- </navpage> -->
    </base>
</template>
<script>
    const normal = require('../js/normal.js').normal;
    export default{
        data:()=> ({
            //左列表数据
            deptList: ['呼吸科','内科1','内科2'],
            //cache数据集
            items:[{
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
            }],
            //主列表数据集
            list:[],
            index:0,//columnView的index
        }),
        components: {
            base: require('./base.vue'),
            // navpage: require('../components/UINavgationBar.vue'),
            columnview: require('../../components/tsl-columnview.vue'),
            listitem: require('../../components/tsl-list-item.vue'),
            'tsl-refresh-list': require('../../components/tsl-refresh-list.vue'),
        },
        methods: {
            onappear(){
                this.refresh(true);
            },
            itemClick(index){
                normal.toast(this.index+'itemClick'+this.list[index]);
            },
            onitemclick:function (val) {
                //保证load.refresh正常赋值 第二次点击不干扰第一次的赋值结果
                if(this.index!=val){
                    setTimeout(function () {
                        this.index = val;
                        this.refresh(false);
                    }.bind(this), 500);
                }
            },
            load() {
                //保证index final
                var index = this.index;
                //模拟正常网络
                setTimeout(function () {
                    this.items[index].page_no++;
                    if(this.index!=index){
                        this.items[index].list.push('儿科'+index);
                        // normal.alert(normal.json(this.items[index].list));
                        this.$refs.mlist.endLoad();
                        return;
                    }
                    this.items[index].list.push('儿科'+index);
                    this.$refs.mlist.endLoad();
                }.bind(this), 500);
            },
            refresh(isTrueRefresh){
                //保证index final
                var index = this.index;
                //如果存在于缓存内且不为主动刷新则取缓存
                if(isTrueRefresh==false && this.items[index].list.length!=0){
                    normal.toast('cache'+index);
                    this.list = this.items[index].list;
                    this.$refs.mlist.endRefresh();
                }else{
                    this.items[index].page_no = 1;
                    //模拟正常网络
                    setTimeout(function () {
                        if(this.index!=index){
                            this.items[index].list = [index + '呼吸科','内科1','内科2','内科3','内科4','内科5','内科6','内科7','内科8','内科9'];
                            // normal.alert(normal.json(this.items[index].list));
                            this.$refs.mlist.endRefresh();
                            return;
                        }
                        normal.toast('net'+index);
                        this.items[index].list = [index + '呼吸科','内科1','内科2','内科3','内科4','内科5','内科6','内科7','内科8','内科9'];
                        this.list = this.items[index].list;
                        this.$refs.mlist.endRefresh();
                    }.bind(this), 500);
                }
            }
        },
        created: function () {
        }
    }
</script>

<style>
.row{
    flex-direction: row;    
}
.column{
    flex-direction: column;
}
.jcCenter{
    justify-content: center;
}
.aiCenter{
    align-items: center;
}
.flex{
    flex: 1;
}
.red{
    background-color:red; 
}
.yellow{
    background-color:yellow; 
}
.white{
    background-color: white;
}
.line{
    background-color: #e5e5e5;
    height: 1;
    width: 750;
}

.text {
    font-size: 36;
    align-self: center;
}
.list{
    flex: 1;
}
.itemDiv{
    padding: 20;
}
</style>