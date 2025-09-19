const mongoose = require("mongoose");

const blogtopicSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

const BlogTopic = mongoose.model("Blogtopic", blogtopicSchema);

module.exports = BlogTopic;
