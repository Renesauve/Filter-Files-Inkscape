const fs = require("fs");
const {shell, screen, globalShortcut} = require("electron");
const robot = require("robotjs");
const currentPath = "C:/Users/rdasa/Desktop/coins";

fs.readdir(currentPath, {encoding: "utf8", withFileTypes: true}, function (
  err,
  files
) {
  const clicky = globalShortcut.register("V", () => {
    robot.mouseClick();
    robot.keyTap("control");
    robot.keyTap("shift");
    robot.keyTap("R");
  });
  Promise.all(
    files.map(async (file, index) => {
      if (file.isFile() && clicky == true) {
        shell.openPath(currentPath + "/" + file.name + "/");
      }
    })
  ).catch((error) => console.log({error}));
});
