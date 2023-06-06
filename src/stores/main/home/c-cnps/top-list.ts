import { getTopList } from "@/service/main/home/home";
import { defineStore } from "pinia";

import type { IBanners, IPlayList, ISongs } from "@/interface";
import { localCache } from "@/utils/cache";

const topListStore = defineStore("topList", {
  state: () => ({
    banners: <IBanners[]>{},
    result: <IPlayList[]>{},
    dailySongs: <ISongs[]>{},
  }),
  actions: {
    //获取歌单
    async getTopListPlayList() {
      const { list } = await getTopList();
      console.log(list);
      this.result = list;
      console.log("这是排行榜歌单", list);
    },
  },
});
export default topListStore();
