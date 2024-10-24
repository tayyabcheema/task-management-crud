const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8088;
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is started on the port ${PORT}`);
  connectDB();
});
