<template>
    <div class="container">
        <div v-for="(checkbox,index) in  checkboxs" :index="index" class="div-container" @click="onCheckboxSelect">
            <image class="div-image" v-if="checkbox.selected" src="ico-radio-selected"></image>
            <image  class="div-image" v-if="!checkbox.selected" src="ico-radio-unselect"></image>
            <text class="radio-text">{{checkbox.title}}</text>
        </div>
        <slot></slot>
    </div>
</template>
<style src="../css/tsl-checkboxgroup.css" lang="postcss"></style>
<script>
    const dom = weex.requireModule('dom')
    module.exports = {
        props: {
            value:{
                default: [],
            }
        },
        data(){
            return {
                checkboxs: [],
                chcklists: this.value,
            }
        },
        methods: {
            onCheckboxSelect:function (val) {
                var index = val.target.attr.index;
                for(var i=0;i<this.checkboxs.length;i++){
                    if(index==i){
                        this.checkboxs[i].selected=!this.checkboxs[i].selected
                    }
                }
                this.$emit('input', this.getEmitData());
            },
            getEmitData:function () {
                var data = []
                for(var i=0;i<this.checkboxs.length;i++){
                    if(this.checkboxs[i].selected){ data.push(i);}

                }
                return data;
            },
            addPanes: function (item, name) {
                const index = this.$slots.default.indexOf(item.$vnode);
                this.checkboxs.push({title: name,selected:this.chcklists[index]==index?true:false});
            }
        },
    }
</script>