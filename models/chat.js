const Mongoose = require('mongoose');

const Chat = Mongoose.model(
    "chatnodejs", Mongoose.Schema({
        username: String,
        message: String
    }, { timestamps: true })
);
module.exports = Chat;