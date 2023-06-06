<template>
  <!-- <van-grid :gutter="10" direction="horizontal">
    <van-grid-item v-for="item in playlist" :key="item.id">
      <div class="playlist">
        <img :src="item.coverImgUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </van-grid-item>
  </van-grid> -->
  <van-cell-group inset v-for="item in playlist" :key="item.id">
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
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import UserPlaylistStore from "@/stores/main/account/c-cnps/account-playlist";

import playlistInfoStore from "@/stores/playlist/playlist";
const { getAccountPlaylistAction } = UserPlaylistStore;
const { playlist } = storeToRefs(UserPlaylistStore);
const { getPlaylist } = playlistInfoStore;
function handlePlaylistId(id: number) {
  getPlaylist(id);
}
onMounted(() => {
  getAccountPlaylistAction();
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
</style>
