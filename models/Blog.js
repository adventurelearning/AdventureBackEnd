const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: false }, 
    photo: { type: String, required: true },
    topic: { type: String, required: true },
    subtitles: [
      {
        subtitle: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    trending: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String },
    likes: { type: Number, default: 0 }, // Added likes field
     seo: {
      metaTitle: { type: String, required: false },
      metaDescription: { type: String, required: false },
      keywords: { type: String, required: false },
      canonicalUrl: { type: String, required: false }
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;