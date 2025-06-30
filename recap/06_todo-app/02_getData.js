const http=require("http");
const path=require("path");
const fs=require("fs");

const filePath=path.join(__dirname,"./db/index.json")
const server=http.createServer((req,res)=>{
    if(req.url==="/checkitems" && req.method==="GET"){
    const data=fs.readFileSync(filePath,{encoding: "utf-8"});
    res.writeHead(200,{
        "content-type" : "application/json"
    })
    res.end(data);
    }
    
})

server.listen(4556,"127.0.0.1",()=>{
    console.log("✅ server is connected to port 2808")
})