const http=require("http");
const path=require("path");
const fs=require("fs");
const filePath=path.join(__dirname,"./db/index.json")

const server=http.createServer((req,res)=>{
    const url=new URL(req.url,`http://${req.headers.host}`);
    const pathname=url.pathname;
    if(pathname==="/createItem" && req.method==="POST"){
        let data="";
        req.on("data",((chunk)=>{
            data=data+chunk;
        }))
        req.on("end",()=>{
            const {name,country,type}=JSON.parse(data);
            // console.log({name,country,type});
            const createdAt=new Date().toLocaleString();
            const allItems=fs.readFileSync(filePath,{encoding:"utf-8"});
            const parseAllItems=JSON.parse(allItems);
            parseAllItems.push({name,country,type,createdAt});
            fs.writeFileSync(filePath,JSON.stringify(parseAllItems,null,2));
            res.end(JSON.stringify({name,country,type,createdAt},null,2));
        })
    }
})


server.listen(4556,"127.0.0.1",()=>{
    console.log("✅ server is connected to port 2808")
})