const { Router } = require('express');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = Router();

// #region SWAGGER SCHEMA

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      required:
 *
 *      properties:
 *          token:
 *            type: string
 *            description: The auto-generated token JWT, given after logging in or after registration
 *          userID:
 *            type: string
 *            description: The auto-generated user id
 *          login:
 *            type: string
 *            description: User login
 *          password:
 *            type: string
 *            description: User password
 *          fname:
 *            type: string
 *            description: User first name
 *          surname:
 *            type: string
 *            description: User surname
 *          parentID:
 *            type: string
 *            description: ID of parent
 *      example:
 *          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWE1Nzc3ZWE3M2FhMmEwNTZjNDcyYyIsImlhdCI6MTYzNzc4NzgwOCwiZXhwIjoxNjM4MTMzNDA4fQ.VLjDjV1IueXpRgdL4Mthao0H7VQ5zEOoVx28XFhE7cM
 *          userID: 619a5777ea73aa2a056c472c
 *          login: dwayne1
 *          password: kwakwa5!
 *          fname: Dwayne
 *          surname: Johnson
 *          parentID: 619a5777ea73aa2a056c472c
 */

// #endregion

/**
 * @swagger
 *  /api/signup:
 *      post:
 *          summary: User registration proccess
 *          response:
 *              200:
 *                  description: User's metadata
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */

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
router.post('/api/taskApprove', taskController.task_approve);

module.exports = router;
