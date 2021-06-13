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
    state.games = state.games.filter(n => n.id !== game.id);
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
        actions.checkGamesStatus(games);
        store.commit("SELECT_LOADING", false);
      }
    });
  },
  checkGamesStatus(games) {
    games.forEach(game => {
      const fs = require("fs-extra");
      const gamesDir = path.join(remote.app.getPath("userData"), "games");
      const curGameDir = path.join(
        gamesDir,
        `${game.name}-${game.createdAt.getTime()}`
      );
      if (!fs.existsSync(curGameDir)) {
        fs.ensureDirSync(curGameDir);
      }
      // TODO: check game backup record

      // Write metadata to filesystem
      fs.writeFileSync(
        path.join(curGameDir, "metadata.json"),
        JSON.stringify({
          description: game.description,
          updatedAt: game.updatedAt,
          createdAt: game.createdAt
        }),
        "utf-8"
      );
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
    //TODO: create game dir
  },
  updateGame(store, game) {
    db.update({ id: game.id }, game, {}, err => {
      if (!err) {
        store.dispatch("loadGames");
      }
    });
    // ensure game dir exist, sync it
    //actions.
  },
  deleteGame(store, game) {
    store.commit("SELECT_LOADING", true);
    db.remove({ id: game.id }, {}, err => {
      if (!err) {
        store.commit("DELETE_GAME", game);
        store.commit("SELECT_LOADING", false);
      }
    });
    // delete game dir
  }

  // deleNoteFromFS(note) {
  //   const fs = require("fs-extra");
  //   const curNoteDir = path.join(
  //     remote.app.getPath("userData"),
  //     "notes",
  //     `${note.name}-${note.createdAt.getTime()}`
  //   );
  //   fs.removeSync(curNoteDir);
  // },
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
