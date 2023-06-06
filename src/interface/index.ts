export interface IPlayList {
  id: number;
  type: number;
  name: string;
  picUrl: string;
  playCount: number;
  coverImgUrl: string;
  trackCount: number;
  creator: ICreator;
  description: string;
  songs: ISongs[];
}
export interface IBanners {
  pic: string;
  song: ISongs;
}
//歌手列表
export interface Ar {
  id: number;
  name: string;
  tns?: any[];
  alias?: any[];
}
//专辑信息
export interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns?: any[];
  picStr: string;
  pic: number;
}

export interface ISongs {
  name: string;
  id: number;
  ar: Ar[];
  artists: Ar[];
  dt: number;
  al: Al[];
  picUrl: string;
}

export interface ISongData {
  id: number;
  url: string;
  br: number;
}

export interface ICreator {
  nickname: string;
  avatarUrl: string;
}

export interface IHotcomment {
  user: {
    avatarUrl: string;
    nickname: string;
  };
  content: string;
  timeStr: string;
  likedCount: number;
}
