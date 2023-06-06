import hyRequest from "..";

export function getPlaylistList(id: number) {
  return hyRequest.get({
    url: "/playlist/track/all",
    params: {
      id: id,
    },
  });
}
