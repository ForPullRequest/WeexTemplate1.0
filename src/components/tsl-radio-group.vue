<template>
    <div class="container">
        <div v-for="(radio,index) in  radios" :index="index" class="div-container" @click="onRadioSelect">
            <image class="div-image" v-if="selectPosition==index" src="ico-radio-selected"></image>
            <image class="div-image" v-if="selectPosition!=index" src="ico-radio-unselect"></image>
            <text class="radio-text">{{radio.title}}</text>
        </div>
        <slot></slot>
    </div>
</template>
<style src="../css/tsl-radiogroup.css" lang="postcss">

</style>
<script>
    const modal = weex.requireModule('modal')
    const dom = weex.requireModule('dom')
    module.exports = {
        props: {
            isSelect:{
                default: true,
            },
            value:{
                default: 0,
            }
        },
        data(){
            return {
                radios: [],
                selectPosition: this.value,
                imagesrc:'ico-radio-selected',
                index:0,
            }
        },
        watch:{
            value(val){
                this.selectPosition = val
            },
        },
        methods: {
            onRadioSelect:function (val) {
                this.selectPosition = val.target.attr.index
                this.$emit('input', val.target.attr.index);
            },
            addPanes: function (item, name) {
                const index = this.$slots.default.indexOf(item.$vnode)
                this.radios.push({position: this.index, title: name})
            }
        },
    }
</script>