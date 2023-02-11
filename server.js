/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ______________________ Student ID: ______________ Date: ________________
*
*   GitHub Repository URL: https://github.com/Har7974/web-322--assignment-2
*
*  Cyclic Web App URL: https://mysterious-ray-sunbonnet.cyclic.app/about
*
********************************************************************************/ 


const express = require("express");
const path = require('path');
const app = express();
app.use(express.static('public'));
const HTTP_PORT = process.env.PORT || 8080;

const { initialize, getAllPosts, getPublishedPosts, getCategories } = require("./blog-service.js");
app.get('/', (req, res) => {
    res.redirect('/about')
});

app.get("/blog", (req, res) => {
    getPublishedPosts().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/about.html"));
});



app.get("/posts", (req, res) => {
    getAllPosts().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/categories", (req, res) => {
    getCategories().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.use((req, res) => {
    res.status(404).end('404 PAGE NOT FOUND');
});

initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log('Express http server listening on port ' + HTTP_PORT);
    })
}).catch ((error) => {
    console.log(error);
});