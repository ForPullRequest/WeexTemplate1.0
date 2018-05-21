/**
 * 用作反向传值的处理
 */

const  normal                   =    require('./normal').normal;

const  TSL_TEMP_VALUE_KEY       = "TSL_TEMP_VALUE_KEY";


/**
 * 使用方法
 *
 * 1、导入: const  tsl_popValue   =    require('../../../js/temp_pop_value').popValue;
 * 2、在传值页面使用
 *      tsl_popValue.tsl_pop("传过来了1112222");
 * 3、在接收传值叶脉呢使用
 *      tsl_popValue.tsl_get_pop(function (value) {
 *             if (value) {
 *
 *             }
 *      });
 * 4、值传递一次存储的东西即被销毁
 */


exports.popValue = {
    tsl_pop: function(value) {
        normal.save(value,TSL_TEMP_VALUE_KEY,function () {
            normal.back();
        });
    },
    tsl_get_pop: function (fun) {
        normal.get(TSL_TEMP_VALUE_KEY,function (ret) {
            var tempValue = ret;
            normal.remove(TSL_TEMP_VALUE_KEY,function () {
                fun(tempValue);
            });
        });
    }
}