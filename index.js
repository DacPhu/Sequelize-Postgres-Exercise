const express = require("express");
const app = express();
const port = 4000;
const expressHandleBars = require("express-handlebars");

app.use(express.static(__dirname + "/html"));

// setting handle bars
app.engine(
  "hbs",
  expressHandleBars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "layout",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/createTable", (req, res) => {
  let models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("Table created!");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
