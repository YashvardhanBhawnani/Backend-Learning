import express from "express";
import fs from "fs";
import books from "./MOCK_DATA.json" with { type: "json" };

const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));

// rest api routes

// GET /api/books
app.get("/api/books", (req, res) => {
  return res.json(books);
});

/* GET /api/books/:id
PATCH /api/books/:id
DELETE /api/books/:id */

app
  .route("/api/books/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);
    if (!book) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }
    return res.json(book);
  })

  // PATCH single book
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex((book) => book.id === id);
    books[index] = { ...books[index], ...req.body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(books), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write file" });
      }
      return res.json({ status: "success", updatedBook: books[index] });
    });
  })

  // DELETE single book (properly chained to .route())
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }
    books.splice(index, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(books), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write file" });
      }
      return res.json({ status: "success", deletedId: id });
    });
  });

// POST /api/books
app.post("/api/books", (req, res) => {
  const body = req.body;
  books.push({ id: books.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(books), (data) => {
    return res.json({ status: "success", id: books.length });
  });
});

app.listen(PORT, () => {
  console.log("Server Started At Port 3000!");
});