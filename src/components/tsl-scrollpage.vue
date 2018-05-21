<template>
    <tsl-scrollpage style="flex:1;" scroll-direction="horizontal" show-scrollbar="false" @pagescroll="onpagescroll"
                    @change="itemChanged">
        <slot></slot>
    </tsl-scrollpage>
</template>
<style>
</style>
<script>
    module.exports = {
        methods:{
            itemChanged:function (val) {
                this.$emit('pagechange', val);
            }
        }
    }
</script>