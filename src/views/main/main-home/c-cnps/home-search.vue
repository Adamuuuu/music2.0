<template>
  <Nav title="搜索结果"></Nav>
  <form action="/">
    <van-search
      v-model="value"
      show-action
      input-align="center"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
  </form>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in songs" :key="item" :title="item.name">
      {{ item.artists[0].name }}
    </van-cell>
  </van-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import userSearchStore from "@/stores/main/home/c-cnps/home-search";
import { storeToRefs } from "pinia";
import Nav from "@/components/common/nav/nav.vue";

const value = ref("");
const loading = ref(false);
const finished = ref(false);
const { getSearchListAction } = userSearchStore;
const { songs } = storeToRefs(userSearchStore);
function onSearch() {
  getSearchListAction(value.value);
}
const onLoad = () => {
  loading.value = false;
  console.log("执行成功了");
  // 数据全部加载完成
  if (songs.value.length >= 30) {
    finished.value = true;
  }
};
</script>

<style scoped lang="less"></style>
