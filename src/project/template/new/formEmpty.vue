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
const normal = require('./normal.js').normal;
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
            let output = new Map();
            for (var i = 0; i < this.list.length; i++) {
                output.set(this.list[i].tag, this.list[i].output);
            }
            normal.save('output', this.list);
            // normal.alert(output.get('more'));
        },
        getList(listT) {
            normal.get('output', function(ret){
                if(ret){
                    this.list = normal.parse(ret);
                }else{
                    this.list = [{
                        tag:'name',//必需，为接口中该值的名称
                        index:0,//必需，为了output
                        type:'text',//展示信息，不传该属性则默认为text
                        title:'姓名姓名姓名姓名姓名姓名:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        textValue:'text',//该行展示内容
                        textColor:'#999999',//文本内容颜色
                        ifRequire:true,//是否必填（显示星号）
                        isLeft:false,//是否靠左
                        lines:3,//最大行数，超过会显示“...”
                    },{
                        tag:'input',//必需，为接口中该值的名称
                        index:1,//必需，为了output
                        type:'input',//单行输入
                        title:'输入:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        textValue:'',//该行展示内容
                        textColor:'#999999',//文本内容颜色
                        placeholder:'请输入内容',//占位符内容
                        inputType:'text',//输入类型
                        ifRequire:true,//是否必填（显示星号）
                        isBelow:false,//输入框是否在下方
                        isLeft:false,//是否靠左
                    },{
                        tag:'date',//必需，为接口中该值的名称
                        index:2,//必需，为了output
                        type:'input',//单行输入
                        title:'日期:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        textValue:'',//该行展示内容
                        textColor:'#999999',//文本内容颜色
                        placeholder:'请输入日期',//占位符内容
                        inputType:'date',//输入类型：日期选择
                        ifRequire:true,//是否必填（显示星号）
                        isBelow:false,//输入框是否在下方
                        isLeft:false,//是否靠左
                    },{
                        tag:'more',//必需，为接口中该值的名称
                        index:3,//必需，为了output
                        type:'textarea',//多行输入
                        title:'多行输入:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        textValue:'',//该行展示内容
                        textColor:'#999999',//文本内容颜色
                        placeholder:'请输入内容',//占位符内容
                        inputType:'text',//输入类型
                        ifRequire:true,//是否必填（显示星号）
                    },{
                        tag:'imageList',//必需，为接口中该值的名称
                        index:4,//必需，为了output
                        type:'image',//图片行表
                        title:'上传图片:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        ifRequire:false,//是否必填（显示星号）
                        canCancel:true,//是否可删除图片
                        list:['ic_immune','ic_image'],//要显示的图片行表
                    },{
                        tag:'showList',//必需，为接口中该值的名称
                        index:5,//必需，为了output
                        type:'image',//图片列表
                        title:'显示图片:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        ifRequire:false,//是否必填（显示星号）
                        canCancel:false,//是否可删除图片
                        list:['ic_immune','ic_image'],//要显示的图片列表
                    },{
                        tag:'sex',//必需，为接口中该值的名称
                        index:6,//必需，为了output
                        type:'radio',//单选
                        title:'性别:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        isCheck:'/user/ico-radio-selected',//选中的图片
                        unCheck:'/user/ico-radio-selected-gray',//未选中图片
                        selectRadio:'0',//默认选中第一个选项时需要写为'0'
                        ifRequire:true,//是否必填（显示星号）
                        isLeft:false,//是否靠左
                        list:['男','女']//选项
                    },{
                        tag:'check',//必需，为接口中该值的名称
                        index:7,//必需，为了output
                        type:'checkbox',//多选
                        title:'复选:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        isCheck:'star_select',//选中的图片
                        unCheck:'star',//未选中图片
                        ifRequire:true,//是否必填（显示星号）
                        isLeft:false,//是否靠左
                        //title为选项名，selected为是否选中
                        list:[{title:'吃饭',selected:true},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}]
                    },{
                        tag:'drop1',//必需，为接口中该值的名称
                        index:8,//必需，为了output
                        type:'dropdown',//下拉列表
                        title:'下拉列表:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        textValue:'fff',//必需，否则选中项不会在该行显示
                        textColor:'#999999',//文本内容颜色
                        ifRequire:true,//是否必填（显示星号）
                        isLeft:false,//是否靠左
                        //code标识选项，name为该选项内容
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
                        tag:'drop2',//必需，为接口中该值的名称
                        index:9,//必需，为了output
                        type:'dropdown',//下拉列表
                        title:'下拉列表:',//该行的标题
                        titleColor:'#5f5f5f',//标题颜色
                        textValue:'fff',//必需，否则选中项不会在该行显示
                        textColor:'#999999',//文本内容颜色
                        ifRequire:true,//是否必填（显示星号）
                        isLeft:true,//是否靠左
                        //code标识选项，name为该选项内容
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