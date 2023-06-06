import type { ISongs } from "@/interface";
import { getSearchList } from "@/service/main/home/home";
import { defineStore } from "pinia";

const userSearchStore = defineStore("homeSearch", {
  state: () => ({
    songs: <ISongs[]>{},
  }),
  actions: {
    async getSearchListAction(keywords: string) {
      const { result } = await getSearchList(keywords);
      this.songs = result.songs;
      console.log("这是搜索结果", result);
    },
  },
});

export default userSearchStore();
