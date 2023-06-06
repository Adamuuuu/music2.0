<template>
  <Nav title=""></Nav>
  <div class="container">
    <div class="main">
      <!-- 歌词部分 -->
      <!-- <p>{{ lyric }}</p> -->
      <p v-for="(line, index) in currentLyricLines" :key="index">
        {{ line }}
      </p>
    </div>
    <div class="midden">
      <!-- 进度条部分 -->
      <p>这是进度条</p>
      <p>这是播放器{{ audio }}</p>
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
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item.songsname"
              @click="
                handlePlay(
                  item.player,
                  item.songsname,
                  item.list_url,
                  item.pic_url,
                  item.song_id
                )
              "
            >
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
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import playInfoStore from "@/stores/play/play";
import playSongLyricStore from "@/stores/play/playlyric";
import router from "@/router";

const { isPause, songs, list, index, currList_id, audio } = storeToRefs(
  playInfoStore()
);
const { next, prev, togglePlay, playSong } = playInfoStore();
const { getSongLyricAction } = playSongLyricStore;
const { lyric, lyricState } = storeToRefs(playSongLyricStore);
const store = playSongLyricStore;
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
console.log("这是list", currList_id.value);

getSongLyricAction(currList_id.value);

function handlePlay(
  player: string,
  songsname: string,
  url: string,
  pic_url: string,
  songId: number
) {
  playSong(player, songsname, url, pic_url, songId);
}
// 通过 actions 属性来定义菜单选项

function toSongComment() {
  router.push("/play-comment");
}

//歌词部分
watch(
  () => audio.value.currentTime,
  (currentTime) => {
    console.log("歌曲时间查询执行成功");
    store.updateCurrentLyricLine(currentTime * 1000);
  }
);

// 计算当前歌词行
const currentLyricLines = computed(() => {
  const lines = [];

  if (store.sections.length) {
    const currentSection = store.sections.find(
      (section) =>
        section.startTime <= store.audio.currentTime * 1000 &&
        (!section.lines[section.lines.length - 1].time ||
          store.audio.currentTime * 1000 <
            section.lines[section.lines.length - 1].time)
    );
    if (currentSection) {
      lines.push(currentSection.lines[currentSection.lines.length - 1].text);

      const nextSection =
        store.sections[store.sections.indexOf(currentSection) + 1];
      if (
        !nextSection ||
        store.audio.currentTime * 1000 < nextSection.startTime
      ) {
        if (currentSection.lines.length > 1) {
          lines.unshift(
            currentSection.lines[currentSection.lines.length - 2].text
          );
        }
      } else if (nextSection.lines.length) {
        lines.push(nextSection.lines[0].text);
      }
    }
  }

  return lines;
});
const currentLineIndex = lyricState.value.currentLineIndex;

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
</style>
