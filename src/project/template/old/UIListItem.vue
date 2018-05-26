<template>
    <div :index="index"
         @touchstart="touchstart"
         @touchend="touchend"
         @touchcancel="touchcancel"
         @longpress = "longpress"
         @click="click"
         :style="{ backgroundColor: touched&&hasTouchStyle?highlightedColor:(selected?selectedColor:backgroundColor), borderBottomWidth: seprationHidden?0:1, borderBottomColor: seprationColor }">
        <slot></slot>
    </div>
</template>
<script>
    // let modal = weex.requireModule('modal');
    module.exports = {
        props: {
            seprationHidden:{
                type: Boolean,
                default: false,
            },
            keepmarginleft:{
                type: Boolean,
                default: false,
            },
            hasTouchStyle:{
                type: Boolean,
                default: true,
            },
            seprationColor:{
                default: '#e2e2e2'
            },
            highlightedColor:{
                default: '#e2e2e2'
            },
            selectedColor:{
                default: '#e2e2e2'
            },
            backgroundColor:{
                default: 'white'
            },
        },
        data:()=> ({
            index: '',
//                seprationHidden: false,
            touched: false,
            selectEnable: false,
            selected: false
        }),
        methods: {
            touchstart: function () {
                this.touched = true;
                if (this.selectEnable) {
                    this.selected = true;
                }
            },
            touchend: function () {
                this.touched = false;
            },
            touchcancel: function () {
                this.touched = false;
            },
            deSelect: function () {
                this.selected = false;
            },
            click:function () {
                this.$emit("onclick")
            },
            longpress:function () {
                this.$emit("longpress")
            },
            select: function () {
                if (this.selectEnable) {
                    this.selected = true;
                } else {
                    console.error('please set selectEnable true');
                }
            }
        }
    }


</script>


