import {
  getLoginCookie,
  getLoginKey,
  getLoginQrurl,
  getLoginStatus,
} from "@/service/login/login";
import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

const userLoginStore = defineStore("login", {
  state: () => ({
    cookie: "",
    key: "",
    qrurl: "",
    qrimg: "",
    isLogin: false,
    code: 0,
  }),
  actions: {
    async loginAccountAction() {
      const unikey = await getLoginKey();
      console.log("这是key", unikey);
      this.key = unikey.data.unikey;
      const qrurl = await getLoginQrurl(this.key);
      this.qrimg = qrurl.data.qrimg;
    },
    async handleCheck() {
      const status = await getLoginStatus(this.key);
      console.log("这是status成功后的结果", status);
      const cookie = status.cookie;
      const regex = /MUSIC_U=(\w+);/;
      const match = cookie.match(regex);
      if (match) {
        this.cookie = "MUSIC_U=" + match[1];
        console.log("这是cookie", this.cookie);
      }

      localCache.setCache("cookie", this.cookie);
      this.code = status.code;

      console.log(666);
    },
    async handleUserInfo() {
      const cookie = localCache.getCache("cookie");
      console.log("这是cookie", cookie);
      const result = await getLoginCookie(cookie);
      console.log("这是登陆后的信息", result);
      console.log(result.data);
      localCache.setCache("userid", result.data.account.id);
      localCache.setCache("avatarUrl", result.data.profile.avatarUrl);
      localCache.setCache("nickname", result.data.profile.nickname);
    },
  },
});
export default userLoginStore;
