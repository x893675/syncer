<template>
  <div id="games-list">
    <div class="loading-bro" v-if="isLoading">
      <h1>Loading</h1>
      <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
        <circle id="loading-inner" cx="75" cy="75" r="60" />
      </svg>
    </div>
    <template v-if="gamesFiltered.length > 0 && !isLoading">
      <div class="games">
        <div v-for="(game, index) in gamesFiltered" :key="index">
          <div class="game-card">
            <div class="game-pic">
              <img class="game-img" :src="game.profile" alt="Image" />
            </div>
            <div class="game-name">
              <span>{{ game.name }}</span>
            </div>
            <div class="game-content">
              <span class="icon-text">
                <span class="icon">
                  <i class="fa fa-history"></i>
                </span>
                <span>{{
                  game.updatedAt.toLocaleString([], { hour12: false })
                }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-if="gamesFiltered.length === 0 && !isLoading" class="no-games">
      <h2>😮.. 啥也没有 添加一个吧</h2>
    </div>
    <b-modal :active.sync="aboutModalActive" has-modal-card>
      <cn-about-modal></cn-about-modal>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AboutModal from "../modals/about-modal/AboutModal";

export default {
  name: "home",
  data() {
    return {
      aboutModalActive: false
    };
  },
  components: {
    "cn-about-modal": AboutModal
  },
  methods: {
    ...mapActions(["loadGames"])
  },
  computed: {
    ...mapGetters(["games", "isLoading"]),
    gamesFiltered() {
      const gamesFilter = this.games.filter(game => {
        return (game.profile = require("@/assets/img/" +
          "default-profile.jpg"));
      });
      console.log(gamesFilter.length);
      return gamesFilter;
    }
  },
  beforeRouteEnter(route, redirect, next) {
    next(vm => {
      vm.loadGames();
    });
  }
};
</script>

<style src="./Home.scss" lang="scss"></style>
