<template>
  <Nav title="排行榜"></Nav>
  <van-cell-group inset v-for="item in result" :key="item.id">
    <van-cell to="/playlist" @click="handlePlaylistId(item.id)">
      <template #title>
        <div class="title">
          <img :src="item.coverImgUrl" alt="" class="coverimg" />
          <div class="right">
            <p>{{ item.name }}</p>
            <p>{{ item.trackCount }}首</p>
          </div>
        </div>
      </template>
    </van-cell>
  </van-cell-group>

  <!-- 底部播放器 -->
  <van-sticky :offset-bottom="50" position="bottom">
    <div class="play">
      <!-- <List></List> -->
      <play />
    </div>
  </van-sticky>
</template>

<script lang="ts" setup>
import play from "@/components/common/play/play.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import topListStore from "@/stores/main/home/c-cnps/top-list";
import Nav from "../nav/nav.vue";

import playlistInfoStore from "@/stores/playlist/playlist";
const { getTopListPlayList } = topListStore;
const { result } = storeToRefs(topListStore);
const { getPlaylist } = playlistInfoStore;
function handlePlaylistId(id: number) {
  getPlaylist(id);
}
onMounted(() => {
  getTopListPlayList();
});
</script>

<style scoped lang="less">
.playlist {
  width: 100px;
  margin-left: 10px;
  & img {
    width: 100%;
  }
}
.coverimg {
  width: 60px;
  height: 60px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: start;
}
.right {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  & p {
    margin-left: 5px;
  }
}
.play {
  width: 100%;
  height: 50px;
  bottom: 5px;
  background-color: #39a9ed;
  position: fixed;
  bottom: 0px;
}
</style>
