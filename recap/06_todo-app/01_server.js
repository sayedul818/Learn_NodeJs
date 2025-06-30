const http=require("http");

const server=http.createServer((req,res)=>{
    req.on()
})

server.listen(2808,"127.0.0.1",()=>{
    console.log("✅ server is connected to port 2808");
})
