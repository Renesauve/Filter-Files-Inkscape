const fs = require("fs");
const {shell, globalShortcut} = require("electron");
const robot = require("robotjs");
require("dotenv").config();
const currentPath = process.env.PATHURL;
const cheerio = require("cheerio");

fs.readdir(currentPath, {encoding: "utf8", withFileTypes: true}, function (
  err,
  files
) {
  // REMEMBER THE INDEX VALUE INCASE TERMINAL CLOSES
  //----------------------------v-------------------
  const handleFile = async (i = 0) => {
    const file = !!files && files?.[i];

    if (file) {
      shell.openPath(currentPath + "/" + file.name + "/");
      console.log("--------------------------------");
      console.log("--------------------------------");
      console.log("-------->filtering file index " + i);
      await new Promise((resolve, reject) => {
        const getPath = (callback) => {
          fs.readFile(
            `${currentPath}` + "/" + `${file.name}`,
            "utf8",
            function (err, content) {
              if (err) reject(err);
              callback(null, content);
            }
          );
        };

        getPath(function (err, content) {
          const $ = cheerio.load(content);
          const path = $("path");

          if (path.length > 1 || path.length <= 0) {
            shell.beep();
            console.log("There are " + (path.length - 1) + " extra images");
            console.log("Attention required, please delete extra images");
            globalShortcut.register("N", async () => {
              robotController();
              resolve(true);
              console.log("Images fixed");
            });
          } else {
            globalShortcut.register("M", async () => {
              robotController();
              resolve(true);
              console.log("-------->Completed<-------------");
            });
          }

          robot.setKeyboardDelay(4000);
          robot.keyTap("M");
          robot.setKeyboardDelay(0);
        });

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

  const robotController = () => {
    robot.mouseClick();
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
    robot.keyTap("down", "control");
    robot.keyTap("down", "control");
    robot.keyTap("enter");
    robot.keyTap("escape");
    robot.keyTap("R", ["control", "shift"]);
    robot.keyTap("S", "control");
    robot.keyTap("Q", "control");
  };
});
