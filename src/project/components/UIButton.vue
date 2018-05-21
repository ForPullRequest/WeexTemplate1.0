<template>
    <div class="container" :style="{height:height+'px',
                                    width:width+'px',
                                    'border-radius':borderRadius+'px',
                                    'border-color':boardColor,
                                    'border-width':boardWidth}" @click="touchButton">
        <text :style="{color:titleColor,'font-size':titleFont+'px'}">{{title}}</text>
    </div>
</template>

<style>
    .container {
        align-items: center;
        justify-content: center;
    }
</style>

<script>
    export default {
        components: {
            //import
        },
        props: {
            height:         {default:90},
            width:          {default:690},
            boardColor:     {default:'#e2e2e2'},
            boardWidth:     {default:0},
            borderRadius:   {default:10},
            title:          {default:''},
            titleColor:     {default:'white'},
            titleFont:      {default:34}
        },
        data: {
            //attribute
        },
        methods: {
            //methods
            touchButton() {
                this.$emit("buttonAction",{})
            }
        },
        computed: {
            //get set
        }
    }
</script>