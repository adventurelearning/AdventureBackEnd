require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const connectDB = require("./config/config");

// Import routes
const contactRoutes = require("./routes/contactsRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authRoutes = require("./routes/authRoutes");
const corporateTrainingRoutes = require("./routes/corporateTrainingRoutes");
const InternRoutes = require("./routes/InternRegisterRoute");
const JobApplicationRoutes = require("./routes/jobapplicationRoutes");
const contactTechRoutes = require("./routes/contactTechRoute");

// GraphQL schema + resolvers
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/reoslvers");

const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174", "https://adventure-admin.vercel.app","https://admin.adventurelearning.in","https://www.adventurelearning.co.in"],
}));
app.use(express.json());

// REST routes
app.use("/api/corporate-training", corporateTrainingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/intern", InternRoutes);
app.use("/api/jobapplication", JobApplicationRoutes);
app.use("/api/contact-tech", contactTechRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running with REST + GraphQL 🚀");
});

// ✅ Function to attach Apollo Server
async function setupApollo() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || "",
      }),
    })
  );
}

setupApollo();

// ✅ Export Express app for Vercel
module.exports = app;

// ✅ Local development (only runs when not in Vercel)

  // const PORT = process.env.PORT || 4000;
  // app.listen(PORT, () => {
  //   console.log(`✅ Local server running at http://localhost:${PORT}`);
  //   console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  // });

