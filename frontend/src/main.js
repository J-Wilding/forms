import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import mock from "./mock_data";

Vue.config.productionTip = false;

const data = {
  user: Object,
  participant: Object, // participantId, dataEntries, imageSearches, surveyAnswers
  employeeInfo: mock,
  currentID: 0,
  imageOrder: [],
  imageIndex: 0,
  newDataEntry(
    task,
    first,
    last,
    // email,
    job,
    dept,
    address,
    city,
    state,
    zip
    // ssn
    ) {
    this.currentID++;
    this.participant.dataEntries.push({
      task: task,
      id: this.currentID,
      first_name: first,
      last_name: last,
      job: job,
      department: dept,
      // email: email,
      address: address,
      city: city,
      state: state,
      zip_code: zip,
      // ssn: ssn,
    });
  },
};

new Vue({
  router,
  data: data,
  render: (h) => h(App),
}).$mount("#app");
