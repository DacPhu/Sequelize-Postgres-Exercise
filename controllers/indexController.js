"use strict";

const controller = {};
const Sequelize = require("sequelize");
const models = require("../models");

controller.showData = async (req, res) => {
  const Category = models.Category;
  const Tag = models.Tag;
  const Blog = models.Blog;
  const Comment = models.Comment;

  const tagsPromise = Tag.findAll();
  const categoryPromise = Blog.findAll({
    attributes: [
      [Sequelize.col("Category.id"), "categoryId"],
      [Sequelize.col("Category.name"), "categoryName"],
      [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
    ],
    include: [
      {
        model: Category,
        attributes: [],
      },
    ],
    group: ["Category.id", "Category.name"],
    raw: true,
  });

  const blogsWithComments = Blog.findAll({
    attributes: [
      "id",
      "title",
      "createdAt",
      "summary",
      "imagePath",
      "categoryId",
      [Sequelize.fn("COUNT", Sequelize.col("*")), "commentCount"],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
      },
    ],
    group: ["Blog.id"],
    raw: true,
  });

  try {
    const [categories, allTags, blogs] = await Promise.all([
      categoryPromise,
      tagsPromise,
      blogsWithComments,
    ]);

    let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);

    let filter_blogs = blogs;
    if (category > 0) {
      filter_blogs = blogs.filter((item) => item.categoryId == category);
    }

    res.render("index", { filter_blogs, allTags, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = controller;
