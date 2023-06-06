import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "normalize.css";
import "../src/assets/css/reset.css";
import "@icon-park/vue-next/styles/index.css";
const app = createApp(App);
const pinia = createPinia();

app.use(router);
console.log("执行成功");
app.use(pinia);

app.mount("#app");
