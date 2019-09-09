const express = require('express');
const router = express.Router();

const groupControllers = require('../controllers/groupControllers');


// @route GET /groups/:name
// @desc  Displays a specific group
router.get('/:name',groupControllers.getRoot);

module.exports = router;