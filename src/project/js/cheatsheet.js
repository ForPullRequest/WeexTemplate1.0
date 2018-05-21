const normal = require('./normal.js').normal;
/*
* 给不太熟悉js操作的人使用的cheatsheet
* 但是不建议直接引入该文件使用 只供查询
* 
* 日期/时间操作 http://www.w3school.com.cn/jsref/jsref_obj_date.asp
* 列表操作 http://www.w3school.com.cn/jsref/jsref_obj_array.asp
* 字符串操作 http://www.w3school.com.cn/jsref/jsref_obj_string.asp
* 数学操作 http://www.w3school.com.cn/jsref/jsref_obj_math.asp
* 一些通用操作 setTimeout setTimeinterval
*/
exports.sheet = {

/*通用操作*/

	//延时操作 name = setTimeout()
	setTimeout: function(func, timeout){
		return setTimeout(function () {
			if(func){
				func();
			}else{
				normal.toast('setTimeout必须有对应的操作');
			}
		}.bind(this), timeout);
	},
	//定时操作 name = setInterval()
	setInterval: function(func, timeout) {
		return setInterval(function(){
			if(func){
				func();
			}else{
				normal.toast('setInterval必须有对应的操作');
			}
		}.bind(this), timeout);
	},
	//清除定时操作
	clearInterval: function(name){
		clearInterval(name);
	},

/*通用操作*/

/*日期/时间*/
/*日期/时间*/

/*列表*/

	//prototype 属性使您有能力向对象添加属性和方法

	//将resList添加到tarList的末尾
	concat: function(tarList, resList){
		tarList = tarList.concat(resList);
		return tarList;
	},
	//separator可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。
	join: function(arr, separator){
		return separator == undefined ? arr.join() : arr.join(separator);
	},
	//pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。
	//如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
	pop: function(arr){
		return arr.pop();
	},
	//push() 方法可把它的参数顺序添加到 arrayObject 的尾部。
	//它直接修改 arrayObject，而不是创建一个新的数组。
	//push() 方法和 pop() 方法使用数组提供的先进后出栈的功能。
	//该方法会改变数组的长度。要想数组的开头添加一个或多个元素，请使用 unshift() 方法。
	push: function(tar, res){
		return tar.push(res);
	},
	//方法可向数组的开头添加一个或更多元素，并返回新的长度。
	//直接修改原有的数组。
	unshift: function(tar, res){
		return tar.unshift(res);
	},
	//用于把数组的第一个元素从其中删除，并返回第一个元素的值。
	//如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值。
	//直接修改原有的 arrayObject。
	shift: function(arr){
		return arr.shift();
	},
	//用于颠倒数组中元素的顺序。
	//该方法会改变原来的数组，而不会创建新的数组。
	reverse: function(arr){
		return arr.reverse();
	},
	//方法可从已有的数组中返回选定的元素。
	//返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
	//如slice(arr, 2, 4)返回arr[2]和arr[3]
	slice: function(arr, start, end){
		return arr.slice(start, end);
	},
	//方法向/从数组中添加/删除项目，然后返回被删除的项目。
	//item1, ..., itemX	可选。向数组添加的新项目。
	//splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。
	splice: function(arr, howmany){
		return arr.splice(howmany);
	},
	//用于对数组的元素进行排序。
	//sortby规定排序顺序。必须是函数。
	//例function sortNumber(a,b) {
	//		return a - b
	// }
	//对数组的引用。请注意，数组在原数组上进行排序，不生成副本。
	sort: function(arr, sortby){
		if(sortby){
			arr.sort(sortby);
		}else{
			arr.sort();
		}
	},
	//方法可把数组转换为字符串，并返回结果。
	toString: function(arr){
		return arr.toString();
	},

/*列表*/
	
/*字符串*/

	//方法可返回指定位置的字符。返回的字符是长度为 1 的字符串。
	//字符串中第一个字符的下标是 0。如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。
	charAt: function(str, index){
		return str.charAt(index);
	},
	//方法可返回某个指定的字符串值在字符串中首次出现的位置。
	//tar 规定需检索的字符串值。
	//index可选 规定在字符串中开始检索的位置 合法取值是 0 到 str.length - 1
	//indexOf() 方法对大小写敏感！如果要检索的字符串值没有出现，则该方法返回 -1。
	indexOf: function(str, tar){
		return index == undefined ? str.indexOf() : str.indexOf(tar);
	},
	//方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
	//tar 规定需检索的字符串值。
	//index可选 规定在字符串中开始检索的位置 合法取值是 0 到 str.length - 1
	//indexOf() 方法对大小写敏感！如果要检索的字符串值没有出现，则该方法返回 -1。
	lastIndexOf: function(str, tar){
		return index == undefined ? str.lastIndexOf() : str.lastIndexOf(tar);
	},
	//方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
	//http://www.w3school.com.cn/jsref/jsref_match.asp
	match: function(str, regexp){
		return str.match(regexp);
	},
	//substr/regexp 第一个参数规定子字符串或要替换的模式的 RegExp 对象
	replace: function(str, tar, replacement){
		return str.replace(tar, replacement);
	},
	//方法用于/*检索字符串中指定的子字符串，或*/检索与正则表达式相匹配的子字符串。
	//返回第一个与 regexp 相匹配的子串的起始位置。
	search: function(str, regexp){
		return str.search(regexp);
	},
	//方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。
	strSlice: function(str, start, end){
		return end == undefined ? str.slice(start) : str.slice(start, end);
	},
	//方法用于把一个字符串分割成字符串数组。
	//separator 必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
	//howmany 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。
	//如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
	split: function(str, separator, howmany){
		return howmany == undefined ? str.split(separator) : str.split(separator, howmany);
	},
	//方法可在字符串中抽取从 start 下标开始的指定数目的字符。
	substr: function(str, start, length){
		return length == undefined ? str.substr(start) : str.substr(start, length);
	},
	//方法用于提取字符串中介于两个指定下标之间的字符。
	substring: function(str, start, stop){
		return stop == undefined ? str.substring(start) : str.substring(start, stop);
	},

/*字符串*/
	
/*数学*/
/*数学*/
}