import { localCache } from "@/utils/cache";
import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const cookie = localCache.getCache("cookie");

      // const token = JSON.parse(localCache.getCache("token") || "");
      // if (cookie) {
      //   config.params += "&" + cookie;
      // }
      return config;
    },
  },
});

export default hyRequest;
