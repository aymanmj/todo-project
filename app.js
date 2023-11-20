const express = require("express");
const cors = require("cors");
const path = require("path");
const todoRouter = require("./routes/todo.route");
const errorController = require("./routes/error.route");

const { port } = require("./config/config");

const appport = port || 5000;

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(todoRouter);
app.use(errorController.get404);

app.listen(process.env.PORT || appport, () => {
  console.log(`listening on port ${appport}`);
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
