/*
* 用于对normal.js的补充
* 
* TSLUtility
*/

const utility   = weex.requireModule('TSLUtility');
const moment    = require('moment');

exports.util = {
/* utility */

	closeKeyboard: function(){
		utility.closeKeyboard();
	},
	showLoading: function(msg){
		utility.showLoading(msg);
	},
	hideLoading: function(){
		utility.hideLoading();
	},

/* utility */

}

exports.tsl_date = {
    /**
     * 获取格式话日期 此方法只支持年月日
     * @param format 格式化方式
     * @returns {*}
     *
     *  tsl_date.tsl_format('YYYY-MM-DD') 注意都是大写
     */
    tsl_format: function (format) {
        return moment().format(format.toUpperCase());

        // var date = new Date();                          //日期的处理
        // var o = {
        //     "M+" : date.getMonth()+1,                   //month
        //     "d+" : date.getDate(),                      //day
        //     "h+" : date.getHours(),                     //hour
        //     "m+" : date.getMinutes(),                   //minute
        //     "s+" : date.getSeconds(),                   //second
        //     "q+" : Math.floor((date.getMonth()+3)/3),   //quarter
        //     "S" : date.getMilliseconds()                //millisecond
        // }
        // if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        //     (date.getFullYear()+"").substr(4- RegExp.$1.length));
        // for(var k in o)if(new RegExp("("+ k +")").test(format))
        //     format = format.replace(RegExp.$1,
        //         RegExp.$1.length==1? o[k] :
        //             ("00"+ o[k]).substr((""+ o[k]).length));
        // return format;
    },
    /**
     * 获取日期后多少天的日期
     * @param date  当前日期 2018-01-02
     * @param days  需要加的天数
     * @returns {string}
     */
    // tsl_addDate: function (date,days) {
    //     var date  = new Date(date);
    //     date.setDate(date.getDate() + days);
    //     var month = date.getMonth() + 1;
    //     var day   = date.getDate();
    //     return date.getFullYear() + '-' + private_getFormatDate(month) + '-' + private_getFormatDate(day);
    // },
}