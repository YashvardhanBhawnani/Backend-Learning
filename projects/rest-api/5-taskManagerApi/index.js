import express from "express";
import fs from "fs";
import tasks from "./mock_tasks.json" with { type: "json" };

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// GET /api/tasks
// POST /api/tasks
app
  .route("/api/tasks")

  .get((req, res) => {
    return res.status(200).json(tasks);
  })

  .post((req, res) => {
    const body = req.body;
    tasks.push({ id: tasks.length + 1, ...body });
    fs.writeFile("mock_tasks.json", JSON.stringify(tasks), (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed To Write File" });
      }
      return res.status(200).json({ status: "success", id: tasks.length });
    });
  });

// PUT /api/tasks/:id
// DELETE /api/tasks/:id
app
  .route("/api/tasks/:id")
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    tasks.splice(index, 1);
    fs.writeFile("mock_tasks.json", JSON.stringify(tasks), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write file" });
      }
      return res.json({ status: "success", deletedid: id });
    });
  })
  .put((req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    const { title, desc, priority, isCompleted } = req.body;
    if (!title || !desc || isCompleted === undefined) {
      return res.status(400).json({
        status: "error",
        message: "title, description, and isCompleted are required fields",
      });
    }

    const parsedIsCompleted = isCompleted === true || isCompleted === "true";

    const updatedTask = {
      id,
      title,
      description,
      priority: priority || "medium",
      isCompleted: parsedIsCompleted,
      createdAt: tasks[taskIndex].createdAt,
    };

    tasks[index] = updatedTask;

    fs.writeFile("Mock_Tasks.json", JSON.stringify(tasks), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to persist task update" });
      }
      return res.status(200).json({
        status: "success",
        data: updatedTask,
      });
    });
  });

// PATCH /api/tasks/:id/toggle
app.patch("/api/tasks/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ status: "error", message: "Task not found" });
  }
  task.isCompleted = !task.isCompleted;
  fs.writeFile("mock_tasks.json", JSON.stringify(tasks), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to persist task update" });
    }
    return res.status(200).json({
      status: "success",
      data: task,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}!`);
});
