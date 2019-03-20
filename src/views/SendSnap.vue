<template>
  <div class="login container">
    <h1 class="title">Send Snap: </h1>
    <form v-on:submit.prevent="sendSnap" method="post" enctype="multipart/form-data">
      <div class="form-group">
        <input v-on:input="show" v-on:change="getImage" class="form-control-file" id="snap-file" type="file" name="snap">
      </div>
      <div id="show" style="display: none">
        <div class="form-group">
          <label for="user-select">Users: </label>
          <select v-model="to" style="width: 340px" class="form-control" id="user-select">
            <option v-for="user in users" v-if="user.email !== '' && user.email.length < 50" :key="user.id">
              {{ user.email }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="duration">Duration: </label>
          <input v-model="duration" style="width: 60px" id="duration" type="number" class="form-control" value="5" step=1 min=1 max=10>
        </div>
        <button class="btn btn-warning" type="submit">Send Snap</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router.js";

export default {
  data() {
    return {
      users: "",
      image: "",
      to: "",
      duration: ""
    };
  },
  mounted: function() {
    this.ifOnline();
    this.getUsers();
    this.show();
  },
  methods: {
    ifOnline() {
      if (localStorage.getItem("user-token") === null) {
        router.push({ name: "home" });
      }
    },
    getUsers() {
      var token = localStorage.getItem("user-token");

      axios
        .get("https://api.snapchat.wac.epitech.eu/all", {
          headers: {
            token: token
          }
        })
        .then(response => {
          this.users = response["data"]["data"];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getImage(event) {
      this.image = event.target.files[0];
    },
    show() {
      var snapFile = document.getElementById("snap-file").value;
      var show = document.getElementById("show");
      if (snapFile !== "") {
        show.style.display = "block";
      }
    },
    sendSnap() {
      var token = localStorage.getItem("user-token");
      var formData = new FormData();
      formData.append("duration", this.duration);
      formData.append("to", this.to);
      formData.append("image", this.image);

      axios
        .post("https://api.snapchat.wac.epitech.eu/snap", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token
          }
        })
        .then(function() {
          alert("Snap sent");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
