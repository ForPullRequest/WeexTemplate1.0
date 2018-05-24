<template>
    <listT ref="list" title="申请单" :hasData="list.length!=0" :hasRefresh="false" :hasLoad="false" @listAdapter="getList" @listAppear="appear">
        <cell v-for = "itemData in list">
            <formT :itemData="itemData"></formT>
        </cell>
    </listT>
</template>

<style>

.btn {
    margin-left: 20;
    width: 710;
    margin-top: 50;
    height: 80;
    background-color: #74D116;
    color: white;
    text-align: center;
    padding-top: 15;
    border-radius: 5;
    font-size: 30;
    margin-bottom: 50;
}
.itemDiv{
    flex-direction: column;
}
</style>

<script>
const normal = require('../js/normal.js').normal;
export default{
    components: {
        listT: require('./listT.vue'),
        formT: require('./formT.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
        list:[],
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        itemClick(index) {

        },
        getList(listT) {
            this.list = [{
                type:'text',
                title:'姓名姓名姓名姓名姓名姓名姓名姓名:',
                ifRequire:true,
                inputValue:'text',
                isLeft:true,
            },{
                type:'input',
                title:'输入:',
                ifRequire:true,
                isBelow:false,
                isLeft:false,
            },{
                type:'input',
                title:'日期:',
                ifRequire:true,
                isBelow:false,
                inputType:'date',
                placeholder:'请输入日期',
                isLeft:false,
            },{
                type:'textarea',
                title:'多行输入:',
                ifRequire:true,
                isBelow:false,
                isLeft:true,
            },{
                type:'image',
                title:'上传图片:',
                ifRequire:false,
                isBelow:false,
                list:['ic_immune','ic_image'],
                isLeft:false,
            },{
                type:'radio',
                title:'性别:',
                ifRequire:true,
                isBelow:false,
                isCheck:'/user/ico-radio-selected',
                unCheck:'/user/ico-radio-selected-gray',
                list:['男','女']
            },{
                type:'checkbox',
                title:'复选:',
                ifRequire:true,
                isBelow:false,
                isCheck:'star_select',
                unCheck:'star',
                list:['吃饭','睡觉','打豆豆']
            },{
                type:'dropdown',
                title:'下拉列表:',
                ifRequire:true,
                isBelow:false,
                list:['吃饭','睡觉','打豆豆']
            },{
                type:'dropdown',
                title:'下拉列表:',
                ifRequire:true,
                isBelow:false,
                list:['吃饭','睡觉','打豆豆']
            },{
                type:'dropdown',
                title:'下拉列表:',
                ifRequire:true,
                isBelow:false,
                list:['吃饭','睡觉','打豆豆']
            }];
        },
    }
}
</script>