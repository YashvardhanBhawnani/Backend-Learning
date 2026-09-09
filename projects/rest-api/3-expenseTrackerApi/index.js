import express from "express";
import fs from "fs";
import expenses from "./mock_expenses.json" with { type: "json" };

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// rest api routes

// GET /api/expenses
app.get("/api/expenses", (req, res) => {
  const { category } = req.query;
  let result = expenses;
  if (category) {
    result = result.filter(
      (expense) => expense.category.toLowerCase() === category.toLowerCase(),
    );
  }
  return res.status(200).json(result);
});

// GET /api/expenses/summary
app.get("/api/expenses/summary", (req, res) => {
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const categoryBreakdown = expenses.reduce((acc, curr) => {
    const cat = curr.category.toLowerCase();
    acc[cat] = (acc[cat] || 0) + curr.amount;
    return acc;
  }, {});

  return res.status(200).json({
    totalSpent: Number(totalSpent.toFixed(2)),
    categoryBreakdown,
  });
});

// POST /api/expenses
app.post("/api/expenses", (req, res) => {
  const body = req.body;
  expenses.push({ id: expenses.length + 1, ...body });
  fs.writeFile("mock_expenses.json", JSON.stringify(expenses), (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed To Write To File" });
    }
    return res.json({ status: "success", id: expenses.length });
  });
});

// DELETE /api/expenses/:id
app.delete("/api/expenses/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res
      .status(500)
      .json({ status: "error", message: "No Such Expense Found" });
  }
  return res.json({ status: "success", deletedId: id });
});

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}!`);
});
