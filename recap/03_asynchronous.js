const fs = require("fs");

const text="hi! this is sayed and we are thing that it is very cruicial thing"

fs.writeFile("./input.txt",text,(err=>{
    if(err){
        console.log("something error",err);
        return;
    }
}))
fs.readFile("./input.txt",{encoding: "utf-8"},((err,data)=>{
    if(err){
        console.log("something error found",err);
        return;
    }
    console.log(data);
}))