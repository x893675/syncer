import Datastore from "nedb";
import path from "path";
//import fs from "fs";
// eslint-disable-next-line
import { remote } from 'electron';

const gameStore = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/games.db"),
  timestampData: true
});

export default gameStore;

/*
const backup = {
  description: "",
  tags: [],
  createdAt: "rfc3339 time format",
}
const game = {
  id: "",
  name: "",
  profile: "game profile path, default is app.logo",
  srcPath: "game src path",
  backups: [backup],
  createdAt: "",
  updateAt: "",
};
*/
