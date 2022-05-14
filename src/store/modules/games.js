import db from "@/datastore-games";
// import converter from "@/converter";
import path from "path";
import { remote } from "electron";

const state = {
  games: [],
  isLoading: false
};

const mutations = {
  LOAD_GAMES(state, games) {
    state.games = games;
  },
  ADD_GAME(state, game) {
    state.games.push(game);
  },
  DELETE_GAME(state, game) {
    state.games = state.games.filter(n => n._id !== game._id);
  },
  SELECT_LOADING(state, loading) {
    state.isLoading = loading;
  }
};

const actions = {
  loadGames(store) {
    store.commit("SELECT_LOADING", true);
    db.find({}, (err, games) => {
      if (!err) {
        store.commit("LOAD_GAMES", games);
        store.commit("SELECT_LOADING", false);
      }
    });
  },
  addGames(store, game) {
    store.commit("SELECT_LOADING", true);
    db.insert(game, (err, game) => {
      if (!err) {
        store.commit("ADD_GAME", game);
        store.commit("SELECT_LOADING", false);
      }
    });
    actions.mkdir(game);
  },
  updateGame(store, game) {
    db.update({ _id: game._id }, game, {}, err => {
      if (!err) {
        store.dispatch("loadGames");
      }
    });
  },
  deleteGame(store, game) {
    store.commit("SELECT_LOADING", true);
    db.remove({ _id: game._id }, {}, err => {
      if (!err) {
        store.commit("DELETE_GAME", game);
        store.commit("SELECT_LOADING", false);
      }
    });
    actions.rmdir(game);
  },
  // check if game dir exist, if not, create it
  mkdir(game) {
    const fs = require("fs-extra");
    const gamesDir = path.join(
      remote.app.getPath("userData"),
      "backups",
      game._id
    );
    if (!fs.existsSync(gamesDir)) {
      fs.ensureDirSync(gamesDir);
    }
  },
  // remove game dir
  rmdir(game) {
    const fs = require("fs-extra");
    const gamesDir = path.join(
      remote.app.getPath("userData"),
      "backups",
      game._id
    );
    if (fs.existsSync(gamesDir)) {
      fs.removeSync(gamesDir);
    }
  }
};

const getters = {
  games: state => state.games,
  isLoading: state => state.isLoading
};

export default {
  state,
  mutations,
  actions,
  getters
};
