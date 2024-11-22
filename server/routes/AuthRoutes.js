const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const rateLimiter = require('../middlewares/RateLimiter');

router.route('/signup').post(rateLimiter(5), authController.signup);
router.route('/verify').post(rateLimiter(5), authController.verifyEmail);
router.route('/login').post(rateLimiter(5), authController.login);
router.route('/logout').post(rateLimiter(5), authController.logout);
router.route('/refresh').post(rateLimiter(5), authController.refresh);

module.exports = router;    