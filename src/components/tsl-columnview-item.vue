<template>
    <div class="item" :index="index" :style="{backgroundColor:background, borderLeftColor:borderLeftColor, borderLeftWidth:borderLeftWidth}">
        <text class="item-title" :style="{fontSize:titleSize, color:titleColor, margin: margin}">{{title}}</text>
    </div>
</template>
<style src="../css/tsl-columnview.css" lang="postcss">
</style>
<script>
    let modal = weex.requireModule('modal');
    module.exports = {
        props: {
            background: {default: "#ffffff"},
            title: {default: ""},
            // itemStyleName: {default: ""},
            index: '',
            titleColor: {default: "#333333"},
            titleSize: {default: 36},
            borderLeftColor: {default: "#1c98fc"},
            borderLeftWidth: {default: 0},
            margin:20,
        },
    };</script>
