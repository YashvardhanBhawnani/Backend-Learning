import express from "express";
import fs from "fs";
import users from "./MOCK_DATA.json" with { type: "json" };

const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// rest api routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    users[index] = { ...users[index], ...req.body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      return res.json({ status: "success" });
    });
  })

  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      return res.json({ status: "success" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log("Server Started At Port 3000!"));
