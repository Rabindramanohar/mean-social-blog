const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const cors = require('cors');
const postsRoutes = require('./routes/post');

const app = express();

mongoose.connect("mongodb+srv://Robin:7l49KQgvvhn8KxZA@cluster0-y4top.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to DB Successful!!');
    })
    .catch(() => {
        console.log('Connection failed!');
        
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTION");
    next();
})

/* app.use(cors({
    origin :"http://localhost:4200"
})); */

app.use("/api/posts", postsRoutes)



module.exports = app;