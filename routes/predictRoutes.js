const express = require('express');
const { postPredictHandler } = require('../controllers/predictController');

const router = express.Router();

router.post('/', postPredictHandler);

module.exports = router;
