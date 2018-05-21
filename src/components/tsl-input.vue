<template>
	<div style="flex-direction:row;height:80;">
		<input ref="input" style="flex:1;" :type="type" :return-key-type="returnKeyType" :placeholder="placeholder" placeholder-color="#cccccc" :value="value" @input="onInput" @focus="onFocus" @blur="onBlur" @return="onReturn" :max="max" :min="min"></input>
		<div v-if="value && focus" class="erase" @touchstart="onTouchStart" @touchend="onTouchEnd" @click="erase">
			<image class="erase-img" :src="eraseIcon"></image>
		</div>
	</div>
</template>

<style scoped>
	.input-row {
		flex-direction: row;
		align-items: flex-end;
		height: 60;
		padding-top: 16;
		padding-bottom: 16;
		border-bottom-width: 0;
		border-bottom-color: #DBDBDB;
	}
	.erase {
		/*background-color: #ff0000;*/
		padding-left: 26;
		padding-top: 26;
		padding-bottom: 26;
		padding-right: 26;
		width: 80;
		height: 80;
	}
	.erase-img {
		width: 28;
		height: 28;
	}
</style>

<script>
	const modal = weex.requireModule("modal");

	export default {
		data() {
			return {
				focus: false,
				eraseIcon: 'components/erase-normal',
			}
		},
		props: {placeholder: {default : ''}, returnKeyType: {default : ''}, type: {default : 'text'}, value: {default : ''}, max: {default : ''}, min: {default : ''}},
		methods: {
			doFocus() {
				this.$refs['input'].focus();
			},
			doBlur() {
				this.$refs['input'].blur();
			},
			onInput(event) {
				this.value = event.value;
				this.$emit('input', this.value);
			},
			onReturn(event) {
				this.$refs['input'].blur();
				this.$emit('return', event);
			},
			onFocus(event) {
				this.focus = true;
			},
			onBlur(event) {
				this.focus = false;
			},
			onTouchStart() {
				this.eraseIcon = 'components/erase-pressed';
			},
			onTouchEnd() {
				this.eraseIcon = 'components/erase-normal';
			},
			erase() {
				this.value = "";
				this.$emit('input', this.value);
			}
		}
	}
</script>
