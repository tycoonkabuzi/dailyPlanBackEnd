const mongoose = require("mongoose"); // we import mongoose here to be able to create a model.

const eventSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  activity: String,
  date: String,
  timeLeft: String,
  emergencyLevel: String,
  notes: String,
});

const activitiesSchema = new mongoose.Schema({
  day: String,
  events: [eventSchema],
});

module.exports = mongoose.model("activities", activitiesSchema);
