<template>
  <div class="form">
      <text class="require" v-if="ifRequire">*</text>
      <text class="name" :style="{color:textColor}">性别:</text>
      <div style="flex-wrap:wrap;flex-direction:row;" v-for="item,index in list" @click="checkClick(index)">
          <image class="img" :src="src(item.isSelected)"></image>
          <text class="name" :value="item.name"></text>
      </div>
  </div>
</template>

<script>
const normal = require('../js/normal.js').normal;
export default {
    data:()=> ({
        ifRequire:true,
        textColor:'#5f5f5f',
        ifRadio:true,
    }),
    methods:{
        src(e){
            return e?'user/ico-radio-selected':'user/ico-radio-selected-gray';
        },
        checkClick(index){
            var tmp = [];
            if (this.ifRadio) {
                for (var item in this.list) {
                    if (item == index) {
                        this.list[item].isSelected = true;
                    } else {
                        this.list[item].isSelected = false;
                    }
                    tmp = tmp.concat(this.list[item]);
                }
            } else {
                this.list[index].isSelected = !this.list[index].isSelected;
                tmp = this.list;
            }

            this.$emit("form4",{list:tmp});
        },
    },
    props:{'ifRequire':{default:true},'textColor':{default:'#5f5f5f'},'ifRadio':{default:true}, 'list':{default:[]}},
}
</script>

<style>
    .img {
        width: 40;
        height: 40;
        margin-left: 30;
        margin-top: 20;
        margin-bottom: 10;
    }
    .form {
        flex-direction:row;
        height:80;
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
        margin-left: 10;
    }
</style>
