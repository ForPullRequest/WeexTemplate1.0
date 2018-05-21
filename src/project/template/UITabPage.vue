<!-- 
	component: 点击切换栏目 靠左显示
  devaloper: zhengweibin
 -->

<template>
 	<div class="page" :style="{'background-color':itemViewColor, height: itemViewHeight+'px'}">
    	<scroller style="flex-direction: row;" :style="{height: tabHeight()}" scroll-direction="horizontal" showScrollbar=false ref="scr">
      		<div class="row" v-for="(item, index) in items" :ref="'tabItem'+index" @click="touchPage(item,index)">
        		<text :style="{'font-size': itemTextFont + 'px', color: item.isSelect?itemSelectColor:itemNormolColor}">{{item.name}}</text>
        		<div v-if="item.isSelect" class="line" :style="{'background-color':itemSelectColor}"></div>
      		</div>
    	</scroller>
    </div>
</template>

<style scoped>
  .page {
    width: 750;
  	border-bottom-width: 2px;
  	border-bottom-color: #D4D4D4;
  }
  .row {
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
  }
  .line {
  	position: absolute;
  	left: 20px;
  	right: 20px;
  	bottom: 10px;
  	height: 6px;
  }
</style>

<script>
const normal = require('../js/normal.js').normal;
	const dom = weex.requireModule('dom');

	export default {
    	components: {
    		
    	},
    	props: {
    		itemViewColor: 	  {type: String, default: '#FAFAFA'},
    		itemViewHeight: 	{type: String, default: '96'},
    		itemTextFont: 		{type: String, default: '34'},
    		itemNormolColor: 	{type: String, default: '#000000'},
    		itemSelectColor: 	{type: String, default: '#1c97fc'},
    		//此处数据格式必须为 [{name: "value",isSelect: true/false,其他自定义属性}]
    		items: 				{type: Array,  default: []}
    	},
    	data() {
    		return {
    			
    		}
    	},
    	methods: {
        tabHeight(){
          return parseInt(this.itemViewHeight)+10+'px';
        },
    		touchPage(item, index) {
    			//更改选中状态
    			for (var i in this.items) {
    				this.items[i].isSelect = false;
    			}
    			item.isSelect = true;

    			//切换tab
    			var key = 'tabItem'+(index);
    			if (this.$refs[key]) {
    				dom.scrollToElement(this.$refs[key],{});
    			}
    			//传递事件
    			this.$emit("touchPage",{value: item, index: index});
    		}
    	},
    	created() {
    	},
    	mounted() {
    		for (var i in this.items) {
    			if (this.items[i].isSelect) {
    				this.touchPage(this.items[i], i);
    				return;
    			}
    		}
    	}
  	}
</script>