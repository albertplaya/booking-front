import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { loadFonts } from "@/plugins/webfontloader";
import { Quasar } from "quasar";
import quasarUserOptions from "@/quasar-user-options";
import "./assets/tailwind.css";
import store from "@/store";
import { initializeApp } from "firebase/app";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import VueMixpanel from "vue-mixpanel";

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

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://7456504253ae44be808f8fec20fa9823@o1409212.ingest.sentry.io/6745240",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["app.booking.dev:8080", "app.obboco.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(store)
  .use(VueMixpanel, {
    token: "a9231ee025e12c88ce60604f93ad7f5c",
  })
  .component("downloadCsv", JsonCSV)
  .mount("#app");
