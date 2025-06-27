const fs = require("fs");

const readStream =fs.createReadStream("./output.txt",{encoding : "utf-8"});
const writeStream=fs.createWriteStream("./input.txt",{encoding : "utf-8"});


readStream.on("data",(chunk)=>{
    console.log(chunk);
    writeStream.write(chunk);
})  

// for readStream error throwing
readStream.on("error", (err) => {
        if(err){
            throw Error("there are a error",err);
        }
});

// for writeStream error throwing
writeStream.on("error", (err) => {
        if(err){
           throw Error("there are a error",err);
        }
});

readStream.on("end",()=>{
    console.log("reading ended");
    writeStream.end();
})

writeStream.on("finish",()=>{
    console.log("writing succesfull");
})