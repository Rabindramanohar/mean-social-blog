const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
/* app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Method",
        "GET, POST, PATCH, DELETE, OPTION");
    next();
}) */

app.use(cors({
    origin :"http://localhost:4200"
}));

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json(({
        message: 'Post added successfully!!'
    }));
})

app.get("/api/posts",(req, res, next) => {
    const post = [
    {
        id: "fhdskjfdsklfj",
        title: "My first post",
        content: "First post is here test"
    }, 
    {
        id: "fdsfsfsfdsfdsf",
        title: "My second post",
        content: "Second post is here!!"
    }
];
    res.status(200).json({
        message: 'Post fetch successfully!!',
        posts: post
    });
});

module.exports = app;