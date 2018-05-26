<script>
    module.exports = {
        props: {
            label: '',
        },
        mounted() {
            this.$parent.addPanes(this,this.label);
        },
    }
</script>