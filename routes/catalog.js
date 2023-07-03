var express = require("express");
var router = express.Router();
const catalog_controller = require("../controllers/catalogController");
const item_controller = require("../controllers/itemController");

/* GET users listing. */
router.get("/", function (req, res) {
  res.redirect("/all");
});

router.get("/all", catalog_controller.items_list);

router.get("/:id", catalog_controller.category_list);

router.get("/item/create", item_controller.create_item_get);

router.post("/item/create", item_controller.create_item_post);

router.get("/item/:id", item_controller.item_detail);

module.exports = router;
