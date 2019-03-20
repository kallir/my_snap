<template>
  <div class="container">
    <h1 class="title"> Snaps Received: </h1>
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">From</th>
          <th scope="col">Duration</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="snap.id" v-for="snap in snaps[0]">
          <td> {{ snap.from }}</td>
          <td> {{ snap.duration }}</td>
          <td><a @click="getSnap(snap.snap_id, snap)" data-toggle="modal" data-target="#viewSnap" class="btn btn-light">x</a></td>
        </tr>
      </tbody>
    </table>
    <div id="viewSnap" class="modal fade" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <img class="img-fluid" v-bind:src="snap">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router.js";

export default {
  data() {
    return {
      snaps: [],
      snap: null
    };
  },
  mounted: function() {
    this.ifOnline();
  },
  methods: {
    ifOnline() {
      if (localStorage.getItem("user-token") === null) {
        router.push({ name: "home" });
      } else {
        this.getAllSnaps();
      }
    },
    getAllSnaps() {
      var token = localStorage.getItem("user-token");
      axios
        .get("https://api.snapchat.wac.epitech.eu/snaps", {
          headers: {
            token: token
          }
        })
        .then(response => {
          this.snaps.push(response["data"]["data"]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getSnap(snap_id, snap) {
      var duration = snap["duration"] * 1000;
      var token = localStorage.getItem("user-token");
      axios
        .get("https://api.snapchat.wac.epitech.eu/snap/" + snap_id, {
          headers: {
            token: token
          }
        })
        .then(response => {
          this.snap = response["config"]["url"];
          setTimeout(() => {
            window.$("#viewSnap").modal("hide");
          }, duration);
          axios.post(
            "https://api.snapchat.wac.epitech.eu/seen",
            {
              id: snap["snap_id"]
            },
            {
              headers: {
                token: token
              }
            }
          );
        });
    }
  }
};
</script>
