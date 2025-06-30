const fs = require("fs");


const text="hey! this is sayed and this is one of the finest thing that would not be become so greatfull";
fs.writeFileSync("./input.txt",text);
const data=fs.readFileSync("./input.txt",{encoding: "utf-8"});
console.log(data);