const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');
const pool = require('../database/postgres');

function create(title, body) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);
            resolve(result.rows[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

async function index() {
    let result = await pool.query("SELECT *  FROM posts")
    return result.rows;
}

function show(id) {
    return new Promise(async(resolve, reject) => {
        let result = await pool.query("SELECT * FROM posts where id = $1",[id])

        if (!result.rows.length) return reject(`post with id ${id} is doesn't exist!`);

        resolve(result.rows[0]);
    });
}

function update(id, title, body) {
    return new Promise((resolve, reject) => {
        let postIndex = posts.data.findIndex(post => post.id === id);

        if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);
        if (title) posts.data[postIndex].title = title;
        if (body) posts.data[postIndex].body = body;

        fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
        resolve(posts.data[postIndex]);
    });
}


function destroy(id) {
    return new Promise(async(resolve, reject) => {
        let result = await pool.query("SELECT * FROM posts where id = $1",[id]);

        if (!result.rows.length) return reject(`post with id ${id} is doesn't exist!`);

       let updateData = await pool.query("DELETE posts WHERE id = $1 RETURNING *;", [id])
       console.log(updateData)
        resolve(`post with id ${id} is deleted!`);
    });
}

module.exports = { create, index, show, update, destroy };