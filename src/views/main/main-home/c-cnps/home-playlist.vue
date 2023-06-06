<template>
  <van-grid :gutter="10" direction="horizontal">
    <van-grid-item v-for="item in result" :key="item.id" to="/playlist">
      <div class="playlist" @click="handlePlaylistId(item.id)">
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import homeStore from "@/stores/main/home/home";
import { onMounted } from "vue";
import { localCache } from "@/utils/cache";
import playlistInfoStore from "@/stores/playlist/playlist";
const { getHomePlayList } = homeStore;
const { getPlaylist } = playlistInfoStore;
const { result } = storeToRefs(homeStore);
function handlePlaylistId(id: number) {
  getPlaylist(id);
}
onMounted(() => {
  getHomePlayList();
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
</style>
