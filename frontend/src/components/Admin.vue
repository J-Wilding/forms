<template>
  <div class="">
    <div class="flex py-4 px-4 mx-4 border-b justify-between">
      <div class="text-left p-2 flex items-center">
        <img src="@/assets/logo.png" class="h-8 pr-2" />
        <router-link to="/"
          ><h1 class="text-blue-800 text-4xl">Forms</h1>
        </router-link>
      </div>
      <div class="flex items-center">
        <p class="text-lg">Signed-in as: <span class="font-bold text-2xl">{{ name }} </span> |</p> 
        <button
          @click.prevent="logout()"
          class="focus:outline-none font-bold p-1 px-2 mr-2 transition duration-300 ease-in-out text-red-800 text-xl"
        >
          Log Out
        </button>
      </div>
    </div>
    <div class="bg-gray-200 p-2 shadow-inner">
      <div
        class="bg-blue-200 rounded shadow-lg m-2 p-4 md:w-3/4 lg:1/2 mx-auto"
      >
        <FormManager />
      </div>
      <br />
      <hr />
      <br />
      <SurveyManager v-if="formsLoaded" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormManager from "@/components/FormManager";
import SurveyManager from "@/components/SurveyManager";

export default {
  name: "Home",
  components: {
    FormManager,
    SurveyManager,
  },
  data() {
    return {
      formsLoaded: false,
    };
  },
  created: async function () {
    await this.getForms();
    try {
      const response = await axios.get("/api/user/test");
      this.$root.$data.participant = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    name() {
      return this.$root.$data.user.username;
    },
  },
  methods: {
    async getForms() {
      try {
        const response = await axios.get("/api/tasks");
        this.$root.$data.forms = response.data;
        this.formsLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
};
</script>
