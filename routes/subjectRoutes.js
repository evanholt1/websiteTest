const express = require('express');
const router = express.Router();

const subjectControllers = require('../controllers/subjectControllers');

// @route GET /subjects/
// @desc  shows all subjects in the college
router.get('/',subjectControllers.getRoot);

// @route POST /subjects/create
// @desc  creates a new subject & a group for it
router.post('/create',subjectControllers.postCreate);

// @route POST /subjects/update
// @desc  updates the title of a subject & its group
router.post('/update',subjectControllers.postUpdate);

// @route POST /subjects/create
// @desc  creates a new subject & a group for it
router.delete('/delete',subjectControllers.deleteDelete);
module.exports = router;