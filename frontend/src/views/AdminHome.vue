<template>
  <div id="wrapper" class="pb-14">
    <Admin v-if="user && user.role === 'admin'" />
    <Login v-else />
  </div>
</template>

<script>
import axios from "axios";
// import HomePage from "@/components/HomePage.vue";
import Login from "@/components/Login.vue";
import Admin from "@/components/Admin.vue";

export default {
  name: "home",
  components: {
    // HomePage,
    // MyTickets,
    // <MyTickets v-else-if="user" />
    // <HomePage v-else />
    Login,
    Admin,
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
  },
};
</script>
