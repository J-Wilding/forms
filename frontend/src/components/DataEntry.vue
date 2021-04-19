<template>
  <div class="flex flex-col">
    <InfoCard :employee="currentEmployee" />
    <!-- <form > -->
    <div class="form text-right mx-auto bg-blue-200 rounded-md shadow-lg">
      <div class="row">
        <label for="name">Name: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="name"
          type="text"
          v-model="name"
        />
        <label for="department">Department: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="department"
          type="text"
          v-model="department"
        />
      </div>
      <div class="row row-span-full">
        <label for="job">Job: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="job"
          type="text"
          v-model="job"
        />
        <!-- <label for="email">Email: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="email"
          type="email"
          v-model="email"
        /> -->
      </div>
      <div class="row">
        <label for="address">Address: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="address"
          type="text"
          v-model="address"
        />

        <label for="city">City: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="city"
          type="text"
          v-model="city"
        />
      </div>
      <div class="row">
        <label for="state">State: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="state"
          type="text"
          v-model="state"
        />

        <label for="zip_code">Zip Code: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="zip_code"
          type="text"
          v-model="zip_code"
        />
      </div>
      <!-- <div class="row">
        <label for="ssn">SSN: </label>
        <input
          class="rounded-lg focus:outline-none focus:ring focus:border-blue-300 shadow-inner p-1"
          id="ssn"
          type="text"
          v-model="ssn"
        />
      </div> -->
    </div>
    <!-- </form> -->
    <button
      @click.prevent="getNext"
      class="p-2 w-36 bg-blue-900 hover:bg-blue-800 text-white rounded-3xl shadow-lg focus:outline-none transition duration-150 ease-in-out transform active:-translate-y-1 active:scale-95 mx-auto my-4"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.form {
  display: table;
  border-spacing: 1rem;
}
.row {
  display: table-row;
}
label {
  display: table-cell;
  font-weight: 600;
}
input {
  display: table-cell;
}
</style>

<script>
import InfoCard from "./InfoCard.vue";
import axios from "axios";
export default {
  name: "DataEntry",
  components: {
    InfoCard,
  },
  data() {
    return {
      task: Object,
      id: "",
      name: "",
      job: "",
      department: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
    };
  },
  created: async function () {
    const response = await axios.get(`/api/task${this.$route.path}`);
    this.task = response.data;
  },
  computed: {
    currentEmployee() {
      return this.$root.$data.employeeInfo[this.$root.$data.currentID];
    },
  },
  methods: {
    getNext() {
      const dataIDs = [
        "name",
        "job",
        "department",
        "address",
        "city",
        "state",
        "zip_code",
      ];
      for (const key of dataIDs) {
        if (this[key] === null || this[key] === "") {
          return;
        }
      }
      this.id = this.$root.$data.currentID;
      let [fname, lname] = this.name.trim().split(" ");
      this.$root.$data.newDataEntry(
        this.task,
        fname,
        lname,
        this.job,
        this.department,
        this.address,
        this.city,
        this.state,
        this.zip_code
        // this.ssn
      );
      this.name = "";
      this.address = "";
      this.city = "";
      this.department = "";
      // this.email = "";
      this.id = "";
      this.job = "";
      // this.ssn = "";
      this.state = "";
      this.zip_code = "";
    },
  },
};
</script>
