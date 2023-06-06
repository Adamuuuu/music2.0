<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="container">
    <div class="left">
      <img :src="currentSong.pic_url" />
      <p>{{ currentSong.songsname }}--{{ currentSong.player }}</p>
    </div>
    <div class="right">
      <!-- 上一首 -->
      <iconPark :icon="GoStart" size="32" @click="handleprev()"></iconPark>
      <!-- 播放 -->
      <iconPark
        :icon="isPause ? PauseOne : Play"
        size="32"
        @click="handletogglePlay"
      ></iconPark>
      <!-- 下一首 -->
      <iconPark :icon="GoEnd" size="32" @click="handlenext()"></iconPark>

      <!-- 播放列表 -->
      <iconPark :icon="MusicList" size="32" @click="showBottom = !showBottom">
      </iconPark>
      <van-popup
        v-model:show="showBottom"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-list>
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item.songsname"
            @click="
              handlePlay(
                item.player,
                item.songsname,
                item.list_url,
                item.pic_url
              )
            "
          >
            {{ item.player }}
          </van-cell>
        </van-list>
      </van-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import iconPark from "@/components/common/iconPark.vue";
import { GoEnd, GoStart, MusicList, PauseOne, Play } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";

import playInfoStore from "@/stores/play/play";

const { isPause, songs, list, index } = storeToRefs(playInfoStore());
const { next, prev, togglePlay, playSong } = playInfoStore();
const showBottom = ref(false);
function handleprev() {
  prev();
}
function handletogglePlay() {
  togglePlay();
}
function handlenext() {
  next();
}

function handlePlay(
  player: string,
  songsname: string,
  url: string,
  pic_url: string
) {
  playSong(player, songsname, url, pic_url);
}
// 通过 actions 属性来定义菜单选项

const currentSong = computed(() => {
  console.log("计算属性绑定成功");
  return list.value[index.value];
});
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
  justify-content: start;

  & img {
    margin-left: 10px;
    width: 15%;
    border-radius: 50%;
  }
  & p {
    margin-left: 10px;
  }
}
.right {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 10px;
}
</style>
