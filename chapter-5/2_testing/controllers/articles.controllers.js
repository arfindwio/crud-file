const { createArticle, getAllArticles, getArticleById, updateArticleById, deleteArticleById } = require("../libs/articles.libs");

module.exports = {
  create: async (req, res, next) => {
    try {
      let { title, bodyArticle, user_id } = req.body;

      try {
        let article = await createArticle(title, bodyArticle, user_id);

        return res.status(201).json({
          status: true,
          message: "OK",
          data: article,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  getAllArticles: async (req, res, next) => {
    try {
      let article = await getAllArticles();

      return res.status(200).json({
        status: true,
        message: "OK",
        data: article,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },
  getArticleById: async (req, res, next) => {
    try {
      let articleId = req.params.id;
      try {
        let article = await getArticleById(articleId);

        return res.status(200).json({
          status: true,
          message: "OK",
          data: article,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },
  updateArticleById: async (req, res, next) => {
    try {
      let articleId = req.params.id;
      let { title, bodyArticle, user_id } = req.body;
      try {
        let article = await updateArticleById(articleId, title, bodyArticle, user_id);

        return res.status(200).json({
          status: true,
          message: "OK",
          data: article,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },
  deleteArticleById: async (req, res, next) => {
    try {
      let articleId = req.params.id;
      try {
        let article = await deleteArticleById(articleId);

        return res.status(200).json({
          status: true,
          message: "OK",
          data: article,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },
};
