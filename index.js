require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");

// Import DB connection and routes
const connectDB = require("./config/config");
const contactRoutes = require("./routes/contactsRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authRoutes = require("./routes/authRoutes");
const corporateTrainingRoutes = require("./routes/corporateTrainingRoutes");
const InternRoutes = require("./routes/InternRegisterRoute");
const JobApplicationRoutes = require("./routes/jobapplicationRoutes");
const contactTechRoutes = require("./routes/contactTechRoute");
const nodemailer = require("nodemailer");

console.log(nodemailer);

// GraphQL schema and resolvers
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/reoslvers");




const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 4000;

async function startServer() {
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Middlewares for GraphQL endpoint
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || "",
      }),
    })
  );

  // REST API routes
  app.use("/api/corporate-training", corporateTrainingRoutes);
  // app.use('/api/admin',adminRouter)
  app.use("/api/contacts", contactRoutes);
  app.use("/api/register", registerRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/intern", InternRoutes);
  app.use("/api/jobapplication", JobApplicationRoutes);
  app.use("/api/contact-tech", contactTechRoutes);

  app.get("/", (req, res) => {
    res.send("Server is running Goodly 🚀");
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
