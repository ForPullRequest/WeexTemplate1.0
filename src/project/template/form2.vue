<template>
    <div class="form">
        <div class="title">
            <text class="require" v-if="ifRequire">*</text>
            <text class="name" :style="{color:textColor}" :value="itemData.name"></text>

        </div>
        <textarea :style="{color:textareaColor,height:textareaHeight}" class="content" :placeholder="placeholder" :value="inputValue" @input="input"></textarea>
    </div>

</template>

<script>
const normal = require('../js/normal.js').normal;
export default {
    data:()=> ({
        inputValue:'',
        ifRequire:true,
        placeholder:'请输入内容',
        type:'text',
        textColor:'#5f5f5f',
        textareaColor:'#999999',
        textareaHeight:'160',

    }),
    methods:{
        input(e){
            this.$emit("form2",{name:e.value,title:this.itemData.name});
        },
    },
    props:{'ifRequire':{default:true},'textColor':{default:'#5f5f5f'},'inputValue':{default:''},
    'placeholder':{default:'请输入内容'},'type':{default:'text'},'textareaColor':{default:'#999999'},'textareaHeight':{default:'160'},'itemData':{default:{}}},
}
</script>

<style>
    .title {
        flex-direction:row;
    }
    .form {
        flex-direction:column;
        backgroundColor:white;
        border-bottom-color: #e9e9e9;
        border-bottom-width: 1;
    }
    .require {
        margin-left: 10;
        color: red;
        width: 20;
        height: 40;
        margin-top: 30;
        font-size: 28;
    }
    .name {
        margin-top: 20;
        height: 40;
        font-size: 28;
    }
    .content {
        padding-left: 20;
        padding-right: 20;
        color: #666666;
        font-size: 26;
        margin-bottom: 10;
    }
</style>
