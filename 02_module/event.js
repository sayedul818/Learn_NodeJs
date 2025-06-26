const EventEmitter=require("events");
class SchoolBell extends EventEmitter{}
const schoolBell=new SchoolBell;
schoolBell.on("ring",()=>{
    console.log("ohhooo the class is end");
})
schoolBell.on("ring",()=>{
    console.log("shit the next class will be start");
})
schoolBell.on("broken",()=>{
    console.log("why the bell is not ringing");
})
schoolBell.emit("ring");
schoolBell.emit("broken");
