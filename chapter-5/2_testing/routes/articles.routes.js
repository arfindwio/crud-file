var router = require("express").Router();
const { create, getAllArticles, getArticleById, updateArticleById, deleteArticleById } = require("../controllers/articles.controllers");

router.post("/", create);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticleById);
router.delete("/:id", deleteArticleById);

module.exports = router;
