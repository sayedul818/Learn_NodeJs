const EventEmitter=require("events");
class SchoolBell extends EventEmitter{};
const schoolBell=new SchoolBell;
schoolBell.on("ring",()=>{
    console.log("hurray the class is end");
})
schoolBell.on("break",()=>{
    console.log("why the next class is not working");
})

schoolBell.emit("ring");
schoolBell.emit("break");
