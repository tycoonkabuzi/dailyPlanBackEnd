const express = require("express"); // importing the module
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express(); // assigning the module to a variable to be able to use it kind of creating an instance of that class.

const cors = require("cors");
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT;
const mongoose = require("mongoose"); // importing the module mongoose which is sort of our middle man between express and mongoDb Which is our database

mongoose.connect("mongodb://127.0.0.1:27017/daily-plan"); // we connect to our database
app.use(express.json()); // without this the req.body cannot work
// here we will import our routers
const activitiesRouter = require("./routers/activitiesRouter");
const usersRouter = require("./routers/usersRouter");

//routes
app.use("/activities", activitiesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT} `);
});
