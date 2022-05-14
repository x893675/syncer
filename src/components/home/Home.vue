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
            <div class="game-card-content">
              <div class="game-pic">
                <img :src="game.profile" alt="Image" />
              </div>
              <div class="game-text">
                <p class="game-name">{{ game.name }}</p>
                <p class="game-lastbackupts">{{ game.lastBackupTime }}</p>
              </div>
              <div>
                <img
                  class="delete-icon"
                  src="~@/assets/img/delete-icon.svg"
                  alt="Image"
                />
                <img
                  class="setting-icon"
                  src="~@/assets/img/delete-icon.svg"
                  alt="Image"
                />
              </div>
            </div>
            <div class="game-card-footer">
              <div class="restore-button">
                <p class="restore-button-text">还原</p>
              </div>
              <div class="delete-button">
                <p class="delete-button-text">删除</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-if="gamesFiltered.length === 0 && !isLoading" class="no-games">
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
    // showCreateNoteModal() {
    //   this.$modal.show(createNoteModalName);
    // }
  },
  computed: {
    ...mapGetters(["games", "isLoading"]),
    gamesFiltered() {
      /*
        const game = {};
        game.id =
        game.name=
        game.createdAt
        game.updateAt
        game.profile
        game.lastBackupTime
        game.srcPath
        game.backupHistory
        backupHistory is array about backup record: record.id=,record.startTime,record.endTime,record.srcPath,record.destName
 */
      // const mock = {
      //   id: 1,
      //   name: "Dark Souls3",
      //   createdAt: "2021-06-19 12:00:00",
      //   updateAt: "2021-06-19 12:00:00",
      //   profile: require("@/assets/img/" + "dk3-logo.png"),
      //   lastBackupTime: "2021-06-19 12:00:00",
      //   srcPath: "/home/xxx",
      //   backupHistory: []
      // };

      return [];
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
