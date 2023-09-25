const fs = require("fs");
const posts = require("../database/posts");
const PostModel = require("../models/post");

function create(title, body) {
  let newPost = new PostModel(posts.id++, title, body);
  posts.data.push(newPost);

  fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));
}

function index() {
  // Menampilkan semua data
  // let dataDb = fs.readFileSync('./database/posts.json','utf-8');
  let { data } = posts;
  for (const value of data) {
    console.log(
      `Data ke ${value.id} ,Judul =  ${value.title} , Body =  ${value.body}`
    );
    console.log("\n");
  }
}

function show(id) {
  // Menampilkan Bedasarkan Id
  if (!id) {
    return "ID Harus Ada";
  }
  const showData = posts.data.find((post) => post.id === id);
  if (!showData) {
    return "Data Tidak Ditemukan";
  }
  return showData;
}

function update(id, title, body) {
  // Update Data
  const postUpdate = posts.data.find((post) => post.id === id);

  if (!postUpdate) {
    return "Post tidak ditemukan";
  }

  postUpdate.title = title;
  postUpdate.body = body;

  fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));

  return "Pos berhasil diperbarui";
}

function destroy(id) {
  // Hapus Data
    
}

module.exports = { create, index, show, update, destroy };
