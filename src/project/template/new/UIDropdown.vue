<template>
    <div class="wrapper" :style="{overflow: 'hidden', height: isMaskShow?getHeight:0}" :tag="tag">

        <div class="options" ref="options" :style="{ height: getHeight, visibility: isMaskShow ?'visible':'hidden', top: optionTop}"><!-- , width: mWidth -->
            <scroller>
                <div v-for="item,index in items" class="cell" :style="{ height: itemHeight, backgroundColor: itemColor }"
                      @click="onItemClick(index)">
                    <text class="name" :style="{ color: index==selectedIndex?selectedTextColor:textColor, fontSize: textSize }">{{item.name}}</text>
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
    var animation = require('./animation.js').animation;
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
                animation.opacity(this.$refs.mask, 0.1, 1, true);
                animation.translate(this.$refs.options, 0, this.items.length>this.showNum?(this.itemHeight*this.showNum):(this.items.length*this.itemHeight), true);
            },

            onItemClick(index) {
                this.selectedIndex = index;
                this.$emit('dd_itemClick',index);
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
            getSelectedId() {
                return this.selectedIndex;
            },
        }
    }
</script>