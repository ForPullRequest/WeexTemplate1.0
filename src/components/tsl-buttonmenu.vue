<template>
    <div class="container" :style="{backgroundColor:backgroundColor}">
        <scroller scroll-direction="horizontal"
                  class="scroll"
                  :style="{width:scrollwidth,justifyContent:horType}"
                  show-scrollbar="false">
            <div style="flex-direction: row;width: 750;">
                <div ref="list" v-for="item, index in items" :key="item.title" :style="{flex: isFlex?1:0,borderBottomWidth: getBottomWidth(index), }" class="textDiv" @click="itemClick(index)">
                    <text :style="{}" class="text">{{getText(item)}}</text>
                    <red-point v-if="item.badge&&item.badge!=0" class="redPoint" :badge="getBadge(item)"></red-point>
                </div>
            </div>
        </scroller>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<style>
    .container{
        flex-direction: row;
        width: 750px;
        background-color: white;
    }
    .scroll{
        align-items: center;
        height:80px;
        flex-direction: row;
        flex: 1;
    }
    .textDiv{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 15px;
        padding-bottom: 20px;
        border-bottom-color: #1D8CE0;
    }
    .text{
        font-size: 32px;
        max-width: 300;
        lines: 1;
        text-align: center;
        text-overflow: ellipsis;
    }
    .redPoint{
        margin-left: 10
    }
</style>
<script>
    const dom = weex.requireModule('dom')
    export default {
        components: {
            'red-point': require('./tsl-redpoint.vue'),
        },
        props: {
            isFlex:{
                default: false
            },
            backgroundColor:{
                default: 'white'
            },
            items:{
                default:[]
            },
            selectPosition:{
                default:0
            },
            horType:{
                default:'flex-start'
            },
        },
        data:()=>({
            scrollwidth:750,
        }),
        methods: {
            getWidth(index){
                return this.items[index]==undefined?'200':this.items[index].width
            },
            getBadge(item){
                return item == undefined ? '' : item.badge;
            },
            getText(item){
                return item == undefined ? '' : item.title;
            },
            getBottomWidth(index){
                return index == this.selectPosition ? 2 : 0;
            },
            itemClick: function (index) {
                if(index >= this.items.length){
                    return;
                }
                this.selectPosition = index;
                // dom.scrollToElement(this.$refs.list[index], {
                //     offset: -310,
                // })
                this.$emit('itemClick', index);
            },
            addPanes: function (item, name) {
                // const index = this.$slots.default.indexOf(item.$vnode)
                // this.items.push({posotion: index, title: name})
            }
        },
        created(){
            // normal.toast(this.items)
        }
    }
</script>