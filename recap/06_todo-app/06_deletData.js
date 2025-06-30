const http=require("http");
const path=require("path");
const fs=require("fs");
const filePath=path.join(__dirname,"./db/index.json")

const server=http.createServer((req,res)=>{
    const url=new URL(req.url,`http://${req.headers.host}`)
    const pathName=url.pathname;
    if(pathName==="/deletitem" && req.method==="DELETE"){
        const tergetName=url.searchParams.get("name");
        const allItems=fs.readFileSync(filePath,{encoding: "utf-8"})
        const parseAllItems=JSON.parse(allItems);
        const filterItems=parseAllItems.filter(item=>item.name!==tergetName);
        const stringifyRestItem=JSON.stringify(filterItems,null,2)
        // console.log(filterItems);
        fs.writeFileSync(filePath,stringifyRestItem);
        res.end(stringifyRestItem);
    }
})


server.listen(4556,"127.0.0.1",()=>{
    console.log("✅ server is connected to port 2808")
})