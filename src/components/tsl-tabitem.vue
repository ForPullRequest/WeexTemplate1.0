<template>
    <div class="container" :style="{ backgroundColor: backgroundColor }" @click="onclickitem">
        <image class="top-line" src="tabbar_line"></image>
        <div style="padding-left:16;padding-right:16;">
          <image class="tab-icon" :src="icon"></image>
          <tsl-redpoint style="position:absolute;right:0;top:0;" :badge="badge" :show-badge="showBadge"></tsl-redpoint>
        </div>
        <text class="tab-text" :style="{ color: titleColor }">{{title}}</text>
    </div>
</template>




<script>
module.exports = {
  components: {
    tslRedpoint: require("./tsl-redpoint.vue")
  }
};</script>
