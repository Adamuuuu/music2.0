import type { IPlayList, ISongs } from "@/interface";
import {
  getPlaylistDetail,
  getPlaylistTrack,
} from "@/service/playlist/playlist";
import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

const playlistInfoStore = defineStore("playlist", {
  state: () => ({
    songs: <ISongs[]>{},
    playlist: <IPlayList>{},
  }),
  actions: {
    clearPlaylist() {
      this.songs = <ISongs[]>{};
      this.playlist = <IPlayList>{};
    },
    async getPlaylist(id: number) {
      this.clearPlaylist();
      const { playlist } = await getPlaylistDetail(id);
      const { songs } = await getPlaylistTrack(id);
      this.songs = songs;
      this.playlist = playlist;
      console.log("这是歌单详情", this.playlist);
    },
    async getPlaylistSongs(playlist: any) {
      this.clearPlaylist();
      this.songs = playlist.songs;
      this.playlist.coverImgUrl = playlist.picUrl;
      this.playlist.description = playlist.description;
      this.playlist.name = playlist.name;
      console.log("日常歌单查询成功", playlist);
    },
  },
});
export default playlistInfoStore();
