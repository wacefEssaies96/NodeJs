const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const dbConfig = require('./mongoConfig/mongoDB.json')
const mongoose = require('mongoose')
const studentRouter = require('./routes/studentRoute');

const app = express();
app.use(logger('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/student', studentRouter);


app.use((req, res, next) => {
    next(createError(404))
})
mongoose.set('strictQuery', true);
mongoose.connect(dbConfig.mongo.uri)
    .then(data => console.log("Connected to database."))
    .catch(err => console.log("Error : " + err))


module.exports = app;