<template>
  <div class="register container">
    <h1 class="title">Register: </h1>
    <form method="post" v-on:submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email: </label>
        <input  v-model="email" class="form-control" type="email" name="email">
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input v-model="password" class="form-control" type="password" name="password">
      </div>
      <button class="btn btn-warning">Submit</button>
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
        .post("https://api.snapchat.wac.epitech.eu/inscription", {
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          alert("Registration successful!");
          console.log(response);
        })
        .catch(function(error) {
          alert("Error: registration unsuccessful");
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
