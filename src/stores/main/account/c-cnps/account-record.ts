import type { ISongs } from "@/interface";
import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

import { getRecordSongs } from "@/service/main/account/account";
const getRecordSongsStore = defineStore("record", {
  state: () => ({
    songs: <ISongs[]>{},
  }),
  actions: {
    async getUserRecordSongs() {
      const uid = localCache.getCache("userid");
      const result = await getRecordSongs(uid);
      const { weekDate } = await getRecordSongs(uid);
      console.log("这是历史播放", result);
      this.songs = weekDate;
    },
  },
});

export default getRecordSongsStore();
