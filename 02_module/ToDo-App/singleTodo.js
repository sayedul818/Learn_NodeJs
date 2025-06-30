const http = require("http");
const path = require("path");
const fs = require("fs");
const { json } = require("stream/consumers");
const { connected } = require("process");

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {
    const url=new URL(req.url,`http://${req.headers.host}`);
    // console.log(url);
    const pathName=url.pathname;
    // console.log(req.url);

    // GET all todos
    if (pathName === "/checkitems" & req.method === "GET") {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        res.writeHead(200, {
            "content-type": "application/json", 
        })
        res.end(data);
    }
    // POST all ToDos
    else if (pathName === "/checkitems/createitem" && req.method === "POST") {

        let data = ""
        req.on("data", (chunk) => {
            data = data + chunk
        })
        req.on("end", () => {
            const { name, country, type } = JSON.parse(data);
            const createdAt = new Date().toLocaleString()
            const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
            const parseAllTodos = JSON.parse(allTodos);
            parseAllTodos.push({ name, country, type, createdAt });
            fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), { encoding: "utf-8" })
            res.end(JSON.stringify({ name, country, type, createdAt }, null, 2));
        })

    } 
    
    // GET single Items
    else if (pathName ==="/checkitem" && req.method === "GET") {
        const name=url.searchParams.get("name")
        // console.log(name);
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        const parseData=JSON.parse(data);
        const item=parseData.find((item)=> item.name===name)
        const stringifiedItem=JSON.stringify(item);

        res.writeHead(200, {
            "content-type": "application/json",
        })
        res.end(stringifiedItem);
    }
    else {
        res.end("the rout is not exist!");
    }
})
server.listen(4990, "127.0.0.1", () => {
    console.log("server listening to port 4990");
})


