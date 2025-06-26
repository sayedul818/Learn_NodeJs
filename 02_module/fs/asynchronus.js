// 2. Asynchronus
// file read / I/O intensive task => single thread => event loop => go to thread pool => task complete
const fs = require("fs");

const text="this is asynchronus file"
fs.writeFile("./hello.txt",text,{encoding: "utf-8"},(err)=>{
    if(err){
        console.log("some thing error!",err);
        return;
    }
    console.log('succesfully writing done');
})
// console.log("Task-1"); /* excecute 1st */
//  let intro="hello everyone"; 
fs.readFile("hello.txt",{encoding:"utf-8"},(err,data)=>{
    if(err){
        console.log("some thing error",err);
        return;
    }
    console.log(data); /* excecute end because of asynchronus */
    
})
// console.log(intro);/* excecute 2nd */
// console.log("Task-3"); /* excecute 3rd */