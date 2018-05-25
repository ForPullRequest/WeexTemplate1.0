<!-- 
    type: text, input, textarea, image, radio, checkbox, dropdown
 -->
<template>
    <div>
        <!-- text -->
        <list-item class="itemDiv" v-if="type=='text'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <text class="text" :style="{color:textareaColor,'text-align':isLeft?'left':'right','lines':lines}" :type="inputType" :value="textValue"></text>
            </div>
        </list-item>
        <!-- input -->
        <list-item class="itemDiv" v-if="type=='input'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <input class="input" :style="{color:textareaColor,'text-align':isLeft?'left':'right'}" v-if="!isBelow" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
            </div>
            <input class="input" v-if="isBelow" :style="{color:textareaColor,'text-align':isLeft?'left':'right'}" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
        </list-item>
        <!-- textarea -->
        <list-item class="itemDiv" v-if="type=='textarea'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <textarea class="textarea" :style="{color:textareaColor}" v-if="!isBelow" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></textarea>
            </div>
            <textarea class="textarea" v-if="isBelow" :style="{color:textareaColor}" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></textarea>
        </list-item>
        <!-- 图片选择 -->
        <list-item class="itemDiv" v-if="type=='image'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="group"><!--  :style="{'justify-content':isLeft?'flex-start':'flex-end'}" -->
                    <div class="picBlock" v-for="item,index in list" >
                        <div @click="imgClick(index)">
                            <image class="img" :src="item"></image>
                        </div>
                        <div class="img-cancel" style="width:42;height:42;padding:6;" @click="imgCancel(index)" v-if="canCancel">
                            <image class="img-cancel" src="components/erase-normal"></image>
                        </div>
                    </div>
                    <div class="picBlock" @click="addPic(index)">
                        <image class="img" src="upload"></image>
                    </div>
                </div>
            </div>
        </list-item>
        <!-- 单选框 -->
        <list-item class="itemDiv" v-if="type=='radio'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                    <radio-group :selectImg="isCheck" :unselectImg="unCheck" :value="selectRadio" @input="radioSelect">
                        <div v-for="item in list">
                            <radio :label="item"></radio>
                        </div>
                    </radio-group>
                </div>
            </div>
        </list-item>
        <!-- 复选框 -->
        <list-item class="itemDiv" v-if="type=='checkbox'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                    <checkbox-group :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" @input="checkSelect">
                        <!-- <div v-for="item in list">
                            <checkbox :label="item"></checkbox>
                        </div> -->
                    </checkbox-group>
                </div>
            </div>
        </list-item>
        <!-- 选择列表 -->
        <list-item class="itemDiv" v-if="type=='dropdown'">
            <div class="form" style="justify-content:space-between">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="dropdowm-title" @click="dropDown" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                    <text class="dropdown-text">{{textValue}}</text>
                    <image class="icon-arrow" ref="arrowImg" src="arrow"></image>
                </div>
            </div>
            <dropdown ref="dropdownList" :items="list" :textColor="textColor" class="dropdowm-list" tag="tag" @dd_itemClick="itemClick"></dropdown>
        </list-item>
    </div>
</template>

