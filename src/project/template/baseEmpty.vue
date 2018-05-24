<template>
    <base title="title" @baseAppear="appear">
    
    </base>
</template>

<style>

</style>

<script>
const normal = require('../js/normal.js').normal;
export default{
    components: {
        base: require('./base.vue'),
    },
    data:()=>({
        
    }),
    created(){
        
    },
    methods:{
        appear(){

        },
    }
}
</script>