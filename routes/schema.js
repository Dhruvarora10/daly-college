const express = require("express");
const {helloWorld} = require("../controllers/schema");

router = express.Router();
router.get("/", helloWorld);
module.exports = router; 