<script>
var animation = require('./animation.js').animation;
const normal = require('../js/normal.js').normal;
export default {
    props:{
        'itemData':{
            default:{
                index:0,
                //dropdown:选择列表 image:图片选择 radio:单选框 checkbox:复选框
                type:'text',
                //是否必填
                ifRequire:false,
                //标题
                title:'',
                //字体颜色
                textColor:'#5f5f5f',
                //text文本
                textValue:'',
                //input占位符文本
                placeholder:'请输入内容',
                //input类型，日期选择 data
                inputType:'text',
                //textarea字体颜色
                textareaColor:'#999999', 
                //false：输入框在右侧
                //ture： 输入框在下方
                isBelow:false,
                //选中img
                isCheck:'',
                //未选中img
                unCheck:'',
                //是否靠左
                isLeft:false,
                //类型为text时文本内容最大行数
                lines:3,
                //图片是否可删除
                canCancel:false,
                list:[],
                model:[],
            },
        },
    },
    computed: {
        type(){
            return this.itemData.type?this.itemData.type:'text';
        },
        ifRequire() {
            return this.itemData.ifRequire?this.itemData.ifRequire:false;
        },
        title(){
            this.getOutPut();
            return this.itemData.title?this.itemData.title:'';
        },
        textColor(){
            return this.itemData.textColor?this.itemData.textColor:'#5f5f5f';
        },
        textareaColor(){
            return this.itemData.textColor?this.itemData.textColor:'#999999';
        },
        placeholder(){
            return this.itemData.placeholder?this.itemData.placeholder:'请输入内容';
        },
        textValue(){
            return this.itemData.textValue?this.itemData.textValue:'';
        },
        inputType(){
            return this.itemData.inputType?this.itemData.inputType:'text';
        },
        isBelow(){
            return this.itemData.isBelow?this.itemData.isBelow:false;
        },
        isCheck(){
            return this.itemData.isCheck?this.itemData.isCheck:'';
        },
        unCheck(){
            return this.itemData.unCheck?this.itemData.unCheck:'';
        },
        isLeft(){
            return this.itemData.isLeft?this.itemData.isLeft:false;
        },
        lines(){
            return this.itemData.lines?this.itemData.lines:3;
        },
        canCancel(){
            return this.itemData.canCancel?this.itemData.canCancel:false;
        },
        list(){
            return this.itemData.list?this.itemData.list:{};
        }
    },
    watch: {
        selectRadio(val){
            this.getOutPut();
        },
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        output:'',
        selectRadio:0,
        selectCheck:[],
    }),
    created(){
    },
    methods:{
        checkSelect(val){
            this.selectCheck = val;
        },
        radioSelect(val){
            this.selectRadio = val;
        },
        getOutPut(){
            let output = '';
            //text, input, textarea, image, radio, checkbox, dropdown
            switch(this.itemData.type){
                case 'text':
                    output = this.itemData.textValue;
                break;
                case 'input':
                    output = this.itemData.textValue;
                break;
                case 'textarea':
                    output = this.itemData.textValue;
                break;
                case 'image':
                    output = this.itemData.textValue;
                break;
                case 'radio':
                    if(this.selectRadio==-1){
                        output = '';
                    }else{
                        output = this.list[this.selectRadio];
                    }
                break;
                case 'checkbox':
                    let check = [];
                    for (var i = 0; i < this.selectCheck.length; i++) {
                        check.push({
                            text:this.list[this.selectCheck[i]].title,
                            code:this.selectCheck[i]
                        })
                    }
                    output = check;
                break;
                case 'dropdown':
                    output = this.itemData.textValue;
                break;
            }
            this.$emit('getOutPut', {
                output:output?output:'',
                index:this.itemData.index,
            });
        },
        input(e){
            this.output = e.value;
            this.itemData.textValue=e.value;
            this.$emit("formInput",{
                value:e.value,
                title:this.itemData.title,
            });
        },
        imgClick(index) {
            this.$emit('imgClick', {
                titile:this.itemData.title,
                index:index,
            });
        },
        imgCancel(index){
            this.$emit('imgCancel', {
                titile:this.itemData.title,
                index:index,
            });
        },
        addPic(index){
            this.$emit('addPic', {
                title:this.itemData.title,
            });
        },
        itemClick(index){
            this.dropDown();
            this.itemData.textValue=this.list[index].name,
            this.$emit('ddItemClick', {
                title:this.itemData.title,
                model:this.list[index],
            });
        },
        dropDown(){
            this.$refs.dropdownList.switchView();
        },
    },
    components:{
        'list-item': require('./UIListItem.vue'),
        radioGroup: require('./UIRadioGroup.vue'),
        radio: require('./UIRadio.vue'),
        checkboxGroup: require('./UICheckboxGroup.vue'),
        checkbox: require('./UICheckbox.vue'),
        dropdown:require('./UIDropdown.vue'),
    }
}
</script>

<style>
.itemDiv{
    flex-direction: column;
    border-bottom-color: #e9e9e9;
    border-bottom-width: 1;
}
.form {
    flex-direction:row;
    background-color:white;
}
.require {
    margin-top: 20;
    margin-bottom: 20;
    margin-left: 20;
    margin-right: 10;
    font-size: 28;
    color: red;
}
.title {
    margin-top: 20;
    margin-bottom: 20;
    font-size: 28;
    width: 140;
}
.text {
    margin-top: 20;
    margin-bottom: 20;
    margin-left: 20;
    margin-right: 20;
    flex: 1;
    font-size: 28;
    text-overflow: ellipsis;
}
.input {
    margin-top: 10;
    margin-bottom: 10;
    margin-left: 20;
    margin-right: 20;
    height: 60;
    flex: 1;
    font-size: 26;
    padding: 5;
}
.textarea{
    margin-top: 10;
    margin-bottom: 10;
    margin-left: 20;
    margin-right: 20;
    padding: 5;
    height: 160;
    flex: 1;
    font-size: 26;
}
.img-cancel{
    width: 30;
    height: 30;
    position: absolute;
    right: 0;
    top: 0;
}
.img{
    width: 100;
    height: 100;
    padding: 5;
}
.picBlock{
    margin-top: 15;
    margin-bottom: 15;
    margin-left: 15;
    margin-right: 15;
    justify-content: center;
}
.group{
    flex: 1;
    flex-direction:row;
    padding-left: 10;
    padding-right: 10;
}
.dropdown-text{
    color:#41484d;
    font-size: 32;
    text-align: center;
    width: 240;
    text-overflow: ellipsis;
    lines: 1;
}
.icon-arrow{
    width: 18;
    height: 24;
    align-self: center;
    transform: rotate(90deg);
    margin-left: 20;
    margin-right: 20;
}
.dropdowm-title{
    flex:1;
    flex-direction:row;
    margin-top: 20;
    margin-bottom: 20;
    margin-left: 20;
    margin-right: 20;
}
.dropdowm-list{
    align-content: stretch;
    position: relative;
    z-index: 100;
}
</style>