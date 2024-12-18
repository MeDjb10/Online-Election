require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const electionRoutes = require("./routes/electionRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const voteRoutes = require("./routes/voteRoutes");
const commentRoutes = require("./routes/commentRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const errorHandler = require("./utils/errorHandler");
const helmet = require("helmet");
const swaggerDocs = require("./swagger");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(require("cors")());
app.use(helmet());

// Connect to MongoDB
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Election Management API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/favorites", favoritesRoutes);

// Swagger Docs
swaggerDocs(app);

// Error Handler
app.use(errorHandler);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = { server, io };

// Listen on PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
