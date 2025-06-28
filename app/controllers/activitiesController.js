const Activities = require("../models/activitiesModel");

module.exports = {
  index: async (_req, res) => {
    try {
      const activities = await Activities.find({});
      res.status(200).json(activities);
    } catch (err) {
      res.status(500).json({ error: true, message: "Unable to get the data" });
    }
  },

  addEvent: async (req, res) => {
    // adding data in the database, actually adding an activity to one of the days of the week.
    try {
      const { date, ...eventData } = req.body; // we assign value to particular elements of the req.body
      const parsedDate = new Date(date); // transforms the string into a date format to be able to extract the day based on the date.
      const day = parsedDate.toLocaleDateString("en-US", { weekday: "long" }); // we find the day as a string based on the parsedDate

      const updateActivity = await Activities.findOneAndUpdate(
        { day },
        {
          $push: { events: { ...eventData, date: parsedDate } },
        },
        { new: true, upsert: true } // here we mean, if the document is not there then create it.
      );

      res.status(201).json(updateActivity);
    } catch (error) {
      res.status(400).json({ err: error });
    }
  },

  setSingleActivity: async (req, res) => {
    try {
      const { singleDay, id } = req.query;
      const day = await Activities.findOne({ day: singleDay });
      //http://localhost:8080/activities/tuesday/event?id=/682f57970fe4e18719052071
      const allEvents = day.events;
      const singleEvent = allEvents.find(
        (event) => event._id.toString() === id
      );
      res.status(200).json(singleEvent);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  deleteActivity: async (req, res) => {
    try {
      const { day, id } = req.query;
      const toBeDeleted = await Activities.findOneAndUpdate(
        { day },
        { $pull: { events: { _id: id } } },
        { new: true }
      );
      if (toBeDeleted.events.length === 0) {
        console.log(toBeDeleted.events.length);
        await Activities.deleteOne({ day });
      }
      res.status(200).json(toBeDeleted);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
