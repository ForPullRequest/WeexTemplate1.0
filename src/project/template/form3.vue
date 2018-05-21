<template>
  <div class="form">
      <text class="require" v-if="ifRequire">*</text>
      <text class="name" :style="{color:textColor}" value="上传图片:"></text>
      <div style="flex-direction:row;min-height: 100;flex-wrap: wrap;flex:1;">
          <div class="picBlock" v-for="item,index in list">
              <image class="img" :src="item" @click="imgClick(index)"></image>
          </div>
      </div>
  </div>
</template>

<script>
const normal = require('../js/normal.js').normal;

export default {
    data:()=> ({
        ifRequire:true,
        textColor:'#5f5f5f',
        list:['upload'],
    }),
    methods:{
        imgClick(index) {
            if (index == 0) {
                normal.imagePicker(9,function(e){
                    this.$emit("form3",e);
                    this.list = this.list.concat(e);
                }.bind(this));
            } else {

            }

        },
    },
    props:{'ifRequire':{default :true},'textColor':{default :'#5f5f5f'}, 'index':{default : 0}},
}
</script>

<style>
    .picBlock{
        margin-top: 15;
        margin-bottom: 15;
        align-items: center;
        justify-content: center;
        margin-left: 30;
    }
    .img {
        width: 100;
        height: 100;
    }
    .form {
        flex-direction:row;
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
        color:#5f5f5f;
        height: 40;
        font-size: 28;
    }
</style>
