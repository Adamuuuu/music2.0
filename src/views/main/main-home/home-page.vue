<template>
  <div class="container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        input-align="center"
        placeholder="请输入搜索关键词"
        @click="handleToSearch()"
      />
    </form>

    <banner></banner>

    <van-cell-group title="音乐品味">
      <van-grid clickable>
        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/59MzRK6sHJCToqF.png"
          text="每日推荐"
          @click="handleSuggestSongs()"
          to="/playlist"
        />

        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/zTvBel1gdPy8NOo.png"
          text="歌单"
          to="/test"
          v-if="badge_numbers.wait_pay == 0"
        />
        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/3EcbUwsAqaJIkvf.png"
          text="随机播放"
          to="/test"
        />
        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/KQtU9hEInFcrRul.png"
          text="排行榜"
          to="/playlist-list"
        />
      </van-grid>
    </van-cell-group>

    <van-cell-group title="推荐歌单">
      <homePlaylist></homePlaylist>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import banner from "./c-cnps/banner.vue";
import homePlaylist from "./c-cnps/home-playlist.vue";
import router from "@/router";
import homeStore from "@/stores/main/home/home";
import playlistInfoStore from "@/stores/playlist/playlist";
import { storeToRefs } from "pinia";
import type { IPlayList, ISongs } from "@/interface";
import topListStore from "@/stores/main/home/c-cnps/top-list";
const badge_numbers = reactive({
  wait_pay: 0,
  wait_send: 4,
  wait_receive: 5,
});

const value = ref("");
const { getRecommendSongsAction } = homeStore;
const { getPlaylistSongs } = playlistInfoStore;
const { getTopListPlayList } = topListStore;
function handleToSearch() {
  router.push("/home-search");
}

function handleSuggestSongs() {
  getRecommendSongsAction().then(() => {
    const { dailySongs } = storeToRefs(homeStore);
    if (dailySongs.value) {
      console.log("这是歌曲列表", dailySongs.value);
      const dailyPlaylist = {
        songs: dailySongs.value,
        picUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        name: "每日推荐",
        description: "根据你的音乐口味生成，每天六点更新",
      };
      getPlaylistSongs(dailyPlaylist);
    }
  });
}

function handleTopList() {
  getTopListPlayList();
}
</script>

<style lang="less" scoped></style>
