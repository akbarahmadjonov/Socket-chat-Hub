const express = require("express");
const router = express.Router();
const { reJoin, join } = require("../controllers/chat.controller");

router.get("/", (req, res) => {
  res.render("join");
});

//* Routes
router.post("/reJoin", reJoin);
router.post("/join", join);

module.exports = router;
