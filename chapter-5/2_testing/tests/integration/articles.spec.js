const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const request = require("supertest");
const app = require("../../app");
let article = {};

describe("test POST /api/v1/articles endpoint", () => {
  test("test user_id terdaftar didalam database & title/body kosong -> sukses", async () => {
    try {
      let user = await prisma.user.findMany();

      let title = "articletest1";
      let bodyArticle = "articletest1";
      let user_id = user[0].id;

      let { statusCode, body } = await request(app).post("/api/v1/articles").send({ title, bodyArticle, user_id });
      article = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("title");
      expect(body.data).toHaveProperty("bodyArticle");
      expect(body.data).toHaveProperty("user_id");
      expect(body.data.title).toBe(title);
      expect(body.data.bodyArticle).toBe(bodyArticle);
      expect(body.data.user_id).toBe(user_id);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test user_id terdaftar didalam database & title/body kosong -> error", async () => {
    try {
      let title = "";
      let bodyArticle = "";
      let user_id = article.user_id;

      let { statusCode, body } = await request(app).post("/api/v1/articles").send({ title, bodyArticle, user_id });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe("email sudah dipakai");
    }
  });
});

describe("test GET /api/v1/articles endpoint", () => {
  test("test cari semua articles -> sukses", async () => {
    try {
      let { statusCode, body } = await request(app).get("/api/v1/articles");

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("test GET /api/v1/articles/:id endpoint", () => {
  test("test cari article_id terdaftar didalam database -> sukses", async () => {
    try {
      let { statusCode, body } = await request(app).get(`/api/v1/articles/${article.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("title");
      expect(body.data).toHaveProperty("bodyArticle");
      expect(body.data).toHaveProperty("user_id");
      expect(body.data.id).toBe(article.id);
      expect(body.data.title).toBe(article.title);
      expect(body.data.bodyArticle).toBe(article.bodyArticle);
      expect(body.data.user_id).toBe(article.user_id);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test cari article_id terdaftar didalam database -> error", async () => {
    try {
      let { statusCode, body } = await request(app).get(`/api/v1/articles/${article.id + 1000}`);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("test PUT /api/v1/articles/:id endpoint", () => {
  test("test article_id terdaftar didalam database & user_id tidak terdaftar didalam database  -> sukses", async () => {
    try {
      let title = "articletest222";
      let bodyArticle = "articletest222";
      let user_id = article.user_id;

      let { statusCode, body } = await request(app).put(`/api/v1/articles/${article.id}`).send({ title, bodyArticle, user_id });
      article = body.data;

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("title");
      expect(body.data).toHaveProperty("bodyArticle");
      expect(body.data).toHaveProperty("user_id");
      expect(body.data.id).toBe(article.id);
      expect(body.data.title).toBe(article.title);
      expect(body.data.bodyArticle).toBe(article.bodyArticle);
      expect(body.data.user_id).toBe(article.user_id);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test article_id terdaftar didalam database & user_id tidak terdaftar didalam database -> error", async () => {
    try {
      let title = "articletest222";
      let bodyArticle = "articletest222";
      let user_id = article.user_id + 1000;
      let { statusCode, body } = await request(app)
        .put(`/api/v1/articles/${article.id + 1000}`)
        .send({ title, bodyArticle, user_id });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("test DELETE /api/v1/articles/:id endpoint", () => {
  test("test article_id terdaftar didalam database -> sukses", async () => {
    try {
      let { statusCode, body } = await request(app).delete(`/api/v1/articles/${article.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("title");
      expect(body.data).toHaveProperty("bodyArticle");
      expect(body.data).toHaveProperty("user_id");
      expect(body.data.id).toBe(article.id);
      expect(body.data.title).toBe(article.title);
      expect(body.data.bodyArticle).toBe(article.bodyArticle);
      expect(body.data.user_id).toBe(article.user_id);
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test("test article_id terdaftar didalam database -> error", async () => {
    try {
      let { statusCode, body } = await request(app).delete(`/api/v1/articles/${article.id + 1000}`);
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});
