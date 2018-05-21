
const normal 					                = require('./normal').normal;


/**
 * 用户登录信息
 * @type {string}
 */
const TSL_USER_LOGIN_INFO		                = "TSL_USER_LOGIN_INFO";

/**
 * 用户医院
 */
const TSL_SELECT_HOSPITAL                       = "TSL_SELECT_HOSPITAL";

/**
 * 用户选择医院对应模块权限
 */
const TSL_SELECT_HOSPITAL_MODULE_LIMIT          = "TSL_SELECT_HOSPITAL_MODULE_LIMIT";


/** eg:
 *     cache.tsl_user_token(function (token) {
            console.log("1.当前用户的token为: " + token);
       });
 */


exports.userInfo = {

    /**
     * 修改用户信息
     * @param newInfo   要修改的信息 注意 key必需和保存的一致
     */
    tsl_updateInfo: function (newInfo,fun) {
        var self = this;
        this.tsl_get(function (userInfo) {
            var newUserInfo = userInfo;
            for (var newKey in newInfo) {
                newUserInfo[newKey] = newInfo[newKey];
            }
            self.tsl_save(newUserInfo,fun);
        });
    },

    /**
     * 保存用户登录的信息
     * @param loginInfo1    UC01009接口返回的登录信息
     * @param loginInfo2    U003003接口返回的登录信息
     * @param fun           保存成功回掉
     */
    tsl_userInfo: function(loginInfo1,loginInfo2,fun) {
        var user_info = {
            id          :loginInfo1["id"],
            openId      :loginInfo1["openId"],
            phone       :loginInfo1["phone"],
            proj_code   :loginInfo1["proj_code"],
            pushId      :loginInfo1["pushId"],
            token       :loginInfo1["token"],
            centerId    :loginInfo1["user_id"],
            session     :loginInfo2["S"],
            login_name  :loginInfo2["login_name"],
            user_id     :loginInfo2["user_id"],
            name        :loginInfo2["name"]?loginInfo2["name"]:"",
            sex         :loginInfo2["sex"]?loginInfo2["sex"]:"",
            id_card     :loginInfo2["id_card"]?loginInfo2["id_card"]:"",
            treate_card :loginInfo2["treate_card"]?loginInfo2["treate_card"]:"",
            address     :loginInfo2["address"]?loginInfo2["address"]:""
        };
        this.tsl_save(user_info,fun);
    },
    /**
	 *	保存登录信息
     */
	tsl_save: function (object,fun) {
        normal.save(object,TSL_USER_LOGIN_INFO,fun);
    },
    /**
	 * 获取登录信息
     */
	tsl_get: function (fun) {
		normal.get(TSL_USER_LOGIN_INFO,function (ret) {
            fun(ret);
        });
    },
    /**
	 * 当前登录用户的token
     */
	tsl_user_token: function (fun) {
        normal.get(TSL_USER_LOGIN_INFO,function (ret) {
            if (ret) {
                fun(ret["token"]);
            }else {
                fun("");
            }
        });
    },

    /**
     * 当前登录用户的session
     */
    tsl_user_session: function (fun) {
        normal.get(TSL_USER_LOGIN_INFO,function (ret) {
            if (ret) {
                fun(ret["session"]);
            }else {
                fun("");
            }
        });
    },

    /**
	 * 移除登录信息
     */
	tsl_remove: function (fun) {
		normal.remove(TSL_USER_LOGIN_INFO,fun);
    },
    /**
	 * 判断用户是否登录
     */
	tsl_isLogin: function (fun) {
        normal.get(TSL_USER_LOGIN_INFO,function (ret) {
            if (ret) {
                fun(true);
            }else {
                fun(false);
            }
        });
    },
},


/**
 * 选择医院缓存
 * @type {{}}
 */
exports.hospital = {
    /**
     *	保存选择的医院信息
     */
    tsl_save: function (object,fun) {
        var hospital = {
            hospital_id     : object.hospitalId,
            hospital_name   : object.hospitalName,
            logo            : object.logo,
            seq             : object.seq
        }
        normal.save(hospital,TSL_SELECT_HOSPITAL,fun);
    },
    /**
     * 获取选择的医院信息
     */
    tsl_get: function (fun) {
        normal.get(TSL_SELECT_HOSPITAL,function (ret) {
            fun(ret);
        });
    },
    /**
     * 获取选择医院的 hospital_id
     */
    tsl_hospital_id: function (fun) {
        normal.get(TSL_SELECT_HOSPITAL,function (ret) {
            if (ret) {
                fun(ret["hospital_id"]);
            }else {
                fun("");
            }
        });
    },
    /**
     * 移除选择的医院信息
     */
    tsl_remove: function (fun) {
        normal.remove(TSL_SELECT_HOSPITAL,fun);
    },
}



exports.hospital_limit = {
    /**
     *	保存选择的医院权限信息
     */
    tsl_save: function (object,fun) {
        var limitMap = {};
        for (var index in object) {
            var value = object[index];
            var key   = value.key;
            limitMap[key] = value;
        }
        normal.save(limitMap,TSL_SELECT_HOSPITAL_MODULE_LIMIT,fun);
    },
    /**
     * 获取选择的医院所有权限信息
     */
    tsl_get: function (fun) {
        normal.get(TSL_SELECT_HOSPITAL_MODULE_LIMIT,function (ret) {
            fun(ret);
        });
    },
    /**
     * 获取选择的医院单个权限信息
     */
    tsl_isOpen: function (key,fun) {
        normal.get(TSL_SELECT_HOSPITAL_MODULE_LIMIT,function (ret) {
            if (ret[key]) {
                fun(ret[key]);
            }else {
                fun({status:"0"});//没有就让默认可以进去该模块
            }
        });
    },
    /**
     * 移除选择的医院权限信息
     */
    tsl_remove: function (fun) {
        normal.remove(TSL_SELECT_HOSPITAL_MODULE_LIMIT,fun);
    },
}


/*
F0001 当日挂号
F0002 预约取号
F0000 预约挂号

F0003 查报告单
F0004 候诊叫号
F0005 门诊支付
F0006 体检查询

F0007 科室医生
F0008 智能导诊
F0009 住院查询
F0010 满意度调查


F0014 普通挂号
F0015 专家挂号

F0012 普通预约
F0013 专家预约


F0020 普通无卡预约
F0021 专家无卡预约


F0018 住院费用查询
F0019 住院费用充值


F0011 个人中心

F0016 检查单
F0017 检验单

F0022 手术状态
 */










