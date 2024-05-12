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
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);

app.set("view engine", "hbs");

app.use("/", require("./routes/indexRoute"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
