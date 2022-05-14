import archiver from "archiver";
import unzipper from "unzipper";
import fs from "fs";
import path from "path";

// zip file
export async function zip(src, dest) {
  const archive = archiver("zip", {
    zlib: { level: 9 } // Sets the compression level.
  });
  const output = fs.createWriteStream(dest);
  archive.on("error", function(err) {
    throw err;
  });
  archive.on("close", function() {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      `archiver has been finalized and the output file descriptor has closed.`
    );
  });
  archive.pipe(output);
  archive.directory(src, false);
  await archive.finalize();
}

// empty dest dir, than unzip file to dest
export async function unzip(src, dest) {
  const fs = require("fs-extra");
  const destDir = path.join(dest, "..");
  if (!fs.existsSync(destDir)) {
    fs.ensureDirSync(destDir);
  }
  fs.emptyDirSync(dest);
  const input = fs.createReadStream(src);
  const unzipped = unzipper.Extract({ path: dest });
  unzipped.on("entry", entry => {
    console.log(entry.path);
  });
  unzipped.on("close", () => {
    console.log("unzipped");
  });
  input.pipe(unzipped);
}
