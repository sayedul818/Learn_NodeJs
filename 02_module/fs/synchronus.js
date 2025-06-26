// 1. Synchronus
// file read / I/O intensive task => single thread => not go to thread pool => 

const fs = require("fs");
// file writing
const text="learnig the node js from level-2 deveopment";
fs.writeFileSync("./hello.txt",text);
// file reading
const data=fs.readFileSync("./hello.txt",{encoding : "utf-8" });
console.log(data);
