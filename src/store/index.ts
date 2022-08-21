import { createStore } from "vuex";
import { Preferences } from "@capacitor/preferences";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { apolloClient } from "@/main";
const getUser = gql`
  query Authentication {
    user: authUser {
      id
      name
      phone
      locations {
        id
        lat
        lng
        address
      }
      points
      type
      image
    }
  }
`;
const store = createStore({
  state: {
    user: {},
    token: "",
    isLoggedIn: false,
  },
  mutations: {
    async setUser(state, user) {
      state.user = user;
      await Preferences.set({
        key: "user",
        value: JSON.stringify(user),
      });
    },
    async setToken(state, token) {
      state.token = token;
      await Preferences.set({
        key: "token",
        value: token,
      });
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
  },
  getters: {
    async getUser() {
      const { value } = await Preferences.get({ key: "user" });
      return value ? JSON.parse(value) : {};
    },
    async getToken() {
      const { value } = await Preferences.get({ key: "token" });
      return value;
    },
    isUserAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
  actions: {
    login({ commit }, data) {
      commit("setUser", data.user);
      commit("setToken", data.token);
      commit("setIsLoggedIn", true);
    },
    logout({ commit }) {
      commit("setUser", {});
      commit("setToken", "");
      commit("setIsLoggedIn", false);
    },
    authVerify({ commit }) {
      const { onResult, onError } = provideApolloClient(apolloClient)(() =>
        useQuery(getUser, null, () => ({ enabled: true }))
      );
      onResult(({ data }) => {
        commit("setUser", data.user);
        commit("setIsLoggedIn", true);
      });
      onError(() => {
        commit("setUser", {});
        commit("setIsLoggedIn", false);
      });
    },
  },
});
export default store;
