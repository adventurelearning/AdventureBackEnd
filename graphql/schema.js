const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Subtitle {
    subtitle: String!
    content: String!
  }

  type Blog {
    id: ID!
    title: String!
    shortDescription: String!
    description: String!
    link: String
    photo: String!
    topic: String!
    subtitles: [Subtitle!]!
    trending: Boolean!
    order: Int!
    status: String
    likes: Int!
    createdAt: String!
    updatedAt: String!
      seo: Seo
  }

  type BlogTopic {
    id: ID!
    topic: String!
    order: Int!
    createdAt: String!
    updatedAt: String!
  }

  input SubtitleInput {
    subtitle: String!
    content: String!
  }
    type Seo {
  metaTitle: String
  metaDescription: String
  keywords: String
  canonicalUrl: String
}
input SeoInput {
  metaTitle: String
  metaDescription: String
  keywords: String
  canonicalUrl: String
}
  input BlogInput {
    title: String!
    shortDescription: String!
    description: String!
    link: String
    photo: String!
    topic: String!
    subtitles: [SubtitleInput!]!
    trending: Boolean
    order: Int
    status: String
      seo: SeoInput

  }

  type Query {
    blogPosts(trending: Boolean, topic: String, status: String): [Blog!]!
    blogPost(id: ID!): Blog
    blogPostByLink(link: String!): Blog
    blogTopics: [BlogTopic!]!
  }

  type Mutation {
    createBlogPost(input: BlogInput!): Blog!
    updateBlogPost(id: ID!, input: BlogInput!): Blog!
    deleteBlogPost(id: ID!): Boolean!
    updateBlogStatus(id: ID!, status: String!): Blog!
    createBlogTopic(topic: String!, order: Int!): BlogTopic!
    updateBlogTopic(id: ID!, topic: String, order: Int): BlogTopic!
    deleteBlogTopic(id: ID!): Boolean!
    likeBlogPost(id: ID!): Blog!
  }
`;

module.exports = typeDefs;