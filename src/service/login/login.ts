import hyRequest from "..";

export function getLoginKey() {
  return hyRequest.get({
    url: "/login/qr/key",
    params: {
      timerstamp: new Date().getTime(),
    },
  });
}

export function getLoginQrurl(key: string) {
  return hyRequest.get({
    url: `/login/qr/create`,
    params: {
      timerstamp: new Date().getTime(),
      qrimg: true,
      key: key,
    },
  });
}
export function getLoginStatus(key: string) {
  return hyRequest.get({
    url: `/login/qr/check`,
    params: {
      key: key,
      timerstamp: new Date().getTime(),
      withCredentials: true,
    },
  });
}
export function getLoginCookie(cookie: string) {
  return hyRequest.get({
    url: `login/status`,
    params: {
      cookie: cookie,
    },
  });
}
