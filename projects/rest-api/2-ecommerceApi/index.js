import express from "express";
import fs from "fs";
import products from "./Mock_Products.json" with { type: "json" };

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

// GET /api/products
app.get("/api/products", (req, res) => {
  const { category, maxPrice } = req.query;
  let result = products;
  if (category) {
    result = result.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }
  if (maxPrice !== undefined) {
    const limit = Number(maxPrice);
    if (isNaN(limit)) {
      return res.status(400).json({ error: "maxPrice must be a valid number" });
    }
    result = result.filter((product) => product.price <= limit);
  }
  return res.status(200).json(result);
  return res.json(products);
});


// DELETE / api / products /: id
// GET /api/products/:id

app
  .route("/api/products/:id")

  .get((req, res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    return res.json(product);
  })

  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    products.splice(index, 1);
    fs.writeFile("Mock_Products.json", JSON.stringify(products), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write file" });
      }
      return res.json({ status: "success", deletedId: id });
    });
  });

// POST /api/products
app.post("/api/products", (req, res) => {
  const body = req.body;
  products.push({ id: products.length + 1, ...body });
  fs.writeFile("Mock_Products.json", JSON.stringify(products), (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed To Write File" });
    }
    return res.json({ status: "success", id: products.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}!`);
});
