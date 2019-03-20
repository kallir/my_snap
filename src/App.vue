<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/sendsnap">Send Snap</router-link> |
      <router-link to="/snaps">Snaps</router-link> |
      <a id="logout" v-on:click="logout">Log Out</a>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #f4d13e;
}

#logout:hover {
  text-decoration: underline;
}
#logout {
  cursor: pointer;
}
</style>

<script>
import router from "./router.js";

export default {
  methods: {
    logout() {
      if (localStorage.getItem("user-token")) {
        alert("Logging out...");
        localStorage.removeItem("user-token");
        router.push({ name: "home" });
      } else {
        alert("Not logged in, can't log out");
        router.push({ name: "login" });
      }
    }
  }
};
</script>
