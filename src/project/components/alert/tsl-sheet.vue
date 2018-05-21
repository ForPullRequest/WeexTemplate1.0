<template>
    <div v-if="showActionSheet" class="content" @click="touchView">
        <div v-if="as_model=='bottom'" class="common_type">
            <div ref="view_actionsheet_ref"
                 class="botton_actionsheet"
                 :style="{'background-color':as_background, height:as_height+'px', bottom: -as_height+'px', 'border-color':border_color, 'border-top-left-radius':border_radius, 'border-top-right-radius':border_radius, 'border-width':border_width}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="as_model=='top'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="top_actionsheet"
                 :style="{'background-color':as_background, height:as_height+'px', top: -as_height+'px', 'border-color':border_color, 'border-bottom-left-radius':border_radius, 'border-bottom-right-radius':border_radius, 'border-width':border_width}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="as_model=='left'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="left_actionsheet"
                 :style="{'background-color':as_background, width:as_width+'px', left: -as_width+'px', 'border-color':border_color, 'border-top-right-radius':border_radius, 'border-bottom-right-radius':border_radius, 'border-width':border_width}"
                 v-if="isShowActionSheet"
                 @click="touchActionSheet">
                <slot></slot>
            </div>
        </div>

        <div v-if="as_model=='right'"  class="common_type">
            <div ref="view_actionsheet_ref"
                 class="right_actionsheet"
                 :style="{'background-color':as_background, width:as_width+'px',right: -as_width+'px', 'border-color':border_color, 'border-top-left-radius':border_radius, 'border-bottom-left-radius':border_radius, 'border-width':border_width}"
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
            as_background:  {default:'white'},
            as_width:       {default:500},       //左右显示时宽度
            as_height:      {default:500},       //上下显示时高度
            as_model:       {default:'top'},     //top bottom left right
            border_radius:  {default:0},
            border_color:   {default:'#F3F3F3'},
            border_width:   {default:0},
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
                 if (this.as_model === 'bottom' || this.as_model === 'top') {
                     view_distance = this.as_height;
                 }  else if (this.as_model === 'left' || this.as_model === 'right'){
                     view_distance = this.as_width;
                 }
                animation.animation_actionSheet(view_ref,this.as_model,view_distance,function () {
                    
                });
            }
        },
        created() {

        }
    }
</script>