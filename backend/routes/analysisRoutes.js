const express = require('express');
const router = express.Router();
const analysisController = require('./../controllers/analysisController');

router.post('/monthly', analysisController.getThisMonthAnalysis)

module.exports = router;