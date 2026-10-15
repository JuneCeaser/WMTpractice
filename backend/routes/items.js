const router = require("express").Router();
const Item = require("../models/Item");

// GET all
router.get("/", async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

// CREATE
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const item = await Item.create({ name, description });
  res.status(201).json(item);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
