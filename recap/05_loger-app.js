const fs=require("fs");
const path=require("path");

const timeStamp=new Date().toISOString();
const inputArguments=process.argv.slice(2);
const text=`${inputArguments.join(" ")} ${timeStamp} \n`;

const filePath=path.join(__dirname,"05_log.txt");
fs.appendFile(filePath,text,{encoding: "utf-8"},()=>{
    console.log("the log is added successfully");
})
