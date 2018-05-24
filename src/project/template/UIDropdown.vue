<template>
    <div class="wrapper" :style="{overflow: 'hidden', height: isMaskShow?getHeight:0}" :tag="tag">
        <div class="options" ref="options" :style="{ height: getHeight, visibility: isMaskShow ?'visible':'hidden', top: optionTop}">
            <scroller>
                <div v-for="item,index in items" class="cell" :style="{ height: itemHeight, backgroundColor: itemColor }"
                      @click="onItemClick(index)">
                    <text class="name" :style="{ color: index==selectedIndex?selectedTextColor:textColor, fontSize: textSize }">{{item}}</text>
                    <image class="icon-curr-flag" src="iconSelect" v-if="index==selectedIndex"></image>
                </div>
            </scroller>
        </div>
    </div>
</template>
<style lang="postcss">
    .wrapper {
        position: relative;
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        flex: 1;
        background-color: rgba(0, 0, 0, .5);
        visibility: hidden;
    }

    .select {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 30;
        padding-right: 30;

        border-bottom-width: 1;
        border-style: solid;
        border-color: #ddd;
        height: 100px;
        background-color: white;
    }

    .options {
        position: absolute;
        left: 0;
        right: 0;
        background-color: #fff;
        transform-origin: center center;
        z-index: 100;
    }

    .cell {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 54;
        padding-right: 54;
        border-bottom-width: 1;
        border-style: solid;
        border-color: #ddd;
    }

    .name {
        flex: 1;
        padding-right: 10;
        flex-wrap: wrap;
        lines:2;
        text-overflow: ellipsis;
    }

    .icon-curr-flag {
        width: 32;
        height: 32;
    }

    .icon-arrow {
        width: 27;
        height: 23;
    }


</style>
<script>
    var m = require('@weex-module/modal');
    module.exports = {
        data(){
            return {
                mWidth: 750,
                selectedIndex: '-1',
                headerColor: '#dfdfdf',
                headerHeight: 90,
                isMaskShow: false,
                itemHeight: 90,
                itemColor: 'white',
            }
        },
        props: {
            items: {default : [
                    {id: '0', name: 'All'},
                    {id: '1', name: 'Doing'},
                    {id: '2', name: 'Done'}
                ]}, 
            tag: {default : ''}, 
            showNum: {default : 5}, 
            textSize: {default : 32}, 
            textColor: {default : '#000000'},
            selectedTextColor: {default : '#0088FB'}
        },
        computed: {
            optionTop(){
                return this.items.length>this.showNum?-(this.itemHeight*(this.showNum)):-((this.items.length)*this.itemHeight);
            },
            getHeight(){
                return this.items.length>this.showNum?this.itemHeight*this.showNum:this.items.length*this.itemHeight;
            }
        },
        methods: {
            switchView() {
                this.isMaskShow = !this.isMaskShow;
                opacity(this.$refs.mask, 0.1, 1, true);
                translate(this.$refs.options, 0, this.items.length>this.showNum?(this.itemHeight*this.showNum):(this.items.length*this.itemHeight), true);
            },

            onItemClick(index) {
                this.selectedIndex = index;
                this.$emit('dd_itemClick', this.items[this.selectedIndex].name);
            },

            toggleMaskVisible() {
                
            },

            setSelected(selected) {
                for (var i = 0; i < this.items.length; i++) {
                    if(this.items[i].name==selected){
                        this.selectedIndex = i;
                        break;
                    }
                }
            },

            getSelected() {
                return this.items[this.selectedIndex].name;
            },

            getSelectedId() {
                return this.selectedIndex;
            },

            //透明度变化
            opacity: function (ref, fromValue, toValue, reverse, callback) {
                var self = this;
                if (reverse) {
                  self.data.current_opacity = self.data.current_opacity === toValue ? fromValue : toValue;
                } else {
                  self.data.current_opacity = toValue;
                }

                self.anim(ref, {
                    opacity: self.data.current_opacity
                }, 'ease-in-out', 500, callback);
            },

            //平移
            translate: function (ref, offsetX, offsetY, reverse, callback) {

                if (reverse) {
                  var translate = 'translate(' + offsetX + ', ' + offsetY + ')';
                  this.data.current_translate = this.data.current_translate!='' ? '' : translate;
                } else {
                  this.data.offsetX = this.data.offsetX + offsetX;
                  this.data.offsetY = this.data.offsetY + offsetY;
                  var translate = 'translate(' + this.data.offsetX + ', ' + this.data.offsetY + ')';
                  this.data.current_translate = translate;
                }

                this.anim(ref, {
                    transform: this.data.current_translate
                }, 'ease-in-out', 500, callback);
            },
        }
    }
</script>