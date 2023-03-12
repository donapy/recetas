const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/recipe", require("./routes/recipesRoutes"));
app.use("/api/user", require("./routes/usersRoutes"));

app.listen(port, () => {
  console.log(`Backend running on ${port}`.cyan);
});
