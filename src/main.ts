import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { loadFonts } from "@/plugins/webfontloader";
import { Quasar } from "quasar";
import quasarUserOptions from "@/quasar-user-options";
import "./assets/tailwind.css";
import store from "@/store";
import { initializeApp } from "firebase/app";

loadFonts();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

import JsonCSV from "vue-json-csv";

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(store)
  .component("downloadCsv", JsonCSV)
  .mount("#app");
