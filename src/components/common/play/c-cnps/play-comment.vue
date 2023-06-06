<template>
  <Nav title="评论"></Nav>
  <h1>评论区</h1>
  <van-cell-group inset v-for="item in hotComments" :key="item">
    <van-cell :value="item.likedCount">
      <template #title>
        <div class="container">
          <div class="left">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="right">
            <p>{{ item.user.nickname }}</p>
            <p>{{ item.timeStr }}</p>
          </div>
        </div>
      </template>
    </van-cell>
    <p class="content">{{ item.content }}</p>
    <hr />
  </van-cell-group>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import Nav from "../../nav/nav.vue";
import playSongCommentStore from "@/stores/play/playcomment";
import playInfoStore from "@/stores/play/play";
const { currList_id } = storeToRefs(playInfoStore());
const { getPlayCommentAction } = playSongCommentStore;
const { hotComments } = storeToRefs(playSongCommentStore);
getPlayCommentAction(currList_id.value);
</script>

<style scoped lang="less">
h1 {
  margin: 20px 20px;
}
.container {
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px;
}
.left {
  & img {
    width: 50px;
    height: 50px;
  }
  margin-right: 10px;
}
.content {
  margin-left: 10px;
}
</style>
