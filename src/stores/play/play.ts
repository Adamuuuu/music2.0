import { getPlayInfoService, getPlayUrlService } from "@/service/play/play";
import { defineStore } from "pinia";
import type { ISongs, ISongData } from "@/interface";

const playInfoStore = defineStore("play", {
  state: () => ({
    audio: new Audio(),
    songs: <ISongs[]>{},
    currentSongs: <ISongs>{},
    data: <ISongData[]>{},
    currList_url: "",
    currList_id: 0,
    currentTime: 0,
    list:
      [
        {
          player: "歌手名",
          songsname: "歌曲名",
          list_url: "",
          pic_url: "",
          song_id: 0,
        },
      ] || undefined,
    index: 0,
    isPause: false,
  }),

  actions: {
    async getPlayInfo(id: number) {
      //获取歌曲详情和url
      const { songs } = await getPlayInfoService(id);
      this.songs = songs;
      this.currentSongs = songs[0];
      const { data } = await getPlayUrlService(id);

      this.data = data;
      this.currList_url = data[0].url;
      // this.audio.src = data[0].url;

      //整理数据

      const picUrl = songs[0].al.picUrl;
      const name = songs[0].ar[0].name;
      const songname = songs[0].name;
      const songId = songs[0].id;
      this.currList_id = songs[0].id;
      const url = data[0].url;
      console.log("这是songs", songs[0]);
      console.log("这是url", url);
      this.index++;
      if (!this.list.some((item) => item.list_url === data.url)) {
        this.list.push({
          player: name,
          songsname: songname,
          list_url: url,
          pic_url: picUrl,
          song_id: songId,
        });
        if (this.index === this.list.length - 2) {
          this.index++;
        } else {
          this.index = this.list.length - 1;
        }
      }
      this.isPause = true;

      // this.playSong(name, songname, url, picUrl, songId);
    },

    next() {
      this.index++;
      if (this.index >= this.list.length) {
        this.index = 1;
      }
      (this.currList_url = this.list[this.index].list_url),
        console.log("下一首正常");
    },
    //上一首
    prev() {
      this.index--;
      if (this.index < 1) {
        this.index = this.list.length - 1;
      }
      (this.currList_url = this.list[this.index].list_url),
        console.log("上一首正常");
    },

    //判断歌曲目前是否暂停
    togglePlay() {
      this.isPause = !this.isPause;
      console.log("这是判断是否暂停", this.isPause);
    },
    handleLyric() {},
  },
});

export default playInfoStore;
