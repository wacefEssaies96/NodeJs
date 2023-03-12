const express = require('express')
const http = require('http')
let path = require('path')
const chatRouter = require('./routes/chat')
var mongoose = require('mongoose')
require('dotenv').config()

let app = express()

app.use(express.json());
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "twig")
app.use('/chat', chatRouter)

const server = http.createServer(app)

//connect to mongo database
mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to the database! ");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
const io = require("socket.io")(server)

io.on("connection", (socket) => {

    // socket.emit('msg', 'a new user is connected')

    socket.on("disconnect", () => {
        socket.emit("msg", "a user has been disconnected")
    })
    socket.on('typing', (username) => {
        io.emit("typing", username + " is typing")
    })
    socket.on('message', (data) => {
        io.emit("msg", data)
    })

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    res.status(500).send({error: res})
  });

server.listen(3000, () => console.log("server is running on port 3000"))