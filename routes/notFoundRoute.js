// npm imports
const express = require('express');
const router = express.Router();

// file imports
const notFoundController = require('../controllers/notFoundController');

router.use('/',notFoundController.useNotFound);

module.exports = router;