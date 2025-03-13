const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/appointments", statsController.generateAppointmentStats);
router.get("/revenue", statsController.generateRevenueStats);

module.exports = router;
