"use strict";

const controller = {};
const models = require("../models");
const Blog = require("../seeders/4-Blog");

controller.showData = async (req, res) => {
  const Category = models.Category;
  const Tag = models.Tag;
  const Blog = models.Blog;

  const categoriesPromise = Category.findAll();
  const tagsPromise = Tag.findAll();
  const blogsPromise = Blog.findAll();

  try {
    const [categories, tags, blogs] = await Promise.all([
      categoriesPromise,
      tagsPromise,
      blogsPromise,
    ]);
    res.render("index", { categories, tags, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

controller.showDetails = (req, res) => {
  res.render("details");
};

module.exports = controller;
