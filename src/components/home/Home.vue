<template>
  <div>
    <section>
      <b-checkbox v-model="isGreen">Green color</b-checkbox>
      <div class="block">
        <b-icon :type="{ 'is-success': isGreen }" icon="account"></b-icon>
        <b-icon :type="{ 'is-success': isGreen }" icon="home"></b-icon>
        <b-icon
          :type="{ 'is-success': isGreen }"
          icon="view-dashboard"
        ></b-icon>
      </div>
    </section>
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
