// stores/store.js
import { defineStore } from "pinia";
import { api as $api, session } from "boot/axios";
import { notify } from "boot/notify";
import _ from "lodash";

export const useStore = defineStore("store", {
  state: () => ({
    global: { status: "loading" },
    persistent: {
      // api: "http://localhost:3000",
      api: 'https://reminder-0.server.michoest.com'
    },
    isSubscribed: false,
  }),
  getters: {},
  actions: {
    async fetch() {
      // this.global.status = "loading";

      // try {

      //   const response = await $api.get("/activities");
      //   this.activities = response.data.activities;
      // } catch (err) {
      //   notify(`Error: ${err}`, { type: "negative" });
      // }

      this.global.status = "ok";
    },
    async subscribe() {
      const response = await $api.post("/activities");
    },
    async start() {

    },
    async stop() {

    },
    async checkAPI(url) {
      try {
        await $api.get(`${url}/ping`, { baseURL: "" });

        return true;
      } catch (err) {
        return false;
      }
    },
    setAPI(url) {
      this.persistent.api = url;
      $api.defaults.baseURL = url;
    },
  },
  persist: {
    storage: sessionStorage,
    pick: ["persistent"],
    afterHydrate: (ctx) => {
      $api.defaults.baseURL = ctx.store.persistent.api;
    },
  },
});
