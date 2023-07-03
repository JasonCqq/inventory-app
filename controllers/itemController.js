const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

exports.item_detail = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();

  res.render("item_detail", { title: item.name, item: item });
});

exports.create_item = asyncHandler(async (req, res) => {
  res.render("item_create");
});
