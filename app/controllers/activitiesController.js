const Activities = require("../models/activitiesModel");

module.exports = {
  index: async (req, res) => {
    try {
      const activities = await Activities.find({});
      res.status(200).json(activities);
    } catch (err) {
      res.status(500).json({ error: true, message: "Unable to get the data" });
    }
  },
};
