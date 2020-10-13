const fs = require("fs");
const {shell, screen, globalShortcut} = require("electron");
const robot = require("robotjs");

const currentPath = "C:/Users/rdasa/Desktop/coins";

fs.readdir(currentPath, {encoding: "utf8", withFileTypes: true}, function (
  err,
  files
) {
  const handleFile = async (i = 0) => {
    const file = !!files && files?.[i];

    if (file) {
      const loadingFile = await new Promise((resolve, reject) => {
        globalShortcut.register("V", async () => {
          robot.mouseClick();
          robot.keyTap("R", ["control", "shift"]);
          robot.keyTap("S", "control");
          robot.keyTap("Q", "control");
          resolve(true);
        });

        shell.openPath(currentPath + "/" + file.name + "/");
      });
      globalShortcut.unregisterAll();
      if (i < files.length - 1) {
        handleFile(i + 1);
      }
    }
  };
  handleFile();
});
