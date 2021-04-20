<template>
  <div id="app">
    <router-view />
    <div class="flex items-center justify-center h-14 w-full absolute bottom-0">
      <a href="https://github.com/J-Wilding/forms"
        >Check out the Github here</a
      >
    </div>
  </div>
</template>

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
