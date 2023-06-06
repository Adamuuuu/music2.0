import { defineStore } from "pinia";
import { getPlayLyricService } from "../../service/play/play";
import { getPlayInfoService } from "@/service/play/play";
import { reactive } from "vue";
interface LyricLine {
  time: number;
  text: string;
}

interface LyricSection {
  startTime: number;
  lines: LyricLine[];
}

interface LyricState {
  lyric: string;
  audio: HTMLAudioElement;
  sections: {
    startTime: number;
    lines: {
      time: number;
      text: string;
    }[];
  }[];
  lyricState: {
    sections?: LyricSection[];
    currentLineIndex?: number;
    currentLyricLine?: string;
    nextLyricLine?: string;
  };
}

function parseLyric(lyric: string): LyricSection[] {
  const lines = lyric.split("\n");
  const sections: LyricSection[] = [];
  let prevTime = 0;

  for (const line of lines) {
    const match = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/.exec(line);
    if (match) {
      const minute = parseInt(match[1], 10);
      const second = parseInt(match[2], 10);
      const millisecond = parseInt(match[3], 10);
      const text = match[4];

      const currentTime = minute * 60 * 1000 + second * 1000 + millisecond;
      const delta = currentTime - prevTime;

      if (delta > 0 && sections.length > 0) {
        // 将歌词行加入到上一个分节中
        const lastSection = sections[sections.length - 1];
        lastSection.lines.push({
          time: prevTime,
          text: "",
        });
      }

      // 创建一个新的分节
      sections.push({
        startTime: currentTime,
        lines: [
          {
            time: currentTime,
            text,
          },
        ],
      });
      prevTime = currentTime;
    } else {
      // 不是有效的歌词行，直接跳过
      continue;
    }
  }

  // 如果最后一个分节没有结束时间，则用下一分节的开始时间作为结束时间
  if (sections.length > 0) {
    const lastSection = sections[sections.length - 1];
    if (!lastSection.lines[lastSection.lines.length - 1].time) {
      lastSection.lines.pop();
      lastSection.lines.push({
        time: lastSection.startTime + 60 * 1000, // 默认一分钟作为结束时间
        text: "",
      });
    }
  }

  return sections;
}

interface ILyricStateData {
  sections: LyricSection[];
  currentLineIndex?: number;
  currentLyricLine?: string;
  nextLyricLine?: string;
}

// const lyricState = reactive<{
//   sections?: LyricSection[];
//   currentLineIndex?: number;
//   currentLyricLine?: string;
//   nextLyricLine?: string;
// }>({
//   sections: [],
// });

const playSongLyricStore = defineStore("lyric", {
  state: (): LyricState => ({
    lyric: "",
    audio: new Audio(),
    sections: [],
    lyricState: {},
  }),
  getters: {},
  actions: {
    async getSongLyricAction(id: number) {
      //获取歌曲信息
      const { songs } = await getPlayInfoService(id);
      //获取歌词信息
      const { lrc } = await getPlayLyricService(id);
      const { lyric } = lrc;
      this.lyric = lyric;
      this.lyricState.sections = parseLyric(lyric);
      console.log("这是歌词数据", this.lyricState.sections);
    },
    updateCurrentLyricLine(currentTime: number) {
      let currentLineIndex = -1;
      let currentLyricLine = "";
      let nextLyricLine = "";

      for (let i = this.lyricState.sections!.length - 1; i >= 0; i--) {
        const section = this.lyricState.sections![i];
        if (currentTime >= section.startTime) {
          for (let j = section.lines.length - 1; j >= 0; j--) {
            const line = section.lines[j];
            if (currentTime >= line.time) {
              currentLineIndex = j;
              currentLyricLine = line.text;
              if (j + 1 < section.lines.length) {
                nextLyricLine = section.lines[j + 1].text;
              }
              break;
            }
          }
          break;
        }
      }
      console.log("这是歌词相关数据", currentLineIndex);
      console.log("这是歌词相关数据", currentLyricLine);
      console.log("这是歌词相关数据", nextLyricLine);
      this.lyricState.currentLineIndex = currentLineIndex;
      this.lyricState.currentLyricLine = currentLyricLine;
      this.lyricState.nextLyricLine = nextLyricLine;
    },
  },
});

export default playSongLyricStore();
