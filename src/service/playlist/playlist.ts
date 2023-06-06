import hyRequest from "..";

export function getPlaylistTrack(id: number) {
  return hyRequest.get({
    url: "/playlist/track/all",
    params: {
      id: id,
    },
  });
}
export function getPlaylistDetail(id: number) {
  return hyRequest.get({
    url: "/playlist/detail",
    params: {
      id: id,
    },
  });
}
