<template>
    <div class="wrapper">
        <tsl-embed class="content" :style="{ visibility: item.visibility }" pushitem="0000"   :key="index"  v-for="(item,index) in tabItems" :src="item.src"></tsl-embed>
        <div class="tabbar" :style="{height: tabBarHeight + 'px'}" append = "tree">
                <div class="container" :style="{backgroundColor: tab.backgroundColor}"  :key="index" v-for="(tab,index) in tabItems"  @click="onclickitem(index)">
                    <image class="top-line" src = "tabbar_line"></image>
                    <div style="padding-left: 16px;padding-right: 16px;">
                        <image class="tab-icon" :src = tab.icon></image>
                        <redpoint style="position:absolute;right:0;top:0;"  :badge="tab.badge"  >
                        </redpoint>
                    </div>
                    <text class="tab-text" :style="{color: tab.titleColor}">{{tab.title}}</text>
                </div>
        </div>
    </div>
</template>
<style>
    .wrapper {
        width: 750px;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .content {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin-top: 0px;
        margin-bottom: 98px;
    }
    .tabbar {
        flex-direction: row;
        background-color: white;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        /*height: 98px;*/
    }
    .container {
        flex: 1;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        height: 98px;
    }
    .top-line {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 2px;
    }
    .tab-icon {
        margin-top: 5px;
        width: 40px;
        height: 40px
    }
    .tab-text {
        margin-top: 5px;
        text-align: center;
        font-size: 20px;
    }
</style>
<script>
    const modal = weex.requireModule('modal');
    export default {
        props:{
            tabItems: [],
        },
        data(){
            return{
                selectedIndex: 0,
                tabBarHeight : 98
            }
        },
        created: function () {
            /**
             * iphone适配
             */
            if (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6') {
                //iphoneX
                this.tabBarHeight    = 132;
            } else {
                this.tabBarHeight    = 98;
            }

            this.selected(this.selectedIndex);
        },
        components: {
            redpoint: require('./tsl-redpoint.vue')
        },
        methods: {
            onclickitem:function (e) {
                this.selectedIndex = e;
                this.selected(e);
            },
            selected: function (index) {
                for (var i = 0; i < this.tabItems.length; i++) {
                    var tabItem = this.tabItems[i];
                    if (i == index) {
                        tabItem.icon = tabItem.selectedImage;
                        tabItem.titleColor = tabItem.selectedColor;
                        tabItem.visibility = 'visible';
                    }
                    else {
                        tabItem.icon = tabItem.image;
                        tabItem.titleColor = '#ACACAC';
                        tabItem.visibility = 'hidden';
                    }
                }
            },
        }
    }
</script>
