<template>
    <div>
        <div style="flex-direction:row; align-items: center; border-bottom-width: 1; border-bottom-color: #eeeeee;background-color:#ffffff" :style="{paddingTop: paddingTop, height: navBarHeight}">
            <div style="flex-direction:row; align-items: center; width: 120; height: 110;margin-left:24" @click="back">
                <arrow type="left"></arrow>
                <text style="font-size:32; color: #389AFF;margin-right:16">返回</text>
            </div>
            <text style="flex:1; text-align:center; font-size: 36">图片查看</text>
            <div style="flex-direction:row; align-items: center; width: 120; height: 110;margin-right:24">
            </div>
        </div>
        <scroller scroll-direction="vertical" style="flex:1;flex-direction:column;" show-scrollbar="false">
            <div>
                <zoom-img class="zoom" :src="mysrc"></zoom-img>
            </div>
        </scroller>
    </div>

</template>

<script>
    const navigator = weex.requireModule('navigator');
    export default {
        data:()=> ({
            mysrc:'',//http://service.moticslide.zwjk.com/MoticGallery/Slides/6a2f2fbd-04a6-4ff4-82a8-b2799f998512/Snapshots/B0FEE181-4523-487A-A3F9-0983497FBD28
        }),
        components: {
            arrow: require('../../components/tsl-arrow.vue'),
        },
        methods: {
            back() {
                navigator.pop({}, function () {});
            }
        }
    }
</script>

<style>
    .zoom{
        width: 750;
        height:750;
        flex-wrap: wrap;
        flex:1;
    }

</style>