const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

exports.item_detail = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();

  res.render("item_detail", { title: item.name, item: item });
});

exports.create_item_get = asyncHandler(async (req, res) => {
  const cats = await Category.find().exec();
  res.render("item_create", { categories: cats });
});

exports.create_item_post = [
  // Validate and sanitize fields.
  body("name", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "Quantity must not be empty.")
    .trim()
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
      return true;
    })
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an Item object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      available: true,
      description: "N/A",
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("item_create", {
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save item.
      await item.save();
      res.redirect(`/catalog/${item.category}`);
    }
  }),
];

exports.delete_item = asyncHandler(async (req, res) => {
  await Item.deleteOne({ _id: req.params.id });
  res.redirect("/catalog/all");
});

exports.update_item = asyncHandler(async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, {
    $set: { quantity: req.body.update },
  });
  res.redirect("/catalog/all");
});
