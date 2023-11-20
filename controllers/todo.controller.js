const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Home page
async function getIndex(req, res, next) {
  try {
    const tasks = await prisma.todo.findMany();
    const activetasks = tasks.filter((t) => t.taskState === false);
    const completedtasks = tasks.filter((t) => t.taskState === true);

    res.render("index", {
      tasks: tasks,
      activetasks: activetasks,
      completedtasks: completedtasks,
      pageTitle: "Home Page",
    });
  } catch (error) {
    console.log(error);
  }
}

// Add new tasks
async function AddTask(req, res, next) {
  const { taskTitle } = req.body;
  try {
    await prisma.todo.create({
      data: {
        task: taskTitle,
        taskState: false,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

// update tasks state
async function updateTask(req, res, next) {
  const id = parseInt(req.params.id);
  const taskCheck = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
  if (taskCheck.taskState) {
    try {
      await prisma.todo.update({
        where: { id: parseInt(req.params.id) },
        data: {
          taskState: false,
        },
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await prisma.todo.update({
        where: { id: id },
        data: {
          taskState: true,
        },
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
}

// delete tasks
async function deleteTask(req, res, next) {
  try {
    await prisma.todo.delete({ where: { id: parseInt(req.params.id) } });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getIndex,
  // getActiveTask,
  AddTask,
  updateTask,
  deleteTask,
};
