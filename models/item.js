const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 1 },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  price: { type: Number, required: true },
  quantity: { type: Number },
  available: { type: Boolean },
});

// Virtual
// ItemSchema.virtual("url").get(function () {
// We don't use an arrow function as we'll need the this object
//   return `/category/item/${this._id}`;
// });

// Export model
module.exports = mongoose.model("Item", ItemSchema);
