const fs = require("fs");
const posts = require("../database/posts");
const PostModel = require("../models/post");

function create(title, body) {
  let newPost = new PostModel(posts.id++, title, body);
  posts.data.push(newPost);

  fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));
}

function index() {}
function show(id) {}
function update(id, title, body) {
  const postUpdate = posts.data.find((post) => post.id === id);

  if (!postUpdate) {
    return "Post tidak ditemukan";
  }

  postUpdate.title = title;
  postUpdate.body = body;

  fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));

  return "Post berhasil diperbarui";
}

function destroy(id) {
  const index = posts.data.findIndex((post) => post.id === id);

  if (index === -1) {
    return "Post tidak ditemukan";
  }

  posts.data.splice(index, 1);

  fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));

  return "Post berhasil dihapus";
}

module.exports = { create, index, show, update, destroy };
