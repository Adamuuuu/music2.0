<template>
  <Nav title=""></Nav>
  <div class="container">
    <div class="main">
      <!-- 歌词部分 -->
      <!-- <p>{{ sections }}</p> -->
      <p v-for="(line, index) in sections" :key="index">
        {{ line.lines[0].text }}
      </p>
    </div>
    <div class="midden">
      <!-- 进度条部分 -->
      <van-progress pivot-text="红色" color="#ee0a24" :percentage="50" />
    </div>
    <div class="bottom">
      <!-- 暂停，上下切换，音乐列表，评论 -->
      <div class="bottom-left">
        <iconPark :icon="Comment" size="32" @click="toSongComment()"></iconPark>
      </div>
      <div class="bottom-main">
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
      </div>
      <div class="bottom-right">
        <!-- 播放列表 -->
        <iconPark :icon="MusicList" size="32" @click="showBottom = !showBottom">
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
  </div>
</template>

<script lang="ts" setup>
import Nav from "../../nav/nav.vue";
import iconPark from "@/components/common/iconPark.vue";
import {
  GoEnd,
  GoStart,
  MusicList,
  PauseOne,
  Play,
  Comment,
} from "@icon-park/vue-next";
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import playInfoStore from "@/stores/play/play";
import playSongLyricStore from "@/stores/play/playlyric";
import router from "@/router";

const { currentSongs, list, index, currList_url, currList_id, isPause, audio } =
  storeToRefs(playInfoStore());
const { next, prev, togglePlay } = playInfoStore();
const { getSongLyricAction } = playSongLyricStore;
const { lyricState, sections } = storeToRefs(playSongLyricStore);
// const store = playSongLyricStore;
const showBottom = ref(false);
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
function handleprev() {
  prev();
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
}
getSongLyricAction(currList_id.value);
// 通过 actions 属性来定义菜单选项
interface ISections {
  startTime: number;
  lines: {
    time: number;
    text: string;
  }[];
}
[];
function getLyricIndex(sections: ISections[], currentTime: number) {
  let index = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    const lyric = sections[i];
    if (lyric.startTime > currentTime * 1000) {
      index = i - 1;
      break;
    }
  }
  return index;
}
let lyricIndex = -1;
watchEffect(() => {
  if (audio.value) {
    audio.value.addEventListener("timeupdate", handleTimeUpdate);
    console.log("监听函数执行成功");
  }
});
function handleTimeUpdate() {
  const audioElement = audio.value;
  const currentTime = audioElement.currentTime;
  const newIndex = getLyricIndex(sections.value, currentTime);
  if (newIndex !== lyricIndex) {
    lyricIndex = newIndex;
    console.log(sections.value[lyricIndex]?.lines[0].text);
  }
}

function toSongComment() {
  router.push("/play-comment");
}

// 需要通过 return 将值暴露出去
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}
.main {
  display: flex;

  flex: 1;
  flex-direction: column;
  margin-top: 20px;
  justify-self: center;
  align-items: center;
}
.midden {
  display: flex;
  margin-bottom: 20px;
  justify-self: center;
  align-items: center;
}
.bottom {
  display: flex;
  width: 100%;
  justify-self: center;
  align-items: center;
}
.bottom-left {
  margin-left: 20px;
  display: flex;
  justify-self: start;
  align-items: center;
}
.bottom-main {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.bottom-right {
  display: flex;
  justify-self: end;
  align-items: center;
  margin-right: 20px;
}
p {
  position: relative;
  height: 30px;
  overflow: hidden;
  text-align: center;
  line-height: 30px;
  color: #000;
}

p.active {
  color: #e21e1eaf;
}
</style>
