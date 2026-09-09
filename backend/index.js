const readItems = require("./get.js");
const addItem = require("./post.js");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/items", async (req, res) => {
  const items = await readItems(req.query.id, req.query);
  res.json(items);
});

app.get("/items/:id", async (req, res) => {
  const items = await readItems(req.params.id);
  if (items.length === 0) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(items[0]);
});

app.post("/api/items", async (req, res) => {
  try {
    const item = await addItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Unable to save item" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
