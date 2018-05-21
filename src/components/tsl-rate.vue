<template>
    <div class="conteiner">
        <image class="rate" ref="rateref" :index="n-1" v-for="n in 5"
               @touchstart="getTouchStartEvent"
               @touchend="getTouchEndEvent"
               :src="selectIndex>n-2?imageico:unimageico"></image>
    </div>
</template>
<style src="../css/tsl-rate.css" lang="postcss">
</style>
<script>
    const dom = weex.requireModule('dom')
    const animation = weex.requireModule('animation')
    module.exports = {
        props: {
            value:{
                default:0
            }
        },
        data(){
            return {
                isOn: this.isOn,
                selectIndex: this.value-1,
                imageico: 'rete-select',
                unimageico: 'rete-unselect'
            }
        },
        mounted() {
        },
        methods: {
            getTouchStartEvent: function (e) {
                var index = e.target.attr.index;
                this.switchAnimation(index, 'scale(1.5)', 300);
                this.selectIndex = index;
            },
            getTouchEndEvent: function (e) {
                this.switchAnimation(e.target.attr.index, 'scale(1)', 1000);
            },
            switchAnimation: function (index, scale, min) {
                var point = this.$refs.rateref[index];
                animation.transition(point, {
                    styles: {
                        transform: scale,
                        transformOrigin: 'center center'
                    },
                    duration: min, //ms
                    timingFunction: 'easy',
                    delay: 0 //ms
                }, function () {
                    this.isOn = !this.isOn;
                }.bind(this))
                this.$emit('input',this.selectIndex+1);
            },
        },
    }
</script>