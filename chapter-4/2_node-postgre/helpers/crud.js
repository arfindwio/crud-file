const fs = require("fs");
const posts = require("../database/posts");
const PostModel = require("../models/post");
const pool = require("../database/postgres");

function create(title, body) {
  return new Promise(async (resolve, reject) => {
    try {
      // "SELECT * FROM posts where id = $1", [1]
      // "UPDATE posts SET title = $1, body = $2", ["title", "body"]
      let result = await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);
      resolve(result.rows[0]);
    } catch (err) {
      return reject(err);
    }
  });
}

function index() {
  return posts.data;
}

function show(id) {
  return new Promise((resolve, reject) => {
    let post = posts.data.filter((p) => {
      return p.id == id;
    });

    if (!post.length) return reject(`post with id ${id} is doesn't exist!`);

    resolve(post[0]);
  });
}

function update(id, title, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await pool.query("SELECT * FROM posts WHERE id = $1;", [id]);

      if (post.rows.length === 0) {
        return reject(`Post with id ${id} doesn't exist!`);
      }

      const existingPost = post.rows[0];

      const updatedTitle = title ?? existingPost.title;
      const updatedBody = body ?? existingPost.body;

      const result = await pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *;", [updatedTitle, updatedBody, id]);

      resolve(result.rows[0]);
    } catch (err) {
      reject(err);
    }
  });
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    let postIndex = posts.data.findIndex((post) => post.id === id);

    if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);

    posts.data.splice(postIndex, 1);

    fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));
    resolve(`post with id ${id} is deleted!`);
  });
}

module.exports = { create, index, show, update, destroy };
