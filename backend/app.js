const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const cors = require('cors')

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
        "GET, POST, PATCH, DELETE, OPTION");
    next();
})

/* app.use(cors({
    origin :"http://localhost:4200"
})); */

app.post("/api/posts", (req, res, next) => {
    /* const post = req.body;
    console.log(post); */
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    /* console.log(post); */
    post.save();
    res.status(201).json(({
        message: 'Post added successfully!!'
    }));
})

app.get("/api/posts",(req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Post fetch successfully!!',
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    console.log(req.params.id);
    res.status(200).json({message: "Post deleted!"});
});

module.exports = app;