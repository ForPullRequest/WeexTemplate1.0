<template>
    <div class="container" :style="{height:height+'px',
                                    width:width+'px',
                                    'border-radius':borderRadius+'px',
                                    'border-color':boardColor,
                                    'border-width':boardWidth}" @click="touchButton">
        <slot></slot>
    </div>
</template>

<style>
    .container {
        align-items: center;
        justify-content: center;
    }
</style>

<script>
    export default {
        components: {
            //import
        },
        props: {
            height:         {default:90},               //高度
            width:          {default:690},              //宽度
            boardColor:     {default:'#e2e2e2'},        //边框颜色
            boardWidth:     {default:0},                //边框宽度
            borderRadius:   {default:10},               //圆角
        },
        data: function () {
            return {

            }
        },
        methods: {
            //methods
            touchButton() {
                this.$emit("buttonAction",{})
            }
        },
        computed: {
            //get set
        }
    }
</script>