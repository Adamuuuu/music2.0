import { getPlayInfoService, getPlayUrlService } from "@/service/play/play";
import { defineStore } from "pinia";
import type { ISongs, ISongData } from "@/interface";

const playInfoStore = defineStore("play", {
  state: () => ({
    audio: new Audio(),
    songs: <ISongs[]>{},
    data: <ISongData[]>{},
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

      const { data } = await getPlayUrlService(id);

      this.data = data;

      this.audio.src = data[0].url;

      //整理数据

      const picUrl = songs[0].al.picUrl;
      const name = songs[0].ar[0].name;
      const songname = songs[0].name;
      const songId = songs[0].id;
      const url = data[0].url;
      console.log("这是songs", songs[0]);
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

      this.playSong(name, songname, url, picUrl, songId);
    },

    //播放音乐
    playSong(
      name: string,
      songname: string,
      url: string,
      pic_url: string,
      song_id: number
    ) {
      this.audio.src = url;
      this.currentTime = this.audio.currentTime;
      console.log("这是当前播放时间", this.audio.currentTime);
      this.currList_id = song_id;

      this.audio.play().then(() => {
        this.isPause = true;
      });
      if (this.audio.ended) {
        this.next();
        console.log("歌曲播放完自动播放下一首成功");
      }
      console.log("播放成功");
    },
    next() {
      this.index++;
      if (this.index >= this.list.length) {
        this.index = 1;
      }
      this.playSong(
        this.list[this.index].player,
        this.list[this.index].songsname,
        this.list[this.index].list_url,
        this.list[this.index].pic_url,
        this.list[this.index].song_id
      );
      console.log("下一首正常");
    },
    //上一首
    prev() {
      this.index--;
      if (this.index < 1) {
        this.index = this.list.length - 1;
      }
      this.playSong(
        this.list[this.index].player,
        this.list[this.index].songsname,
        this.list[this.index].list_url,
        this.list[this.index].list_url,
        this.list[this.index].song_id
      );
      console.log("上一首正常");
    },

    //判断歌曲目前是否暂停
    togglePlay() {
      console.log("这是当前播放时间", this.audio.currentTime);
      this.isPause = !this.isPause;
      if (this.isPause) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    handleLyric() {},
  },
});

export default playInfoStore;
