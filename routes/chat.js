const express = require("express")
const router = express.Router()
const Chat = require("../models/chat")

router.get('/', (req, res, next) => {
    res.render("chat")
})

router.post('/add', async (req, res, next) => {
    let newChat = new Chat({
        username: req.body.username,
        message: req.body.message
    })
    await newChat.save()
    // res.send({res: 'c bon'})
    res.render("chat")
})


module.exports = router