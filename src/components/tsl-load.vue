<template>
        <loading  @loading="onloading"  class="loading" :display="showloading?'show':'hide'"  @pullingdown="onpullingdown">
            <image   src="components/loading.gif" v-if="!isloadingall"
                   class="refresh-icon"></image>
            <text class="loadingtext">{{loadmoretext}}</text>
        </loading>
</template>
<style src="../css/tsl-load.css"  lang="postcss">

</style>
<script>
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    var cache = weex.requireModule('TSLCache');
    module.exports = {
        props:{
            loadstatus:{
                default:false
            },
            nomoreload:{
                default:false,
            }
        },
        data() {
            return {
                showloading:this.loadstatus,
                isloadingall:this.nomoreload,
            }
        },
        watch:{
            loadstatus(val){
                this.showloading = val
            },
            nomoreload(val){
                this.isloadingall = val
            }
        },
        components: {

        },
        computed: {
            loadmoretext(){
                return this.isloadingall?"已加载完毕":"正在加载"
            }
        },
        methods: {
            onloading (event) {
                this.dispatchloadevent();
                this.showloading = true;
            },
            dispatchloadevent:function () {
                this.$emit('onload',this.showloading);
            },
        },
        created:function () {
        },
    }
</script>
