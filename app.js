const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const contactsRouter = require('./routes/contacts');
const dbConfig = require('./database/mongodb.json');
var mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/contact', contactsRouter);

app.use((req, res, next)=> {
    next(createError(404)); 
});

mongoose.set('strictQuery', false);
mongoose.connect(dbConfig.mongo.uri);

module.exports = app;