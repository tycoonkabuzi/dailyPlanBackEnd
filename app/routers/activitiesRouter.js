const express = require("express"); // we import again the express module
const router = express.Router(); // we will use the router method so we assign it to our variable.
// import the controller
const activitiesSchema = require("../controllers/activitiesController");

//routes will be here.
router.get("/", activitiesSchema.index);
module.exports = router;
