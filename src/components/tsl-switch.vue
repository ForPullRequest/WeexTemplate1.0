<template>
    <div class="container" ref ='div'
         :style="{backgroundColor: onStaus ? '#dfdfdf':'#1D8CE0',justifyContent:defaultStatus ? 'flex-start':'flex-end',width:width , height:height}" @click="switchAnimation">
        <div ref="point"
             :style="{width:height , height:height}"
             class="round">
        </div>
    </div>
</template>
<style src="../css/tsl-switch.css" lang="postcss">
</style>
<script>
    const dom = weex.requireModule('dom')
    const modal = weex.requireModule('modal')
    const animation = weex.requireModule('animation')
    module.exports = {
        props: {
            value: {
                default: false,
            },
            width:{
                default: 80
            },
            height:{
                default: 46
            },
        },
        data(){
            return {
                onStaus: !this.value,
                isAnimationChange:false,
                defaultStatus:!this.value,
            }
        },
        methods: {
            switchAnimation: function () {
                var point = this.$refs.point;
                var trans = 'translate('+(this.defaultStatus?(this.width-this.height):-(this.width-this.height))+'px, 0px)'
                animation.transition(point, {
                    styles: {
                        transform:  this.isAnimationChange?'translate(0px, 0px)':trans,
                        transformOrigin: 'center center'
                    },
                    duration: 300, //ms
                    timingFunction: 'cubic-bezier(075, 0.5, 0.87, 0.95)',
                    delay: 0 //ms
                }, function () {
                    this.isAnimationChange=!this.isAnimationChange
                    this.onStaus = !this.onStaus;

                }.bind(this))
                this.$emit('input',this.onStaus);
            },

        },
    }
</script>