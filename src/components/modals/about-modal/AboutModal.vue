<template>
  <div class="modal-card">
    <div class="modal-card-body">
      <div class="media">
        <div class="media-content">
          <img src="~@/assets/img/syncer-logo-white-fullx2.png" alt="Image" />
        </div>
      </div>
      <div class="text-center">
        <h4>v{{ appVersion }}</h4>

        <p>
          A simple game profile backup tools built with Electron & Vue.js 🚀
        </p>

        <p>
          Feel free to contribute on
          <a @click="open('https://github.com/x893675/syncer')">Github</a>
          🍻
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { remote } from "electron";
export default {
  name: "cn-about-modal",
  data() {
    return {
      appVersion: remote.app.getVersion()
    };
  },
  methods: {
    open: function(link) {
      window.open(link, "_blank");
    }
  }
};
</script>

<style src="./AboutModal.scss" lang="scss"></style>
