<template>
  <div class="form">
      <text class="require" v-if="ifRequire">*</text>
      <text class="name" :style="{color:textColor}" :value="itemData.name"></text>
      <input class="input" :style="{color:textareaColor}" :type="type" :value="inputValue" @input="input" :placeholder="placeholder"></input>
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
    }),
    methods:{
        input(e){
            this.$emit("form1",{name:e.value,title:this.itemData.name});

        },
    },
    props:{'ifRequire':{default:true},'textColor':{default:'#5f5f5f'},'inputValue':{default:''},
    'placeholder':{default:'请输入内容'},'type':{default:'text'},'textareaColor':{default:'#999999'}, 'itemData':{default:{}}},
}
</script>

<style>
    .form {
        flex-direction:row;
        height:80;
        backgroundColor:white;
        justify-content: space-between;
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
    .input {
        margin-top: 10;
        margin-left: 10;
        height: 60;
        flex: 1;
        margin-right: 10;
        font-size: 26;
        padding: 5;
    }
</style>
