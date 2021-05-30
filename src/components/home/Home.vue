<template>
  <div id="games-list">
    <div class="no-games">
      <h2>
        😮.. 啥也没有 添加一个吧
      </h2>
    </div>
    <b-modal :active.sync="aboutModalActive" has-modal-card>
      <cn-about-modal></cn-about-modal>
    </b-modal>
  </div>
</template>

import AboutModal from "../modals/about-modal/AboutModal";

<script>
import AboutModal from "../modals/about-modal/AboutModal";

export default {
  name: "home",
  data() {
    return {
      isGreen: true,
      aboutModalActive: false
    };
  },
  components: {
    "cn-about-modal": AboutModal
  }
};
</script>

<style src="./Home.scss" lang="scss"></style>
