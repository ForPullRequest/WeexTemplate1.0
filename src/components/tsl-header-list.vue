<script>
    export default{
        props: {
            isheader:{
                default:false
            }
        },
        render: function (createElement) {
            return createElement(
                this.isheader?'tsl-header':'tsl-cell',  // tag name 标签名称
                this.isheader?this.$slots.header:this.$slots.cell // 子组件中的阵列
            )
        }
    }
</script>