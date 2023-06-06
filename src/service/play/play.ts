import hyRequest from "..";

export function getPlayInfoService(id: number) {
  return hyRequest.get({
    url: "/song/detail",
    params: {
      ids: id,
    },
  });
}

export function getPlayUrlService(id: number) {
  return hyRequest.get({
    url: "/song/url",
    params: {
      id: id,
    },
  });
}
//获取歌曲歌词
export function getPlayLyricService(id: number) {
  return hyRequest.get({
    url: "/lyric",
    params: {
      id: id,
    },
  });
}
//获取歌曲评论
export function getPlayCommentService(id: number) {
  return hyRequest.get({
    url: "/comment/music",
    params: {
      id: id,
      limit: 1,
    },
  });
}
