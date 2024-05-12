"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.get("/", controller.showData);

router.get("/details", controller.showDetails);

module.exports = router;
