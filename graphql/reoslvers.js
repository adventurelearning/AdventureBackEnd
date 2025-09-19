const Blog = require("../models/Blog");
const BlogTopic = require("../models/Blogtopic");

const resolvers = {
  Query: {
    blogPosts: async (_, { trending, topic, status }) => {
      let query = {};
      if (trending !== undefined) query.trending = trending;
      if (topic) query.topic = topic;
      if (status) query.status = status;
      
      return await Blog.find(query).sort({ order: 1, updatedAt: -1 });
    },
    
    blogPost: async (_, { id }) => {
      return await Blog.findById(id);
    },
    
    blogPostByLink: async (_, { link }) => {
      return await Blog.findOne({ link });
    },
    
    blogTopics: async () => {
      return await BlogTopic.find().sort({ order: 1 });
    },
  },
  
  Mutation: {
    createBlogPost: async (_, { input }) => {
      const blog = new Blog({
        ...input,
        trending: input.trending || false,
        order: input.order || 0,
        likes: 0
      });
      await blog.save();
      return blog;
    },
    
    updateBlogPost: async (_, { id, input }) => {
      return await Blog.findByIdAndUpdate(
        id,
        { ...input },
        { new: true }
      );
    },
    
    deleteBlogPost: async (_, { id }) => {
      await Blog.findByIdAndDelete(id);
      return true;
    },
    
    updateBlogStatus: async (_, { id, status }) => {
      return await Blog.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
    },
    
    createBlogTopic: async (_, { topic, order }) => {
      const newTopic = new BlogTopic({ topic, order });
      await newTopic.save();
      return newTopic;
    },
    
    updateBlogTopic: async (_, { id, topic, order }) => {
      return await BlogTopic.findByIdAndUpdate(
        id,
        { topic, order },
        { new: true }
      );
    },
    
    deleteBlogTopic: async (_, { id }) => {
      await BlogTopic.findByIdAndDelete(id);
      return true;
    },
    
    likeBlogPost: async (_, { id }) => {
      return await Blog.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;