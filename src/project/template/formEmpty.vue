<template>
    <listT ref="list" title="申请单" :hasData="1" :hasRefresh="false" :hasLoad="false" @listAdapter="getList" @listAppear="appear">
        <cell v-for = "itemData, index in list">
            <formT :itemData="itemData" @imgClick="imgClick" @imgCancel="imgCancel" @addPic="addPic" @ddItemClick="drop" @getOutPut="getOutPut"></formT>
        </cell>
        <cell>
            
        <!-- 按钮 -->
            <div class="btn" @click="clickBtn">
                <text class="btnText" value="下一步"></text>
            </div>
        </cell>

        <!-- 按钮 -->
        <div slot="action" class="btnAbsolute" @click="clickBtn">
            <text class="btnText" value="下一步"></text>
        </div>
    </listT>
</template>
<style>
.btnAbsolute{
    height: 80;
    margin-left: 80;
    margin-right: 80;
    margin-top: 40;
    margin-bottom: 40;
    background-color: #1C86EE;
    justify-content: center;
    border-radius: 10;
}
.btn{
    flex: 1;
    height: 80;
    margin-left: 80;
    margin-right: 80;
    margin-top: 40;
    margin-bottom: 40;
    background-color: #1C86EE;
    justify-content: center;
    border-radius: 10;
}
.btnText{
    text-align: center;
    font-size: 28;
    color: white;
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
        list:[],
        data:[],
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        imgClick(index){
            normal.toast(index);
        },
        imgCancel(imgCancel){
            this.list[4].list.splice(imgCancel.index, 1);
            normal.toast(imgCancel.index);
        },
        addPic(title){
            normal.toast(title);
        },
        drop(title){
            normal.toast(title.model);
        },
        getOutPut(output){
            this.list[output.index].output = output.output;
        },
        clickBtn(){
            let output = [];
            for (var i = 0; i < this.list.length; i++) {
                output.push({
                    key:this.list[i].tag,
                    value:this.list[i].output,
                })
            }
            normal.save(this.list, 'output');
        },
        getList(listT) {
            normal.get('output', function(ret){
                if(ret){
                    this.list = normal.parse(ret);
                }else{
                    this.list = [{
                        index:0,//必需，为了output
                        tag:'name',//必需，为接口中该值的名称
                        type:'text',
                        title:'姓名姓名姓名姓名姓名姓名姓名姓名:',
                        ifRequire:true,
                        textValue:'text',
                        isLeft:false,
                    },{
                        index:1,
                        tag:'input',
                        type:'input',
                        title:'输入:',
                        ifRequire:true,
                        isBelow:false,
                        isLeft:false,
                    },{
                        index:2,
                        tag:'date',
                        type:'input',
                        title:'日期:',
                        ifRequire:true,
                        isBelow:false,
                        inputType:'date',
                        placeholder:'请输入日期',
                        isLeft:false,
                    },{
                        index:3,
                        tag:'more',
                        type:'textarea',
                        title:'多行输入:',
                        ifRequire:true,
                        isBelow:true,
                        isLeft:true,
                    },{
                        index:4,
                        tag:'imageList',
                        type:'image',
                        title:'上传图片:',
                        ifRequire:false,
                        isBelow:false,
                        canCancel:true,
                        list:['ic_immune','ic_image'],
                    },{
                        index:5,
                        tag:'showList',
                        type:'image',
                        title:'显示图片:',
                        ifRequire:false,
                        isBelow:false,
                        list:['ic_immune','ic_image'],
                        isLeft:false,
                    },{
                        index:6,
                        tag:'sex',
                        type:'radio',
                        title:'性别:',
                        ifRequire:true,
                        isBelow:false,
                        isLeft:false,
                        isCheck:'/user/ico-radio-selected',
                        unCheck:'/user/ico-radio-selected-gray',
                        list:['男','女']
                    },{
                        index:7,
                        tag:'check',
                        type:'checkbox',
                        title:'复选:',
                        ifRequire:true,
                        isBelow:false,
                        isLeft:false,
                        isCheck:'star_select',
                        unCheck:'star',
                        list:[{title:'吃饭',selected:false},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}]
                    },{
                        index:8,
                        tag:'drop1',
                        type:'dropdown',
                        title:'下拉列表:',
                        ifRequire:true,
                        isBelow:false,
                        isLeft:false,
                        textValue:'fff',//必填
                        list:[{
                            code:0,
                            name:'吃饭',
                        },{
                            code:1,
                            name:'睡觉',
                        },{
                            code:2,
                            name:'打豆豆',
                        }]
                    },{
                        index:9,
                        tag:'drop2',
                        type:'dropdown',
                        title:'下拉列表:',
                        ifRequire:true,
                        isBelow:false,
                        textValue:'fff',
                        list:[{
                            code:0,
                            name:'吃饭',
                        },{
                            code:1,
                            name:'睡觉',
                        },{
                            code:2,
                            name:'打豆豆',
                        }]
                    }];
                }
            }.bind(this));
            listT.end();
        },
    }
}
</script>