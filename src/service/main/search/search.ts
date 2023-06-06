import hyRequest from "@/service";

export function getLoginKey() {
  return hyRequest.get({
    url: "/login/qr/key",
    params: {
      timerstamp: new Date().getTime(),
    },
  });
}
