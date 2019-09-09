const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

// @route POST /users/signup
// @desc  creates a new user document
router.post('/signup',userControllers.postSignup);

// @route POST /users/login
// @desc  logs in a user, creating a session
router.post('/login',userControllers.postLogin);

// @route POST /users/logout
// @desc  logs out a user, destroying their session
router.post('/logout',userControllers.postLogout);

module.exports = router;