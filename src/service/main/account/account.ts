import hyRequest from "@/service";
import { localCache } from "@/utils/cache";
const cookie = localCache.getCache("cookie");
//获取我的歌单
export function getAccountPlaylist(id: number) {
  return hyRequest.get({
    url: "/user/playlist",
    params: {
      uid: id,
      cookie: cookie,
    },
  });
}
//获取我的喜欢

//获取最近播放
export function getRecordSongs(id: number) {
  return hyRequest.get({
    url: "/user/record",
    params: {
      uid: id,
      type: 1,
    },
  });
}
