import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { loadFonts } from "@/plugins/webfontloader";
import { Quasar } from "quasar";
import quasarUserOptions from "@/quasar-user-options";
import VueAuth0Plugin from "vue-auth0-plugin";
import "./assets/tailwind.css";
import store from "@/store";

loadFonts();

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(store)
  .use(VueAuth0Plugin, {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    client_id: import.meta.env.VITE_AUTH_KEY,
  })
  .mount("#app");
