import { createStore } from "vuex";
// import { Preferences } from "@capacitor/preferences";

const store = createStore({
  state: {
    user: {},
    token: "",
    isLoggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      // await Preferences.set({
      //   key: "user",
      //   value: JSON.stringify(user),
      // });
    },
    setToken(state, token) {
      state.token = token;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
  },
  getters: {
    // async getUser() {
    //   // const { value } = await Preferences.get({ key: 'user' });
    //   // return value ? JSON.parse(value) : {};
    // },
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
  },
});
export default store;
