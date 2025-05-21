const express = require("express"); // importing the module
const app = express(); // assigning the module to a variable to be able to use it kind of creating an instance of that class.
const port = 8080;
const mongoose = require("mongoose"); // importing the module mongoose which is sort of our middle man between express and mongoDb Which is our database

mongoose.connect("mongodb://127.0.0.1:27017/daily-plan"); // we connect to our database

// here we will import our routers
const activiesRouter = require("./routers/activitiesRouter");

//routes
app.use("/activities", activiesRouter);

app.listen(port, () => {
  console.log(`Server Started on port ${port} `);
});
