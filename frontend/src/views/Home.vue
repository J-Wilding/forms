<template>
  <div id="wrapper" class="pb-14">
    <Admin v-if="user" />
    <div v-else>
      <div class="flex py-4 px-4 mx-4 border-b justify-between">
        <div class="text-left p-2 flex items-center">
          <img src="@/assets/logo.png" class="h-8 pr-2" />
          <router-link to="/"
            ><h1 class="text-blue-800 text-4xl">Forms</h1>
          </router-link>
        </div>
        <button
          @click.prevent="changeSign()"
          class="focus:outline-none font-semibold p-1 px-2 mr-2 transition duration-300 ease-in-out hover:text-blue-800 text-xl"
        >
          {{ sign }}
        </button>
      </div>
      <div class="md:flex md:justify-between p-6 md:pt-40 items-center md:h-96">
        <div class="md:w-full mr-10 py-8">
          <h1
            class="text-7xl font-serif font-semibold tracking-wide leading-tight"
          >
            Welcome to <br />
            Forms
          </h1>
          <p class="font-mono italic text-3xl">
            (Like Google Forms, but easier!)
          </p>
        </div>
        <Login v-if="login" class="md:w-1/2" />
        <SignUp v-else class="md:w-1/2" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import HomePage from "@/components/HomePage.vue";
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import Admin from "@/components/Admin.vue";

export default {
  name: "Home",
  components: {
    // HomePage,
    // MyTickets,
    // <MyTickets v-else-if="user" />
    // <HomePage v-else />
    Login,
    SignUp,
    Admin,
  },
  data() {
    return {
      sign: "Sign In",
    };
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    login() {
      return this.sign === "Sign Up";
    },
  },
  methods: {
    changeSign() {
      this.sign = this.sign === "Sign In" ? "Sign Up" : "Sign In";
    },
  },
};
</script>
