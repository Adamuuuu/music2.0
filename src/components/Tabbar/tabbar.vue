<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="tabbar">
    <router-view></router-view>

    <van-sticky :offset-bottom="50" position="bottom">
      <div class="play">
        <!-- <List></List> -->
        <play @click="toPlayPage" />
      </div>
    </van-sticky>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="search">发现</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="moment">动态</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="account">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import play from "@/components/common/play/play.vue";

import router from "@/router";
const active = ref();

console.log("这是当前router", router.currentRoute.value);
active.value = router.currentRoute.value.meta.active;
console.log("这是active的值", active.value);

function toPlayPage() {
  router.push("/play-page");
}
</script>

<style scoped lang="less">
.play {
  width: 100%;
  height: 50px;
  bottom: 5px;
  background-color: #39a9ed;
  position: fixed;
  bottom: 50px;
}
</style>
