<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="container">
    <div class="top">
      <h1>请扫描二维码登录</h1>
    </div>
    <div class="main">
      <img :src="qrimg" alt="" style="width: 200px; height: 200px" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import userLoginStore from "@/stores/login/login";
import router from "@/router";
import { storeToRefs } from "pinia";

const store = userLoginStore();
const { handleCheck, handleUserInfo } = userLoginStore();
const { isLogin, code, qrimg } = storeToRefs(store);

if (!isLogin.value) {
  let times = setInterval(async () => {
    handleCheck();
    console.log("正在执行中");
    if (code.value === 801) {
      console.log("等待扫码");
    } else if (code.value === 802) {
      console.log("扫码中");
    } else if (code.value === 803) {
      console.log("扫码成功");
      isLogin.value = !isLogin.value;

      clearInterval(times);
      handleUserInfo().then(() => {
        router.push("/home");
      });
    }
  }, 5000);
}

onMounted(() => {
  store.loginAccountAction();
});
</script>
<style scoped lang="less">
.container {
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: center;
  flex-direction: column;
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  display: flex;

  align-items: center;
  justify-content: center;
}
</style>
