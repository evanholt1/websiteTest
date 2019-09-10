const express = require('express');
const router = express.Router();

const groupControllers = require('../controllers/groupControllers');


// @route GET /groups/:name
// @desc  Displays a specific group
router.get('/:name',groupControllers.getRoot);

// @route post /groups/:name/addPost
// @desc  adds a new post to a group
router.post('/:name/newPost',groupControllers.postNewPost);

module.exports = router;