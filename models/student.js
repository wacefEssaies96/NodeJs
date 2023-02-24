const Mongoose = require('mongoose')

const Student = Mongoose.model("student", Mongoose.Schema({
    name: String,
    age: Number,
    note: Number
}))

module.exports = Student