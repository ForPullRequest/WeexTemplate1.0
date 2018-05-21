<template>
    <div>
        <div class="content">
            <text class="commonbutton" title="alert" @click="alert">123132</text>
        </div>
        <alert :showAlert="p_showAlert"  @touchBg="alert">
            <div style="flex: 1;align-items: center">
                <text class="alertTitle">alert_title</text>
                <text class="alertMessage">alert_message</text>
            </div>
            <div class="actionArea">
                <text class="sureText" @click="sure">确定</text>
            </div>
        </alert>
    </div>

</template>

<style>
    .content {
        align-items: center;

    }
    .commonbutton {
        margin-top: 30px;
    }
    .sureText {
        flex: 1;
        line-height: 100px;
        text-align: center;
        font-size: 34px;
        color: #333333;
        border-top-color: #e2e2e2;
        border-top-width: 1px
    }
    .sureText:active {
        background-color: #f6f6f6;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .actionArea {
        height: 100px;
    }
    .alertTitle {
        text-align: center;
        margin-top: 30px;
        font-size: 36px;
        font-weight: bold
    }
    .alertMessage {
        flex: 1;
        text-align: center;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
        lines:2;
        font-size: 32px;
        text-overflow:ellipsis;
    }
</style>

<script>

    const navgation = weex.requireModule("navigator");

    export default {
        components: {
            // navgationbar: require('../../common/UINavgationBar.vue'),
            // button:       require('../../common/UIButton.vue'),
            alert:        require('./tsl-alert.vue')
        },
        props: {

        },
        computed: {

        },
        data: {
            push_Info:{},
            p_showAlert:false
        },
        methods: {
            touchBack() {
                navgation.pop();
            },
            alert() {
                this.p_showAlert = !this.p_showAlert;
            },
            sure() {
                this.alert();
            },
            actionSheet() {

            }
        },
        created() {

        }
    }
</script>