const { Router } = require('express');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = Router();

// #region SWAGGER SCHEMA

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *      type: object
 *      required:
 *          - login
 *          - password
 *      properties:
 *          login:
 *              type: string
 *              description: User's login
 *          password:
 *              type: string
 *              description: User's password
 *      example:
 *          login: dwayne1
 *          password: kwakwa5!
 *     Signup:
 *      allOf:
 *      - $ref: '#/components/schemas/Login'
 *      - type: object
 *      required:
 *          - login
 *          - password
 *          - fname
 *          - surname
 *      properties:
 *          fname:
 *              type: string
 *              description: User's first name
 *          surname:
 *              type: string
 *              description: User's surname
 *      example:
 *          login: batman1
 *          password: kwakwa5!
 *          fname: Bruce
 *          surname: Wayne
 *     MemberReg:
 *      allOf:
 *      - $ref: '#/components/schemas/Signup'
 *      - type: object
 *      required:
 *          - parentID
 *          - login
 *          - password
 *          - fname
 *          - surname
 *      properties:
 *          parentID:
 *              type: string
 *              description: Parent account's id
 *      example:
 *          parentID: 619a5777ea73aa2a056c472c
 *          login: kid1
 *          password: kwakwa5!
 *          fname: kidf1
 *          surname: kids1
 */

// #endregion

// #region LOGIN_POST

/**
 * @swagger
 *  /api/login:
 *      post:
 *          summary: The proccess of user logging in.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *          responses:
 *              200:
 *                  description: User has been logged in
 */

// #endregion

// #region SIGNUP_POST
/**
 * @swagger
 *  /api/signup:
 *      post:
 *          summary: The proccess of user registration
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Signup'
 *          responses:
 *              200:
 *                  description: User has been registered
 */
// #

// #region MEMBER_REG_POST
/**
 * @swagger
 *  /api/memberReg:
 *      post:
 *          summary: The proccess of creating family member (kid)
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MemberReg'
 *          responses:
 *              200:
 *                  description: Member user has been created
 */
// #endregion

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

