const path=require("path")
const fs=require("fs")
const inputArguments = process.argv.slice(2);
const timeStamp=new Date().toISOString();
const text=`${inputArguments.join(" ")} ${timeStamp} \n`;
if(!text){
    console.log("❌ Please provide a message to log");
    console.log("Example : node index.js hello world");
    process.exit(1);
}
const filePath= path.join(__dirname,"log.txt");
fs.appendFile(filePath,text,{encoding:"utf-8"},()=>{
    console.log("Your log added successfully");
})
console.log(filePath);