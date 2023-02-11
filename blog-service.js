const fs = require('fs');  
// Globally declared arrays
let posts = [];
let categories = [];

// Read the data files from data folder and store post and categories data in an appropriate array
exports.initialize = () => {
    return new Promise ((resolve, reject) => {
        fs.readFile('./data/posts.json','utf8', (error,data) => {
            if (error) {
                reject ('unable to read file');
            }
            else {
                posts = JSON.parse(data);
            }
        });
        fs.readFile('./data/categories.json','utf8', (error,data)=> {
            if (error) {
                reject ('unable to read file');
            }
            else {
                categories = JSON.parse(data);
            }
        })
        resolve();
    })
};


exports.getAllPosts = () => {
    return new Promise ((resolve,reject) => {
        if (posts.length == 0) {
            reject('no results returned');
        }
        else {
            resolve(posts);
        }
    })
};

exports.getCategories = () => {
    return new Promise((resolve,reject) => {
        if (categories.length == 0) {
            reject ('no results returned');
        }
        else {
            resolve (categories);
        }
    })
};

exports.getPublishedPosts = () => {
    return new Promise((resolve, reject) => {
        let publishedPostsData = [];
        posts.forEach((post) => {
            if (post.published === true) {
                publishedPostsData.push(post);
            }
        })
        if (publishedPostsData.length === 0) {
            reject("No results returned");
        } else {
            resolve(publishedPostsData);
        }
    })    
};

