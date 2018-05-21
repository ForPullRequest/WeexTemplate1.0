<template>
    <div v-if="showAlert" class="content" :style="{'padding-left':alert_left, 'padding-top':alert_top, 'padding-right':alert_right, 'padding-bottom':alert_bottom}" @click="touchView">
        <div :ref="view_alert_ref"
             class="alert"
             :style="{'background-color':alert_background, width:alert_width+'px', height:alert_height+'px'}"
             v-if="isShowAlert"
             @click="touchAlert">
            <div style="flex: 1;align-items: center">
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
    .alert {
        border-radius: 10px;
    }
</style>

<script>
    const animation = require('./alert-anim').animation;

    export default {
        components: {
            current_scale: 1
        },
        props: {
            showAlert:              {defalt:false},                 //提示框背景是否显示
            view_alert_ref:         {default:'alert_view_ref'},     //提示框引用
            alert_width:            {default:570},
            alert_height:           {default:300},
            alert_background:       {default:'white'},
            alert_top:              {default:0},
            alert_bottom:           {default:0},
            alert_left:             {default:0},
            alert_right:            {default:0},
        },
        computed: {
            isShowAlert() {
                //提示框显示
                setTimeout(function () {
                    this.animationToShowAlert();
                }.bind(this),50);
                return this.showAlert;
            },
        },
        data:()=> ({

        }),
        methods: {
            touchView() {
                this.$emit('touchBg',{});
            },
            touchAlert() {
                console.log("animation alert");
            },
            animationToShowAlert() {
                animation.animation_alert(this.$refs.alert_view_ref,function () {
                    console.log("动画结束" + this);
                }.bind(this));
            }
        },
        created() {

        }
    }
</script>