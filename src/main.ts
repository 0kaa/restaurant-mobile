import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./index.css";
import { IonicVue, iosTransitionAnimation } from "@ionic/vue";
import { createI18n } from "vue-i18n";
import en from "./locales/en-US.json";
import ar from "./locales/ar.json";
import BaseLayout from "./components/BaseLayout.vue";

import { Preferences } from "@capacitor/preferences";

type MessageSchema = typeof en | typeof ar;

const deviceLanguage = navigator.language.split("-")[0];
const i18n = createI18n<[MessageSchema], "en" | "ar">({
  locale: deviceLanguage,
  messages: {
    en,
    ar,
  },
});
if (deviceLanguage === "ar") {
  // add direction to root css
  document.documentElement.setAttribute("dir", "rtl");
} else {
  // add direction to root css
  document.documentElement.setAttribute("dir", "ltr");
}

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:8000/graphql",
  fetch: async (uri: RequestInfo, options: RequestInit) => {
    const { value } = await Preferences.get({ key: "token" });
    if (value) {
      options.headers = {
        ...options.headers,
        Authorization: value,
      };
    }
    return fetch(uri, options);
  },
});

// Cache implementation
const cache = new InMemoryCache({
  addTypename: false,
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(IonicVue, {
    navAnimation: iosTransitionAnimation,
  })
  .use(router)
  .use(i18n);

app.component("base-layout", BaseLayout);

router.isReady().then(() => {
  app.mount("#app");
});
