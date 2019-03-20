<template>
  <div class="login container">
    <h1 class="title">All Users</h1>
    <ul>
      <li v-for="user in users[0]" :key="user.id">
        {{ user.email }}
      </li>
    </ul>
  </div>
</template>
<style>
ul {
  list-style-type: none;
}
</style>
<script>
import axios from "axios";

export default {
  data() {
    return {
      users: []
    };
  },
  mounted: function() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      var us = this.users;
      var token = localStorage.getItem("user-token");
      axios
        .get("https://api.snapchat.wac.epitech.eu/all", {
          headers: {
            token: token
          }
        })
        .then(function(response) {
          us.push(response["data"]["data"]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
