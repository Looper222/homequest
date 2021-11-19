const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

// authController
router.post('/api/signup', authController.signup_post);
router.post('/api/memberReg', authController.member_reg_post);
router.post('/api/login', authController.login_post);

module.exports = router;
