<template>
    <base title="form" @baseAppear="onappear">
        <list>
            <cell v-for = "itemData in list1">
                <form1 :item-data="itemData" @form1="form1"></form1>
            </cell>
            <cell v-for = "itemData in list2">
                <form2 :textarea-height="160"  :item-data="itemData" @form2="form2"></form2>
            </cell>
            <cell>
                <form3 :ifRequire="false"  @form3="form3"></form3>
            </cell>
            <cell>
                <form4 :if-radio="true"  :list="list4" @form4="form4"></form4>
            </cell>
            <cell>
                <text class="btn" @click="submitClick">提交</text>
            </cell>

        </list>
    </base>
</template>

<script>
const normal = require('../js/normal.js').normal;
export default {
    data:()=> ({

        list1:[{name:'姓名:',ifRequire:true},{name:'年龄:',ifRequire:false}],
        list2:[{name:'电子邮箱:',ifRequire:true},{name:'家庭地址:',ifRequire:false}],
        list4:[{name:'男',isSelected:true},{name:'女',isSelected:false}],
    }),
    methods:{
        form1(e) {
        },
        form2(e) {
        },
        form3(e) {
        },
        form4(e) {
            this.list4 = e.list;
        },
        submitClick() {
            normal.alert('提交成功');
        },
    },
    components:{
        base: require('./base.vue'),
        // nav: require('../components/UINavgationBar.vue'),
        'form1':require('./form1.vue'),
        'form2':require('./form2.vue'),
        'form3':require('./form3.vue'),
        'form4':require('./form4.vue'),

    }
}
</script>

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
</style>
