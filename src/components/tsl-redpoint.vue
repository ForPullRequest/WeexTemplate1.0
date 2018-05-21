<template>
  <div class="red-point"
       :style="{ visibility: badge==0?'hidden':'visible',  borderRadius: showBadge?size/2.0:8 }">
    <text v-if="showBadge" class="number" :style="{ fontSize: textSize }">{{badge}}</text>
  </div>
</template>

<style>
  .red-point {
    background-color: red;
    align-items: center;
    padding-left: 6;
    padding-right: 6;
  }
  .number {
    color: white;
    text-align: center;
    flex: 1;
  }
</style>
<script>
module.exports = {
  props: {
    badge: {
      default: 0
    },
    size: {
      default: 32
    },
    textSize: {
      default: 22
    },
    showBadge: {
      default: true
    }
  }
};</script>
