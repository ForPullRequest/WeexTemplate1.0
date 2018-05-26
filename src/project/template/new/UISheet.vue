<template>
    <div v-if="showActionSheet" class="content" @click="touchView">
        <div v-if="asModel=='bottom'" class="common_type">
            <div ref="view_actionsheet_ref"
                 class="botton_actionsheet"
                 :style="{'background-color':asBackground, height:asHeight+'px', bottom: -asHeight+'px', 'border-color':borderColor, 'border-top-left-radius':borderRadius, 'border-top-right-radius':borderRadius, 'border-width':borderWidth}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="asModel=='top'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="top_actionsheet"
                 :style="{'background-color':asBackground, height:asHeight+'px', top: -asHeight+'px', 'border-color':borderColor, 'border-bottom-left-radius':borderRadius, 'border-bottom-right-radius':borderRadius, 'border-width':borderWidth}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="asModel=='left'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="left_actionsheet"
                 :style="{'background-color':asBackground, height:asHeight+'px', width:asWidth+'px', left: -asWidth+'px', 'border-color':borderColor, 'border-top-right-radius':borderRadius, 'border-bottom-right-radius':borderRadius, 'border-width':borderWidth}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="asModel=='right'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="right_actionsheet"
                 :style="{'background-color':asBackground, height:asHeight+'px', width:asWidth+'px',right: -asWidth+'px', 'border-color':borderColor, 'border-top-left-radius':borderRadius, 'border-bottom-left-radius':borderRadius, 'border-width':borderWidth}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style>
    .content {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background-color: RGBA(0, 0, 0, 0.3);
        align-items: center;
        justify-content: center;
    }
    .common_type {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }
    .botton_actionsheet {
        position: absolute;
        left: 0px;
        right: 0px;
    }
    .top_actionsheet {
        position: absolute;
        left: 0px;
        right: 0px;
    }
    .left_actionsheet {
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }
    .right_actionsheet {
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }
</style>

<script>
    const animation = require('./alert-anim').animation;
    export default {
        components: {

        },
        props: {
            showActionSheet:{default:false},
            asBackground:  {default:'white'},
            asWidth:       {default:500},       //左右显示时宽度
            asHeight:      {default:500},       //上下显示时高度
            asModel:       {default:'top'},     //top bottom left right
            borderRadius:  {default:0},
            borderColor:   {default:'#F3F3F3'},
            borderWidth:   {default:0},
        },
        computed: {
            isShowActionSheet() {
                setTimeout(function () {
                    //执行动画
                    this.animationToShow();
                }.bind(this),10);
                return this.showActionSheet;
            }
        },
        data:()=> ({

        }),
        methods: {
            touchView() {
                this.$emit('touchBg',{});
            },
            touchActionSheet() {

            },
            animationToShow() {
                var view_ref        = this.$refs.view_actionsheet_ref;  //组件引用
                var view_distance   = 0;          //移动距离
                 if (this.asModel === 'bottom' || this.asModel === 'top') {
                     view_distance = this.asHeight;
                 }  else if (this.asModel === 'left' || this.asModel === 'right'){
                     view_distance = this.asWidth;
                 }
                animation.animation_actionSheet(view_ref,this.asModel,view_distance,function () {
                    
                });
            }
        },
        created() {

        }
    }
</script>