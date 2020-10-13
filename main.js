const fs = require("fs");
const {shell, globalShortcut} = require("electron");
const robot = require("robotjs");
require("dotenv").config();
const currentPath = process.env.PATHURL;

fs.readdir(currentPath, {encoding: "utf8", withFileTypes: true}, function (
  err,
  files
) {
  // REMEMBER THE INDEX VALUE INCASE TERMINAL CLOSES
  //----------------------------v-------------------
  const handleFile = async (i = 0) => {
    const file = !!files && files?.[i];

    if (file) {
      console.log("--------------------------------");
      console.log("-------->filtering file index " + i);
      await new Promise((resolve, reject) => {
        globalShortcut.register("M", async () => {
          // robot.mouseClick();
          robot.keyTap("f11");
          robot.keyTap("f11");
          robot.keyTap("A", "control");
          robot.keyTap("F", "control");
          robot.keyTap("tab");
          robot.typeString("path");
          robot.keyTap("tab");
          robot.keyTap("tab");
          robot.keyTap("down");
          robot.keyTap("tab");
          robot.keyTap("tab");
          robot.keyTap("enter");
          robot.keyTap("tab");
          robot.keyTap("enter");
          robot.keyTap("tab");
          robot.keyTap("enter");
          robot.keyTap("down");
          robot.keyTap("down");
          robot.keyTap("down");
          robot.keyTap("down");
          robot.keyTap("enter");
          robot.keyTap("escape");
          robot.keyTap("-", "control");
          robot.keyTap("R", ["control", "shift"]);
          robot.keyTap("S", "control");
          robot.keyTap("Q", "control");

          resolve(true);
          console.log("-------->Completed<-------------");
          console.log("--------------------------------");
        });

        shell.openPath(currentPath + "/" + file.name + "/");
        robot.setKeyboardDelay(6000);
        robot.keyTap("M");
        robot.setKeyboardDelay(0);

        console.log("-------->Opening folder...------");
      });
      globalShortcut.unregisterAll();
      if (i < files.length - 1) {
        handleFile(i + 1);
      } else {
        console.log("ENDED ON INDEX" + " " + files.length);
        console.log("PROCESS COMPLETED");

        console.log("--------------------------------");
      }
    }
  };
  handleFile();
});
