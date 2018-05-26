<template>
    <div>
        <list v-if="hasData" id="list">
            <!-- 当myWidth不写时 在column的场景中refresh和load在iOS会出问题 -->
            <page-refresh :style="{width:myWidth}" v-if="hasRefresh" ref="pageR" :refreshstatus="refreshliststatus" v-on:onrefresh="refresh"></page-refresh>
                <slot></slot>
            <page-load :style="{width:myWidth}" v-if="hasLoad" :loadstatus="loadliststatus" :nomoreload="hasMore" v-on:onload="load"></page-load>
        </list>
        <div v-if="!hasData" class="frame center" @click="refresh">
            <!-- <image style="flex: 1;position: absolute;top: 0;bottom: 0;left: 0;right: 0;" src="back_detail_no_content"></image> -->
            <image class="noContentImg" :src="noContentImg"></image>
            <text class="noContentTxt">{{noContentTxt}}</text>
        </div>
    </div>
</template>
<style>
.frame{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.center{
    justify-content: center;
    align-items: center;
}
.noContentImg{
    height: 220;
    width: 340;
}
.noContentTxt{
    margin-top: 60;
    font-size: 32;
    color: #41484d
}
</style>
<script>
    const animation = weex.requireModule('animation');
    module.exports = {
        props: {
            hasMore:{
                default:false
            },
            hasData:{
                default:true
            },
            hasRefresh:{
                default:true
            },
            hasLoad:{
                default:true
            },
            noContentImg:{
                default:'components/ic_no_content'
            },
            noContentTxt:{
                default:'暂无数据'
            },
            myWidth:{
                default:750
            }
        },
        data(){
            return {
                refreshliststatus: 0,
                loadliststatus: false,
            }
        },
        components: {
            pageRefresh: require('./UIRefresh.vue'),
            pageLoad: require('./UILoad.vue'),
        },
        methods: {
            refresh: function (val) {
                var self = this;
                this.refreshliststatus = val;
                setTimeout(() => {
                    self.$emit('mrefresh');
                }, 200)
            },
            load:function (val) {
                var self = this;
                this.loadliststatus = true;
                setTimeout(() => {
                    if(!this.hasMore){
                        self.$emit('mload');
                    }else{
                        self.loadliststatus = false;
                    }
                }, 400)
            },
            endLoad:function(){
                this.loadliststatus = false;
            },
            endRefresh:function(){
                if(this.$refs.pageR){
                    this.$refs.pageR.endRefresh();
                }
            },
        },
        created(){
            
        }
    }
</script>


