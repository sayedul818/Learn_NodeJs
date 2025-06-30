/* basic request and respons listener server
---------------------------------------------
const http=require("http");
const server=http.createServer((req,res)=>{
    res.end("helo this is a platform were we are learn about NodeJs");

})
server.listen(4990,"127.0.0.1",()=>{
    console.log("server listening to port 4990");
}) 

*/


/* create routing types request and respons listener server
-----------------------------------------------------------
const http=require("http");
const server=http.createServer((req,res)=>{
    // res.end("helo this is a platform were we are learn about NodeJs");
    if(req.url==="/checklist" & req.method==="GET"){
        res.end("here is the ToDo checklist");
    }else if(req.url==="/checklist/createlist" & req.method==="POST"){
        res.end("created a new ToDo list");
    }else{
        res.end("the rout is not exist!");
    }
})
server.listen(4990,"127.0.0.1",()=>{
    console.log("server listening to port 4990");
})

*/

const http = require("http");
const path = require("path");

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {

    
    // GET all todos
    if (req.url === "/checkitems" & req.method === "GET") {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        res.writeHead(200, {
            "content-type": "application/json",
        })
        res.end(data);
        // res.end("this is checklist of todo app");
        // res.end(JSON.stringify(data));
        // res.end(`<h1>hello world</h1>  <h2>hello world</h2>  <h3>hello world</h3> `)

    // POST all ToDos
    } else if (req.url === "/checkitems/createitem" && req.method === "POST") {

        let data=""
        req.on("data",(chunk)=>{
            data=data+chunk
        })
        req.on("end",()=>{
            // console.log(data);
            const {name,country,type}=JSON.parse(data);
            // console.log({name})
            const createdAt=new Date().toLocaleString()
            const allTodos=fs.readFileSync(filePath,{encoding:"utf-8"});
            // console.log(allTodos);
            const parseAllTodos=JSON.parse(allTodos);
            // console.log(parseAllTodos);
            parseAllTodos.push({name,country,type,createdAt});
            fs.writeFileSync(filePath,JSON.stringify(parseAllTodos,null,2),{encoding:"utf-8"})
            res.end(JSON.stringify({name,country,type,createdAt},null,2));
        })

    } else {
        res.end("the rout is not exist!");
    }
})
server.listen(4990, "127.0.0.1"), () => {
    console.log("server listening to port 4990");
}


