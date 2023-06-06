<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content">
    <div class="top">
      <van-row>
        <van-col span="8">
          <van-image round width="4rem" height="4rem" :src="avatar" />
        </van-col>
        <van-col span="16">
          <div class="member-detail">
            <p>{{ nickname }}</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="mid">
      <van-cell-group title="音乐品味">
        <van-grid clickable>
          <van-grid-item
            icon="https://s2.loli.net/2023/03/11/59MzRK6sHJCToqF.png"
            text="我的喜欢"
          />

          <van-grid-item
            icon="https://s2.loli.net/2023/03/11/zTvBel1gdPy8NOo.png"
            text="最近播放"
            to="/playlist"
            @click="handleRecord()"
          />
          <van-grid-item
            icon="https://s2.loli.net/2023/03/11/3EcbUwsAqaJIkvf.png"
            text="下载"
            to="/test"
          />
          <van-grid-item
            icon="https://s2.loli.net/2023/03/11/KQtU9hEInFcrRul.png"
            text="云盘"
            to="/test"
          />
        </van-grid>
      </van-cell-group>
    </div>

    <!-- <van-cell-group title="基本资料">
          <van-cell title="个人资料" is-link to="/uc/profile"></van-cell>
          <van-cell title="我的消息" is-link to="/uc/address"></van-cell>
          <van-cell title="设置" is-link to="/demo"></van-cell>
      </van-cell-group> -->

    <div class="buttom">
      <p>我的歌单</p>
      <accountPlaylist></accountPlaylist>
    </div>
  </div>
</template>
<script setup lang="ts">
import { localCache } from "@/utils/cache";
import { reactive, onMounted } from "vue";
import accountPlaylist from "./c-cnps/account-playlist.vue";
import getRecordSongsStore from "@/stores/main/account/c-cnps/account-record";
import { storeToRefs } from "pinia";
import playlistInfoStore from "@/stores/playlist/playlist";
const badge_numbers = reactive({
  wait_pay: 0,
  wait_send: 4,
  wait_receive: 5,
});

const nickname = localCache.getCache("nickname");
const avatar = localCache.getCache("avatarUrl");
const userid = localCache.getCache("userid");
const { getUserRecordSongs } = getRecordSongsStore;
const { getPlaylistSongs } = playlistInfoStore;
const { songs } = storeToRefs(getRecordSongsStore);
function handleRecord() {
  getUserRecordSongs().then(() => {
    const playlist = {
      songs: songs,
      picUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      description: "最近一周的播放歌曲",
      name: "历史播放",
    };

    getPlaylistSongs(playlist);
  });
}
</script>

<style scoped lang="less">
p {
  color: black;
  text-align: center;
  line-height: 20px;
}

.content {
  background-color: #f7f8fa;
  width: 100%;
  height: 80%;
  flex-direction: column;
  padding: 15px 10px;
}
.top {
  margin-top: 20px;
}
.mid {
  margin-top: 20px;
}
.buttom {
  margin-top: 20px;
  & p {
    margin-bottom: 10px;
  }
}
.member-detail {
  font-size: 14px;
}
</style>
