const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
    console.log("new connection created");
    socket.on("message",(msg)=>{
        console.log('user fired message events');
        console.log(msg);
        io.emit('abc')
    })
    
});
httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
