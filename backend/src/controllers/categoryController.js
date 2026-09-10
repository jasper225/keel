const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { userId, parentId, name, type } = req.body;

  if (!userId || !parentId || !name || !type) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  try {
    const category = await Category.create({ userId, parentId, name, type });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCategoriesByUserId = async (req, res) => {
  const userId = req.body;

  try {
    const categories = await Category.getByUserId(userId);
    if (!categories)
      return res.status(404).json({ error: "No categories found" });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getChildrenCategories = async (req, res) => {
  try {
    const categories = await Category.getChildren(req.params.id);
    if (!categories)
      return res.status(404).json({ error: "No categories found" });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { parentId, name, type } = req.body;

  if (!parentId || !name || !type) {
    return res
      .status(400)
      .json({ error: "At least one field must be selected" });
  }

  try {
    const updatedCategory = await Category.update(id, { parentId, name, type });
    res.status(201).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
