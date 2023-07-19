<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="container">
    <div class="left">
      <img :src="currentSong.pic_url" />
      <p>{{ currentSong.songsname }}--{{ currentSong.player }}</p>
    </div>
    <div class="right">
      <!-- 上一首 -->
      <iconPark :icon="GoStart" size="32" @click.stop="handleprev()"></iconPark>
      <!-- 播放 -->
      <iconPark
        :icon="isPause ? PauseOne : Play"
        size="32"
        @click.stop="handletogglePlay"
      ></iconPark>
      <!-- 下一首 -->
      <iconPark :icon="GoEnd" size="32" @click.stop="handlenext()"></iconPark>

      <!-- 播放列表 -->
      <iconPark
        :icon="MusicList"
        size="32"
        @click.stop="showBottom = !showBottom"
      >
      </iconPark>
      <van-popup
        v-model:show="showBottom"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-list>
          <van-cell v-for="item in list" :key="item" :title="item.songsname">
            {{ item.player }}
          </van-cell>
        </van-list>
      </van-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch } from "vue";
import iconPark from "@/components/common/iconPark.vue";
import { GoEnd, GoStart, MusicList, PauseOne, Play } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";

import playInfoStore from "@/stores/play/play";

const { currentSongs, list, index, currList_url, isPause, audio } = storeToRefs(
  playInfoStore()
);
const { next, prev, togglePlay } = playInfoStore();
const showBottom = ref(false);
// const audio = ref(new Audio());
watch(currList_url, () => {
  console.log("回调函数执行成功");
  audio.value.load();
  audio.value.src = currList_url.value;
  isPause.value = true;
  audio.value.play();

  if (audio.value.ended) {
    next();
  }
});

//控制播放暂停

//监听时间更新
// watchEffect(() => {
//   audio.value.addEventListener("timeupdate", () => {
//     console.log(audio.value.currentTime);
//   });
// });
function handleprev() {
  prev();
  // audio.value.src = currList_url.value;
}
function handletogglePlay() {
  togglePlay();
  if (isPause.value) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
}
function handlenext() {
  next();
  // audio.value.src = currList_url.value;
}

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
