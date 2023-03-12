const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./config/mongoose.config");
require("./config/multer.config");

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
const usersRoutes = require("./routes/users.routes");
usersRoutes(app);
const recipesRoutes = require("./routes/recipes.routes");
recipesRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
