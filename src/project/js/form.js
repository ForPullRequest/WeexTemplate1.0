exports.form = {
	//最大长度
	maxLength: function(tar, max, msg){
		if(tar.length > max){
			return true;
		}
		return false;
	},
	//固定长度
	certainLength: function(tar, certain, msg){
		if(tar.length != certain){
			return true;
		}
		return false;
	},
	//最小长度
	minLength: function(tar, min, msg){
		if(tar.length < min){
			return true;
		}
		return false;
	},
	//手机号
	isPhone: function(tar){
		var _emp = /^\s*|\s*$/g;
		tar = tar.replace(_emp,"");
		var _d = /^1[3578][01379]\d{8}$/g;
		var _l = /^1[34578][01256]\d{8}$/g;
		var _y = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
		if(_d.test(tar)){
			return true;
		} else if(_l.test(tar)){
			return true;
		}else if(_y.test(tar)){
			return true;
		}
		return false;
	},
	//身份证
	isID: function(tar){
		var _emp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return _emp.test(tar);
	},
	//emoji表情
	isEmoji: function(tar){
		var _emp = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
		// var _emp = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/g;
		return _emp.test(tar);
	},
	//是否为正整数 最后不能为.
	isPositiveInt: function(tar){
		var _emp = /^\d+$/;
		return _emp.test(tar);
	},
	//是否为负整数 最后不能为.
	isNegativeInt: function(tar){
		var _emp = /^-\d+$/;
		return _emp.test(tar);
	},
	//是否为正数
	isPositiveFloat: function(tar){
		var _emp = /^\d+\.\d+$/;
		return _emp.test(tar);
	},
	//是否为负数
	isNegativeFloat: function(tar){
		var _emp = /^-\d+\.\d+$/;
		return _emp.test(tar);
	},
	//是否为小数
	isFloat: function(tar){
		var _emp = /^-?\d+\.\d+$/
		return _emp.test(tar);
	}
}