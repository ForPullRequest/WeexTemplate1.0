<template>
    <div class="container">
        <div v-for="(checkbox,index) in  checkboxs" :index="index" class="div-container" @click="onCheckboxSelect">
            <image class="div-image" v-if="checkbox.selected" :src="selectImg"></image>
            <image  class="div-image" v-if="!checkbox.selected" :src="unselectImg"></image>
            <text class="radio-text">{{checkbox.title}}</text>
        </div>
        <slot></slot>
    </div>
</template>
<style>
.container{
    flex-direction: row;
}

.div-container{
    margin: 20px;
    flex-direction: row;
}

.div-image{
    width: 40px;
    height: 40px;
}

.radio-text{
    font-size:28;
    color: #666666;
    margin-left: 10px;
    align-self: center;
}
</style>
<script>
    const dom = weex.requireModule('dom')
    module.exports = {
        props: {
            checkboxs:{
                default: [],
            },
            value:{
                default: [],
            },
            selectImg:{
                default:'',
            },
            unselectImg:{
                default:'',
            }
        },
        data(){
            return {
                // checkboxs: [],
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