const express = require('express');
const router = express.Router();

const subjectControllers = require('../controllers/subjectControllers');

// @route POST /subjects/create
// @desc  creates a new subject & a group for it
router.post('/create',subjectControllers.postCreate);

router.post('/updateTitle',subjectControllers.postUpdateTitle);

module.exports = router;