const express = require('express')
const http = require('http')
let path = require('path')
const chatRouter = require('./routes/chat')

let app = express()
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "twig")
app.use('/chat', chatRouter)
const server = http.createServer(app)
const io = require("socket.io")(server)
io.on("connection", (socket) => {
    console.log('user connected')
    socket.emit('msg', 'a new user is connected')

    socket.on("disconnect", ()=>{
        console.log('user disconnected')
        io.emit("msg", "a user has been disconnected")
    })
})
server.listen(3000, () => console.log("server is running on port 3000"))