<template>
  <nav>
    <img
      class="logo"
      src="~@/assets/img/syncer-logo-white-fullx2.png"
      alt="Syncer logo"
    />

    <div class="is-pulled-right">
      <a
        id="github"
        @click="open('https://github.com/x893675/syncer')"
        title="Github"
      >
        <b-icon icon="github"></b-icon>
      </a>
    </div>

    <div class="is-pulled-right">
      <a id="help" @click="aboutModalActive = true" title="About">
        <b-icon icon="info-circle"></b-icon>
      </a>
    </div>

    <b-modal :active.sync="aboutModalActive" has-modal-card>
      <cn-about-modal></cn-about-modal>
    </b-modal>
  </nav>
</template>

<script>
// eslint-disable-next-line
import { remote } from "electron";
import AboutModal from "./components/modals/about-modal/AboutModal";

export default {
  name: "cn-navbar",
  components: {
    "cn-about-modal": AboutModal
  },
  data() {
    return {
      helpTokenModalActive: false,
      aboutModalActive: false
    };
  },
  methods: {
    open: function(link) {
    window.open(link, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  -webkit-app-region: drag;
  background-color: $primary;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .logo {
    //padding: 10px 10px 4px 10px;
    width: 160px;
    position: relative;
    //left: 4%;
  }

  #about-code-notes,
  #github,
  #help {
    color: $light;
    position: relative;
    top: 20px;
    right: 20px;
  }

  .modal {
    .media-content {
      text-align: center;
    }

    img {
      width: 250px;
    }

    .badge {
      width: 160px;
    }
  }
}
</style>
