const { Router } = require('express');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = Router();

// authController
router.post('/api/signup', authController.signup_post);
router.post('/api/memberReg', authController.member_reg_post);
router.post('/api/login', authController.login_post);
router.post('/api/grabUser', authController.user_grab);
router.post('/api/fundsSet', authController.funds_set);

// taskController
router.post('/api/taskAdd', taskController.task_add);
router.post('/api/taskGrab', taskController.task_grab);
router.post('/api/taskDelete', taskController.task_delete);
router.post('/api/taskEdit', taskController.task_edit);
router.post('/api/taskComplete', taskController.task_complete);

module.exports = router;
