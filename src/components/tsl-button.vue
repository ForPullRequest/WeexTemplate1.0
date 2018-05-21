<template>
    <div :class="['btn','btn-'+(type),'btn-sz-'+(size), enabled ? (selected ? 'pressed' : 'enabled' ): 'disabled']"
         :style="{borderColor:selected?borderpresscolor:bordercolor,borderWidth:borders}"
         @touchstart="touchstart" @touchend="touchend" @touchcancel="touchcancel" :tag="tag">
         <text :style="{color:'#fff',fontSize:titleSize}">{{title}}</text>
        <slot></slot>
    </div>
</template>

<style src="../css/tsl-button.css" lang="postcss">
    
</style>
<script>
    var Color = require("color");
    let modal = weex.requireModule('modal');
    module.exports = {
        props: {
            //由style size组成
            //style由default success warning danger及各自的border版组成
            //size分small-28 normal-32 large-36
            type: {
                default :'default normal'
            },
            title:{
                default:''
            },
            enabled: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {
                pressbackgroundcolor: '',
                borderpresscolor: '',
                backgroundcolor: '',
                // selectcolor: '',
                bordercolor: '',
                selected: false,
                style: '',
                size: '',
                borders:0,
                title:'',
                titleColor:'#fff',
                titleSize:0,
            }
        },
        mounted() {
            
        },
        methods: {
            touchstart: function (e) {
                this.selected = true;
                this.backgroundcolor = e.target.style.backgroundColor;
                var color = Color(this.backgroundcolor).alpha(0.5);
                this.pressbackgroundcolor = color.rgbaString();
                if (''!=e.target.style.borderColor) {
                    var bordercolor = Color(e.target.style.borderColor).alpha(0.5);
                    this.borderpresscolor = bordercolor.rgbaString();
                }
            },
            touchend: function () {
                this.selected = false;
            },
            touchcancel: function () {
                this.selected = false;
            }
        },
        created: function () {
            this.style = this.type.split(" ")[0];
            this.size = this.type.split(" ")[1];
            if (this.style=='default'||this.style.indexOf("border")>=0) {
                this.titleColor = 'black';
            } else {
                this.titleColor = 'white';
            }
            if (this.size=='small') {
                this.titleSize = '28';
            } else if (this.size=='normal') {
                this.titleSize = '32';
            } else if (this.size=='large') {
                this.titleSize = '36';
            }
            switch (this.style) {
                case 'default':
                    this.backgroundcolor = '#E5E9F2';
                    this.borders = 0;
                    break;
                case 'border-default':
                    this.bordercolor = '#E5E9F2';
                    this.backgroundcolor = 'white';
                    this.borders = 1;
                    break;
                case 'success':
                    this.backgroundcolor = '#13ce66'
                    this.borders = 0;;
                    break;
                case 'border-success':
                    this.bordercolor = '#13ce66';
                    this.backgroundcolor = 'white';
                    this.borders = 1;
                    break;
                case 'warning':
                    this.backgroundcolor = '#f7ba2a';
                    break;
                case 'border-warning':
                    this.bordercolor = '#f7ba2a';
                    this.backgroundcolor = 'white';
                    this.borders = 1;
                    break;
                case 'danger':
                    this.backgroundcolor = '#ff4949';
                    this.borders = 0;
                    break;
                case 'border-danger':
                    this.bordercolor = '#ff4949';
                    this.backgroundcolor = 'white';
                    this.borders = 1;
                    break;
                default:
                    this.backgroundcolor = 'white';
                    break;
            }
        },
    }
</script>
