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

// Firebase
/*
const firebaseConfig = {
  apiKey: "AIzaSyAVJa4IuoypObez2dyjDdPhabwks7WLKoY",
  authDomain: "obboco-26b46.firebaseapp.com",
  projectId: "obboco-26b46",
  storageBucket: "obboco-26b46.appspot.com",
  messagingSenderId: "1098902585298",
  appId: "1:1098902585298:web:259eeb05cf7dcadf97920b",
  measurementId: "G-95DBCQF4HJ",
};*/

const firebaseConfig = {
  apiKey: "AIzaSyA9Dukdf3FQyKUCdG_hevYqCffY1uAQAS8",
  authDomain: "obboco-dev.firebaseapp.com",
  projectId: "obboco-dev",
  storageBucket: "obboco-dev.appspot.com",
  messagingSenderId: "420971401417",
  appId: "1:420971401417:web:5afc6f77603602788b7d18",
  measurementId: "G-30QF8B26R8",
};

initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(store)
  .mount("#app");
