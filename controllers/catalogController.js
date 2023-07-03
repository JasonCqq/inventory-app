const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

exports.items_list = asyncHandler(async (req, res) => {
  const allItems = await Item.find().sort({ name: 1 }).exec();

  res.render("catalog_items", { title: "All Items", item_list: allItems });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: { $in: req.params.id } }).exec(),
  ]);

  if (category === null) {
    const err = new Error("Category does not exist");
    err.status = 404;
    return next(err);
  }

  res.render("catalog_items", {
    title: category.name,
    category: category,
    item_list: itemsInCategory,
  });
});
