const express = require('express');

const app = express();


app.use("/api/posts",(req, res, next) => {
    const post = [
    {
        id: "fhdskjfdsklfj",
        title: "My first post",
        content: "First post is here"
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