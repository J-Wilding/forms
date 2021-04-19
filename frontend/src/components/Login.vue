<template>
  <div class="p-2">
    <div class="w-1/2 mx-auto p-4 bg-blue-200 rounded shadow-lg">
      <h1>Admin Login</h1>
      <div class="flex flex-col align-center mx-auto w-1/2">
        <input
          placeholder="username"
          class="focus:outline-none focus:border-solid border-b-2 border-transparent focus:border-blue-900 bg-gray-100 hover:bg-gray-200 p-2 m-2 w-full"
          v-model="usernameLogin"
        />
        <input
          type="password"
          placeholder="password"
          class="focus:outline-none focus:border-solid border-b-2 border-transparent focus:border-blue-900 bg-gray-100 hover:bg-gray-200 p-2 m-2 w-full"
          v-model="passwordLogin"
        />
      </div>
      <div class="">
        <button
          type="submit"
          class="p-2 w-36 bg-blue-900 hover:bg-blue-800 text-white rounded-3xl shadow-lg focus:outline-none transition duration-150 ease-in-out transform active:-translate-y-1 active:scale-95"
          @click.prevent="login"
        >
          Login
        </button>
      </div>
    </div>
    <p v-if="errorLogin" class="text-red-800">{{ errorLogin }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      // firstName: "",
      // lastName: "",
      // username: "",
      // password: "",
      usernameLogin: "",
      passwordLogin: "",
      error: "",
      errorLogin: "",
    };
  },
  methods: {
    // async register() {
    //   this.error = "";
    //   this.errorLogin = "";
    //   if (
    //     !this.firstName ||
    //     !this.lastName ||
    //     !this.username ||
    //     !this.password
    //   ) {
    //     return;
    //   }

    //   try {
    //     let response = await axios.post("/api/users", {
    //       firstName: this.firstName,
    //       lastName: this.lastName,
    //       username: this.username,
    //       password: this.password,
    //     });
    //     this.$root.$data.user = response.data.user;
    //   } catch (error) {
    //     this.error = error.response.data.message;
    //     this.$root.$data.user = null;
    //   }
    // },
    async login() {
      this.error = "";
      this.errorLogin = "";
      if (!this.usernameLogin || !this.passwordLogin) return;
      try {
        let response = await axios.post("/api/users/login", {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
};
</script>
