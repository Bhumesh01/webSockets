import { WebSocketServer } from "ws";

// The following code is just like const app = express()
const wws = new WebSocketServer({port: 8000});

// eventHandler...it's like app.get('/users', function(req,res){ res.json()})
// websocket servers dont have routes, they have connection. it means whenever the connection is made give me the socket of that person. Socket means connection to that person ie it is similar to req, res
wws.on("connection", function(socket){
    console.log("user connected")
    socket.send("hello");
    socket.on("message", function(e){
        if(e.toString() === "ping"){
            socket.send("pong");
        }
    })
})