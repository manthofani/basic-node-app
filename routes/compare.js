const express = require('express');
const router = express.Router();
const c = require('../controllers/compareController');

router.post('/', c.compare);

module.exports = router;
