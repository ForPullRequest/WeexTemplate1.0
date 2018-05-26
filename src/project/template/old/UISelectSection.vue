<template>
<div class="dataDiv" onclick="empty" append = "node">
    <div class="upView" v-if="false">
        <text class="title">{{tag}}</text>
        <div v-if="false" class="cancelDiv" @click="cancel">
            <image class="cancelImg" src="ic_close"></image>
        </div>
    </div>
    <scroller :style="{height: scrollerHeight}">
        <div :style="{height: itemHeight}" v-for="item, index in list" :key="item">
            <text class="text" @click="itemClick(index)">{{item}}</text>
            <div class="line"></div>
        </div>
    </scroller>
</div>
</template>
<style>
.cancelDiv{
    width: 100;
    height: 100;
    justify-content: center;
    position: absolute;
    right: 0;
}
.line{
    height: 2;
    background-color: #f2f2f2
}
.dataDiv{
    width: 750;
    height: 580;
    background-color: white;
    border-radius: 6;
    border-width: 1;
    border-color: #F3F3F3;
}
.upView{
    flex-direction: row;
    height: 100;
    background-color: #FAFAFA;
    border-top-left-radius: 4.4;
    border-top-right-radius: 4.4;
}
.title{
    flex: 1;
    align-self: center;
    text-align: center;
    font-size: 32;
    color: #6C7880;
}
.cancelImg{
    align-self: center;
    width: 40px;
    height: 40px;
}
.text{
    padding-left: 40;
    padding-right: 40;
    padding-top: 30;
    padding-bottom: 30;
    text-overflow: ellipsis;
    font-size: 28;
    color:#41484d;
    lines:1;
}
</style>
<script>
const normal = require('./normal.js').normal;
export default {
    data:()=> ({
        list:[],
        tag:'',
    }),
    props:{
        tag:{
            default:''
        },
        list:{
            default:[]
        },
        itemHeight:{
            default:94
        },
        scrollerHeight:{
            default:94
        }
    },
    created() {
        // modal.alert({message:this.list.length});
    },
    methods: {
        empty:function(){

        },
        cancel:function(){
            normal.notify('cancelModal', {});
        },
        itemClick(index) {
            normal.notify('cancelModal', {tag:this.tag, item:this.list[index], index:index});
            // modal.toast({message:JSON.stringify(this.list[index])});
        },
    }
}
</script>