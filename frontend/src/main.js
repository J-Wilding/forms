import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
// import mock from "./mock_data";

Vue.config.productionTip = false;

const data = {
  user: Object,
  participant: Object, // participantId, dataEntries, imageSearches, surveyAnswers
  forms: Array,
  // employeeInfo: mock,
  // currentID: 0,
  // imageOrder: [],
  // imageIndex: 0,
};

new Vue({
  router,
  data: data,
  render: (h) => h(App),
}).$mount("#app");
