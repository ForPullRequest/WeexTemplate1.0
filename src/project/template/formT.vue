<template>
    <div>
        <!-- text -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='text'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <text class="text" :style="{color:textareaColor,'text-align':isLeft?'left':'right','lines':'lines'}" :type="inputType" :value="inputValue"></text>
            </div>
        </list-item>
        <!-- input -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='input'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <input class="input" :style="{color:textareaColor,'text-align':isLeft?'left':'right'}" v-if="!isBelow" :type="inputType" :value="inputValue" @input="input" :placeholder="placeholder"></input>
            </div>
            <input class="input" v-if="isBelow" :style="{color:textareaColor,'text-align':isLeft?'left':'right'}" :type="inputType" :value="inputValue" @input="input" :placeholder="placeholder"></input>
        </list-item>
        <!-- textarea -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='textarea'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <textarea class="textarea" :style="{color:textareaColor}" v-if="!isBelow" :type="inputType" :value="inputValue" @input="input" :placeholder="placeholder"></textarea>
            </div>
            <textarea class="textarea" v-if="isBelow" :style="{color:textareaColor}" :type="inputType" :value="inputValue" @input="input" :placeholder="placeholder"></textarea>
        </list-item>
        <!-- 图片选择 -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='image'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="picBlock" v-for="item,index in list" :style="{'align-items':isLeft?'flex-start':'flex-end'}">
                    <image class="img-cancel" src="components/erase-normal"></image>
                    <image class="img" :src="item" @click="imgClick(index)"></image>
                </div>
                <div class="picBlock" :style="{'align-items':isLeft?'flex-start':'flex-end'}">
                    <image class="img" src="upload" @click="addPic()"></image>
                </div>
            </div>
        </list-item>
        <!-- 单选框 -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='radio'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="group" :style="">
                    <radio-group :selectImg="isCheck" :unselectImg="unCheck">
                        <div v-for="item in list">
                            <radio :label="item"></radio>
                        </div>
                    </radio-group>
                </div>
            </div>
        </list-item>
        <!-- 复选框 -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='checkbox'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="group">
                    <checkbox-group :selectImg="isCheck" :unselectImg="unCheck">
                        <div v-for="item in list">
                            <checkbox :label="item"></checkbox>
                        </div>
                    </checkbox-group>
                </div>
            </div>
        </list-item>
        <!-- 选择列表 -->
        <list-item class="itemDiv" :hasTouchStyle="true" v-if="type=='dropdown'">
            <div class="form">
                <text class="require" :style="{visibility:ifRequire?'visible':'hidden'}">*</text>
                <text class="title" :style="{color:textColor}" :value="title"></text>
                <div class="dropdowm-title" :style="{'text-align':isLeft?'left':'right'}" @click="dropDown">
                    <text class="dropdown-text">请选择</text>
                    <image class="icon-arrow" ref="arrowImg" src="arrow"></image>
                </div>
            </div>
            <dropdown ref="droList" :items="list" :textColor="textColor" class="dropdowm-list" tag="tag" @dd_itemClick="itemClick(2)"></dropdown>
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
                /*2:选择列表 image:图片选择 radio:单选框 checkbox:复选框*/
                type:'text',
                /*是否必填*/
                ifRequire:false,
                /*标题*/
                title:'',
                /*字体颜色*/
                textColor:'#5f5f5f',
                /*input文本*/
                inputValue:'',
                /*input占位符文本*/
                placeholder:'请输入内容',
                /*input类型，日期选择 data*/
                inputType:'text',
                /*textarea字体颜色*/
                textareaColor:'#999999', 
                /*false：输入框在右侧
                  ture： 输入框在下方*/
                isBelow:false,
                /*选中img*/
                isCheck:'',
                /*未选中img*/
                unCheck:'',
                /*是否靠左*/
                isLeft:false,
                lines:'',
                list:[]
            }
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
        inputValue(){
            return this.itemData.inputValue?this.itemData.inputValue:'';
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
            return this.itemData.lines?this.itemData.lines:'';
        },
        list(){
            return this.itemData.list?this.itemData.list:{};
        }
    },
    data:()=> ({
    }),
    created(){
    },
    methods:{
        input(e){
            this.$emit("formInput",{
                value:e.value,
                title:this.itemData.title,
            });
        },
        imgClick(index) {

        },
        addPic(){
            this.$emit('addPic');
        },
        dropDown(){
            /*normal.toast(132465);*/
            animation.rotate(this.$refs.arrowImg, 180, false);
            this.$refs.droList.switchView();
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
    margin-left: 10;
    margin-right: 10;
    margin-top: 20;
    font-size: 28;
    color: red;
}
.title {
    margin-top: 20;
    margin-bottom: 20;
    font-size: 28;
    max-width: 240;
}
.text {
    margin-top: 20;
    margin-left: 10;
    margin-bottom: 20;
    flex: 1;
    margin-right: 10;
    font-size: 28;
    text-overflow: ellipsis;
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
.textarea{
    margin-top: 10;
    margin-left: 10;
    height: 160;
    flex: 1;
    margin-right: 10;
    font-size: 26;
    padding: 5;
}
.img{
    width: 100;
    height: 100;
}
.picBlock{
    margin-top: 15;
    margin-bottom: 15;
    justify-content: center;
    margin-left: 30;
}
.group{
    justify-content: center;
    padding-left: 20;
}
.dropdown-text{
    color:#41484d;
    font-size: 32;
    align-self: center;
    width: 240;
    text-overflow: ellipsis;
    lines: 1;
    padding-left: 54;
    padding-right: 20;
    border-bottom-width: 2;
    border-style: solid;
    border-color: #ddd;
}
.icon-arrow{
    width: 18;
    height: 24;
    align-self: center;
    transform: rotate(1.6);
}
.dropdowm-title{
    flex:1;
    flex-direction:row;
    margin-top: 20;
    margin-left: 10;
}
.dropdowm-list{
    align-content: stretch;
    position: relative;
    z-index: 100;
}
</style>