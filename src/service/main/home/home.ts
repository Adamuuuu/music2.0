import hyRequest from "@/service";

export function getBanner() {
  return hyRequest.get({
    url: "/banner",
    params: {
      type: 2,
    },
  });
}
export function getPlayList() {
  return hyRequest.get({
    url: "/personalized",
    params: {
      limit: 6,
    },
  });
}

export function getSearchList(keywords: string) {
  return hyRequest.get({
    url: "/search",
    params: {
      keywords: keywords,
    },
  });
}

export function getRecommendSongs(cookie: string) {
  return hyRequest.get({
    url: "/recommend/songs",
    params: {
      cookie: cookie,
    },
  });
}
//获取所有榜单信息
export function getTopList() {
  return hyRequest.get({
    url: "/toplist",
  });
}
