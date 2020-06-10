const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
// Body Parser
app.use(express.json());

// Connecting the database
mongoose.connect("mongodb://127.0.0.1/auth", (err, conn) => {
  console.log("Database is connected");
});

// passport configuration added

app.use(passport.initialize());
require("./src/config/passportConfig");

// added routes
app.use("/api/user", require("./src/routes/auth"));

// Starting the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
