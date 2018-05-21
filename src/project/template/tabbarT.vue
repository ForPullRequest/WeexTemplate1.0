<template>
        <tab :tabItems="tabItems">
        </tab>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return {
                tabItems: [
                    {
                        badge: 1,
                        index: 0,
                        title: '主页',
                        titleColor: '#b2b2b2',
                        // icon: 'tabar_home_normol',
                        image: 'tabar_home_normol',
                        selectedImage: 'tabar_home_select',
                        selectedColor: '#1f88d2',
                        src: 'template/tab1',
                        visibility: 'visible',
                    },
                    {
                        badge: 2,
                        index: 1,
                        title: '消息',
                        titleColor: '#b2b2b2',
                        // icon: '',
                        image: 'tabar_me_normol',
                        selectedImage: 'tabar_me_select',
                        selectedColor: '#1f88d2',
                        src: 'template/tab2',
                        visibility: 'hidden',
                    },
                    {
                        badge: 10,
                        index: 2,
                        title: '社区团队',
                        titleColor: '#b2b2b2',
                        // icon: '',
                        image: 'tabar_public_normol',
                        selectedImage: 'tabar_public_select',
                        selectedColor: '#1f88d2',
                        src: 'template/tab3',
                        visibility: 'hidden',
                    }/*,
                    {
                        badge: 0,
                        index: 3,
                        title: '我的',
                        titleColor: '#b2b2b2',
                        // icon: '',
                        image: 'index-tabbar-unselect4',
                        selectedImage: 'index-tabbar-select4',
                        selectedColor: '#1f88d2',
                        src: 'template/tab4',
                        visibility: 'hidden',
                    }*/
                ]
            }
        },
        components: {
            tab: require('../../components/tsl-tabbar.vue')
        },

        methods: {

        },
        created: function () {
        }
    }
</script>
