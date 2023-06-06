import type { IPlayList } from "@/interface";
import { getAccountPlaylist } from "@/service/main/account/account";
import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

const UserPlaylistStore = defineStore("userplaylist", {
  state: () => ({
    playlist: <IPlayList[]>{},
  }),
  actions: {
    async getAccountPlaylistAction() {
      const id = localCache.getCache("userid");
      console.log("这是id");
      const { playlist } = await getAccountPlaylist(id);

      this.playlist = playlist;

      console.log("这是我创建歌单", this.playlist);
    },
  },
});

export default UserPlaylistStore();
