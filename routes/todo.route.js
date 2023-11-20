const express = require("express");
const todoRouter = express.Router();
const todoController = require("../controllers/todo.controller");

todoRouter.get("/", todoController.getIndex);
// todoRouter.get("/", todoController.getActiveTask);
todoRouter.post("/todo", todoController.AddTask);
todoRouter.get("/updatetodo/:id", todoController.updateTask);
todoRouter.get("/deletetodo/:id", todoController.deleteTask);

module.exports = todoRouter;
