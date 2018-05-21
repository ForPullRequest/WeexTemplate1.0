<template>
	<div :class="[type === 'left' ? 'left' : 'right']" :style="{height: size, width: size/2+width}">
		<div class="high-half-line" :style="{'background-color':color, transform: 'translateY(-' + tY + ') rotate(45deg)', transformOrigin: '0 ' + len, height: len, width: width}" >
		</div>
		<div style="margin-top: 1" class="low-half-line" :style="{'background-color':color, transform: 'translateY(-' + tY + ') rotate(-45deg)', height: len-1, width: width}">
		</div>
	</div>
</template>

<style scoped>
	.high-half-line {
		/*transform: translateY(-8) rotate(45deg);*/
	}
	.low-half-line {
		/*transform: translateY(-8) rotate(-45deg);*/
		transform-origin: 0 -1;
	}
	.left {
		
	}
	.right {
		transform: rotate(180deg);
	}
</style>

<script>
	export default {
		props: {
			type: {
				default: 'right',
			},
			color: {
				default: '#389AFF'
			},
			size: {  // 箭头控件大小
				default: 40,
				type: Number,
			},
			width: { // 箭头宽度
				default: 4, 
				type: Number,
			}
		},
		computed: {
			tY() {
				return this.size*0.707 - this.size/2;
			},
			len() {
				return this.size*0.707;
			}
		}
	}
</script>