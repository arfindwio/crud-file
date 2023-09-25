const { create, index, show, update, destroy } = require("./helpers/crud");

// test create post
create("test title", "test data");

// test show all post
index();

// test show detail post by id
console.log(show(3));

// test update post by id
update(1, "test123 title", "test123 data");

// test delete post by id
destroy(1);
