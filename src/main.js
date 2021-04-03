import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App";
import store from "./store";

Vue.config.productionTip = false;
Vue.config.silent = true;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
