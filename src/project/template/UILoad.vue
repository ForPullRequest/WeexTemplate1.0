<template>
        <loading  @loading="onloading"  class="loading" :display="showloading?'show':'hide'"  @pullingdown="onpullingdown">
            <image   src="components/loading.gif" v-if="!isloadingall"
                   class="refresh-icon"></image>
            <text class="loadingtext">{{loadmoretext}}</text>
        </loading>
</template>
<style>

.loadingtext{
    font-size: 28px;
    color: #666666;
}
.loading{
    flex-direction: row;
    justify-content: center;
    /*width: 750px;*/
    height: 80px;
    background-color: #f6f6f6;
    align-items: center;
}
.refresh-icon{
    width: 40px;
    height: 40px;
    margin-right: 30px;
    align-self: center;
}
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
