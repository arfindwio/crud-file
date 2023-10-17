const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createArticle: async (title, bodyArticle, user_id) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!user) throw "User not found";
      if (!title || !bodyArticle || !user_id) throw "Title, body, and user_id cannot be empty";

      const article = await prisma.article.create({
        data: {
          title,
          bodyArticle,
          user: {
            connect: { id: user_id },
          },
        },
      });
      return article;
    } catch (err) {
      throw err;
    }
  },
  getAllArticles: async () => {
    try {
      const article = await prisma.article.findMany();

      return article;
    } catch (err) {
      throw err;
    }
  },
  getArticleById: async (id) => {
    try {
      const articleId = await prisma.article.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!articleId) throw "Article not found";

      return articleId;
    } catch (err) {
      throw err;
    }
  },
  updateArticleById: async (id, title, bodyArticle, user_id) => {
    try {
      const articleId = await prisma.article.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!articleId) throw "Article not found";
      if (!title || !bodyArticle) throw "Title and body cannot be empty";

      const article = await prisma.article.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          bodyArticle,
          user: {
            connect: { id: user_id },
          },
        },
      });

      return article;
    } catch (err) {
      throw err;
    }
  },
  deleteArticleById: async (id) => {
    try {
      const articleId = await prisma.article.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!articleId) throw "Article not found";

      const article = await prisma.article.delete({
        where: {
          id: Number(id),
        },
      });

      return article;
    } catch (err) {
      throw err;
    }
  },
};
