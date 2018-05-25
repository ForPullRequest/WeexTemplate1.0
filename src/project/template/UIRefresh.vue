<template>
        <refresh @refresh="onrefresh"
                 v-on:dispatchsrefresh="dispatchrefreshevent"
                 v-on:dispatchsload="dispatchloadevent"
                 @pullingdown="onpullingdown"
                 :display="mRefreshStatus?'show':'hide'"
                 ref = "refresh"
                 class="refresh">
            <image ref="imgs" v-if="mRefreshStatus" src="components/loading.gif"
                   class="refresh-icon"></image>
            <image ref="imgs" v-if="!mRefreshStatus" src="components/page-next"
                   class="direction-icon"></image>
            <div class="refresh-div">
                <text class="refresh-text-1">{{refreshTitle}}</text>
                <text class="refresh-text-2">最后更新:  {{lastRefreshDate}}</text>
            </div>
        </refresh>
</template>
<style  lang="postcss">
    .refresh{
        height: 100px;background-color: #f6f6f6;align-items: center;justify-content: center;flex-direction: row
    }
    .refresh-icon{
        width: 40px;height: 40px;margin-right: 30px;align-self: center;
    }
    .direction-icon{
        width: 40px;height: 45px;margin-right: 30px;align-self: center;
    }
    .refresh-div{
        flex-direction: column;align-items: center;height: 100px;margin-top: 30px
    }
    .refresh-text-1{
        color: #666666;text-align: center;font-size: 28px;
    }
    .refresh-text-2{
        color: #666666;text-align: center;font-size: 26px;margin-top: 10px;
    }
</style>
<script>
    const normal = require('../js/normal.js').normal;
    const animation = weex.requireModule('animation');

    module.exports = {
        data:()=> ({
            mRefreshStatus: false,//刷新控件是否显示
            status:1,//refresh状态: 1:下拉以刷新 2:松开立即刷新 3:正在加载 4:加载完毕
            lastRefreshDate:'暂无数据',
        }),
        computed: {
            refreshTitle(){
               switch(this.status){
                   case 1: return '下拉以刷新'; break;
                   case 2: return '释放立即刷新';break;
                   case 3: return '正在加载';break;
                   case 4: return '加载完毕';break;
               }
            },
        },
        methods: {
            //在外部调用
            endRefresh:function () {
                // modal.alert({message:'endRefresh'})
                this.status = 4;
                this.mRefreshStatus = false;
                this.removeAnimal();
                this.saveTime();
            },
            onrefresh: function () {
                // modal.alert({message:'onrefresh'})
                this.$emit('onrefresh');
                this.status = 3;
                this.mRefreshStatus = true;
            },
            onpullingdown (event) {
                if(this.mRefreshStatus){
                    return;
                }
                this.status = 1;
                this.getCacheTime();
                if (Math.abs(event.pullingDistance) > event.viewHeight) {
                    this.status =2;
                    this.rotate();
                }
                if (Math.abs(event.pullingDistance) <= event.viewHeight&&this.status ==2) {
                    this.status = 1;
                    this.removeAnimal();
                }
            },
            getCacheTime(){
                normal.get('lastRefreshTime', function (ret) {
                    if (ret.val == null) {
                        return '';
                    } else {
                        this.lastRefreshDate = ret.val;
                        if(this.getToday()==this.lastRefreshDate.substring(0,this.lastRefreshDate.indexOf(" "))){
                            this.lastRefreshDate = '今天 '+this.lastRefreshDate.substring(this.lastRefreshDate.indexOf(" "),this.lastRefreshDate.length);
                        }
                        if(this.getYesterDay()==this.lastRefreshDate.substring(0,this.lastRefreshDate.indexOf(" "))){
                            this.lastRefreshDate = '昨天  '+this.lastRefreshDate.substring(this.lastRefreshDate.indexOf(" "),this.lastRefreshDate.length);
                        }
                    }
                }.bind(this))
            },
            saveTime(){
                var date = new Date();
                var onlyDate = date.getFullYear() + '-' + this.setZero(date.getMonth()+1) + '-' + this.setZero(date.getDate())+' '+this.setZero(date.getHours())+':'+this.setZero(date.getMinutes());
                normal.save(onlyDate, 'lastRefreshTime', function () {});
            },
            setZero:function (val) {
                if(val<10){
                    return "0"+val;
                }else{
                    return val;
                }
            },
            getYesterDay(){
                var date = new Date();
                return date.getFullYear() + '-' + this.setZero(date.getMonth()+1) + '-' + this.setZero(date.getDate()-1);
            },
            getToday(){
                var date = new Date();
                return date.getFullYear() + '-' + this.setZero(date.getMonth()+1) + '-' + this.setZero(date.getDate());
            },
            removeAnimal () {
                var images = this.$refs.imgs;
                animation.transition(images, {
                    styles: {
                        transform: '',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                }, function () {

                })
            },
            rotate () {
                var images = this.$refs.imgs;
                animation.transition(images, {
                    styles: {
                        transform: 'rotate(-3.15)',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                }, function ()  {
                }.bind(this))
            },
        },
    }
</script>


