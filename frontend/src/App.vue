<template>
  <div id="app">
    <div class="flex">
      <div
        class="text-left p-2 flex items-center"
        v-bind:class="[user ? 'w-1/5' : 'w-full']"
      >
        <img src="@/assets/logo.png" class="h-6 pr-2" />
        <router-link to="/"><h1>Research Study</h1> </router-link>
      </div>
      <div
        v-if="user && user.role === 'admin'"
        class="flex justify-between w-full items-center"
      >
        <div id="nav">
          <router-link to="/">Start Over</router-link> |
          <router-link to="/prep_data">Intro Data Entry</router-link>
          |
          <router-link to="/prep_video">Intro Video Attention</router-link>
          |
          <router-link to="/prep_image_search">Intro Image Search</router-link>
          |
          <router-link to="/data_with_video">Data Entry with Video</router-link>
          |
          <router-link to="/data_with_image_search"
            >Data Entry with Image Search</router-link
          >
          |
          <router-link to="/exit">Exit Page</router-link>
        </div>
        <div>
          <router-link to="/Admin" class="text-red-800 p-1 px-2 mr-2 font-bold"
            >Admin</router-link
          >
          <button
            @click.prevent="logout()"
            class="font-bold p-1 px-2 mr-2 text-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    <router-view />
    <div class="flex items-center justify-center h-14 w-full absolute bottom-0">
      <a href="https://github.com/Experience-Info-Sys/isee/"
        >Check out the Github here</a
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
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

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  @apply text-blue-500;
}
</style>
