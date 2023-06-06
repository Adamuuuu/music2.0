import {
  getBanner,
  getPlayList,
  getRecommendSongs,
} from "@/service/main/home/home";
import { defineStore } from "pinia";

import type { IBanners, IPlayList, ISongs } from "@/interface";
import { localCache } from "@/utils/cache";

const homeStore = defineStore("home", {
  state: () => ({
    banners: <IBanners[]>{},
    result: <IPlayList[]>{},
    dailySongs: <ISongs[]>{},
  }),
  actions: {
    //获取轮播图
    async getBannerInfo() {
      const { banners } = await getBanner();
      console.log(banners);
      this.banners = banners;
    },
    //获取歌单
    async getHomePlayList() {
      const { result } = await getPlayList();
      console.log(result);
      this.result = result;
    },
    async getRecommendSongsAction() {
      const cookie = localCache.getCache("cookie");
      const { data } = await getRecommendSongs(cookie);
      console.log("执行成功");
      const { dailySongs } = data;
      console.log("获取的日常推荐歌曲是", dailySongs);
      this.dailySongs = dailySongs;
    },
  },
});
export default homeStore();
