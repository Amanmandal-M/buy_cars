const express = require("express");
const cors = require("cors");
const colors = require("colors");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------------->>>>>>>> Locations <<<<<<<<-------------------
// Configs Location
const { connectToDatabase } = require("./configs/mongo_db_config");
const { specs } = require("./configs/swagger_Config");

// Routers Location
const user_router = require("./routes/user_route");
const company_router = require("./routes/company_route");

// Middleware Location

// Middlewares
app.use(express.json());
app.use(cors());

// Set the view engine to EJS
app.set("view engine", "ejs");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Home route
app.get("/", (req, res) => {
  res.render("home/home");
});

// Routes (API Endpoints)
app.use("/api/auth", user_router);
app.use("/api/company", company_router);


// Middleware for token authentication (applies to the routes below)

// Server Listening
(async () => {
  try {
    await connectToDatabase();

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`.blue);
    });
  } catch (error) {
    console.error(colors.red(`Database connection error:`, error.message));
  }
})();
