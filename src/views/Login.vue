<template>
  <div class="login container">
    <h1 class="title">Login: </h1>
  <form method="post" v-on:submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email: </label>
        <input v-model="email" class="form-control" type="email" name="email">
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input v-model="password" class="form-control" type="password" name="password">
      </div>
      <input class="btn btn-warning" type="submit" name="submit" value="Submit">
  </form>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router.js";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted: function() {
    this.ifOnline();
  },
  methods: {
    submit() {
      axios
        .post("https://api.snapchat.wac.epitech.eu/connection", {
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          localStorage.setItem("user-token", response["data"]["data"]["token"]);
          router.push({ name: "home" });
        })
        .catch(function(error) {
          localStorage.removeItem("user-token");
          console.log(error);
        });
    },
    ifOnline() {
      if (localStorage.getItem("user-token")) {
        router.push({ name: "home" });
      }
    }
  }
};
</script>
