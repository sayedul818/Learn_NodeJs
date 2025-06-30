const http = require("http");
const path = require("path");
const fs = require("fs");
const { json } = require("stream/consumers");
const { connected } = require("process");

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {
    console.log(req.url);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathName = url.pathname;

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
    else if (pathName === "/checkitem" && req.method === "GET") {
        const name = url.searchParams.get("name")
        // console.log(name);
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        const parseData = JSON.parse(data);
        const item = parseData.find((item) => item.name === name)
        const stringifiedItem = JSON.stringify(item);

        res.writeHead(200, {
            "content-type": "application/json",
        })
        res.end(stringifiedItem);
    }

    // update item
    // else if (pathName === "/checkitems/update-item" && req.method === "PATCH") {
    //     const targetName = url.searchParams.get("name"); // name of the item to update

    //     let data = "";
    //     req.on("data", (chunk) => {
    //         data += chunk;
    //     });

    //     req.on("end", () => {
    //         const updates = JSON.parse(data); // contains any fields to update (e.g. name, type, country)

    //         const allItems = fs.readFileSync(filePath, { encoding: "utf-8" });
    //         const parseAllItems = JSON.parse(allItems);

    //         const indexItem = parseAllItems.findIndex((item) => item.name === targetName);

    //         if (indexItem === -1) {
    //             res.writeHead(404, { "Content-Type": "application/json" });
    //             return res.end(JSON.stringify({ error: "Item not found with given name" }));
    //         }
    //         // Dynamically update all provided fields
    //         const currentItem = parseAllItems[indexItem];
    //         const updatedItem = { ...currentItem, ...updates };

    //         // If no createdAt exists, set it
    //         if (!updatedItem.createdAt) {
    //             updatedItem.createdAt = new Date().toLocaleString("en-BD");
    //         }

    //         parseAllItems[indexItem] = updatedItem;

    //         fs.writeFileSync(filePath, JSON.stringify(parseAllItems, null, 2), {
    //             encoding: "utf-8",
    //         });

    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         res.end(JSON.stringify(updatedItem, null, 2));
    //     });
    // }

    else if(pathName==="/checkitems/update-item" && req.method==="PATCH"){
        const tergetName=url.searchParams.get("name");
        // console.log(tergetName);

        let data="";
        req.on("data",((chunk)=>{
            data=data+chunk;
        }))
        req.on("end",()=>{
            const updates=JSON.parse(data);
            // console.log(updates);
            const allItems=fs.readFileSync(filePath,{encoding:"utf-8"});
            const parseAllItems=JSON.parse(allItems);
            // console.log(parseAllItems);
            const indexItem=parseAllItems.findIndex((item)=>item.name===tergetName);
            // console.log(indexItem);

            const currentItem=parseAllItems[indexItem];
            // console.log(currentItem);
            const updateItem={...currentItem,...updates};
            // console.log(updateItem);
            parseAllItems[indexItem]=updateItem;
            // console.log(parseAllItems);
            fs.writeFileSync(filePath,JSON.stringify(parseAllItems,null,2));
            res.writeHead(200,{
                "content-type" : "application/json"
            });
            res.end(JSON.stringify(updateItem,null,2));

        })
    }

    else {
        res.end("the rout is not exist!");
    }
})
server.listen(4990, "127.0.0.1", () => {
    console.log("server listening to port 4990");
})


