const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minLength: 1 },
});

// categorySchema.virtual("url").get(function () {
//     return `catalog/genre/${this._id}`;
// })

module.exports = mongoose.model("Category", categorySchema);
