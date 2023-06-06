<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <Nav title="歌单"></Nav>

  <div class="container">
    <div class="top">
      <div class="top-top">
        <div class="top-left">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
        <div class="top-right">
          <p>{{ playlist.name }}</p>
          <!-- <div class="creator">
            <img :src="playlist.creator.avatarUrl" alt="" />
            <p>{{ playlist.creator.nickname }}</p>
          </div> -->
        </div>
      </div>
      <div class="top-buttom">
        <van-text-ellipsis
          rows="3"
          :content="playlist.description"
          expand-text="展开"
          collapse-text="收起"
        />

        <!-- <p>{{ playlist.description }}</p> -->
      </div>
    </div>
    <div class="main">
      <h3>歌曲列表</h3>
      <van-list v-model:loading="loading">
        <van-cell
          v-for="item in songs"
          :key="item"
          :title="item.name"
          @click="handlePlay(item.id)"
        >
          {{ item.ar[0].name }}
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onMounted } from "vue";
import Nav from "../nav/nav.vue";
import playInfoStore from "@/stores/play/play";
const loading = ref(true);
import playlistInfoStore from "@/stores/playlist/playlist";

const { songs, playlist } = storeToRefs(playlistInfoStore);

const { getPlaylist } = playlistInfoStore;
const playStore = playInfoStore;
const { getPlayInfo } = playStore();

function handlePlay(id: number) {
  getPlayInfo(id);
}
onMounted(() => {
  loading.value = false;
});
</script>

<style scoped lang="less">
// .container {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// }
.container {
  width: 100%;
}
.top {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 20px;
}
.top-left {
  display: flex;
  align-items: center;
  justify-content: start;
  & img {
    width: 100px;
    height: 100px;
  }
}
.top-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  margin-left: 10px;
}
.main {
  margin-top: 20px;
  margin-left: 10px;
}
.creator {
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  & p {
    margin: 10px;
  }
}
</style>
