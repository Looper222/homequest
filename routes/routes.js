const { Router } = require('express');
const { authenticate } = require('../middleware/tokenMiddleware');
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
 *     IdNeeded:
 *      required:
 *          - userID
 *      propreties:
 *          userID:
 *              type: string
 *              description: User's ID
 *      example:
 *          userID: 619a5777ea73aa2a056c472c
 *     FundsSet:
 *      allOf:
 *      - $ref: '#/components/schemas/IdNeeded'
 *      - type: object
 *      required:
 *          - userID
 *          - funds
 *      properties:
 *          funds:
 *              type: number
 *              description: Funds amount to set for user
 *      example:
 *          userID: 619a5777ea73aa2a056c472c
 *          funds: 888
 *     
 */

// #endregion

// #region LOGIN_POST
/**
 * @swagger
 *  /api/login:
 *      post:
 *          tags:
 *              - User operations
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
 *          tags:
 *              - User operations
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
// #endregion

// #region MEMBER_REG_POST
/**
 * @swagger
 *  /api/memberReg:
 *      post:
 *          tags:
 *              - User operations
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

// #region GRAB_USER
/**
 * @swagger
 *  /api/grabUser:
 *      post:
 *          tags:
 *              - User operations
 *          summary: Returns all user informations
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/IdNeeded'
 *          responses:
 *              200:
 *                  description: User data has been grabbed
 */
// #endregion

// #region FUNDS_SET
/**
 * @swagger
 *  /api/fundsSet:
 *      post:
 *          tags:
 *              - User operations
 *          summary: Setting amount of user's funds
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FundsSet'
 *          responses:
 *              200:
 *                  description: Amount of user's funds has been set
 */
// #endregion

// #region CONTROLLER_ROUTES_authController
router.post('/api/signup', authController.signup_post);
router.post('/api/memberReg', authController.member_reg_post);
router.post('/api/login', authController.login_post);
router.post('/api/grabUser', authenticate, authController.user_grab);
router.post('/api/fundsSet', authController.funds_set);
// #endregion

// #region SWAGGER_SCHEMAS_TASKS
/**
 * @swagger
 *  components:
 *      schemas:
 *          Task:
 *              type: object
 *              required:
 *                  - userID
 *                  - title
 *                  - description
 *                  - flashesAmount
 *              properties:
 *                  userID:
 *                      type: string
 *                      description: Child's ID
 *                  title:
 *                      type: string
 *                      description: Title for new task
 *                  description:
 *                      type: string
 *                      description: Task description
 *                  flashesAmount:
 *                      type: number
 *                      description: The number of flashes assigned to the task
 *              example:
 *                  userID: 619f723f683803812973014e
 *                  title: Mowing the lawn
 *                  description: You have to mow the lawn
 *                  flashesAmount: 20
 *          TaskAdd:
 *              allOf:
 *              - #ref: '#/components/Task'
 *              - type: object
 *              required:
 *                  - parentID
 *                  - userID
 *                  - title
 *                  - description
 *                  - flashesAmount
 *              properties:
 *                  parentID:
 *                      type: string
 *                      description: Parent's ID of given user
 *              example:
 *                  parentID: 619a5777ea73aa2a056c472c
 *                  userID: 619f723f683803812973014e
 *                  title: Mowing the lawn
 *                  description: You have to mow the lawn
 *                  flashesAmount: 20
 *          TaskEdit:
 *              allOf:
 *              - #ref: '#/components/Task'
 *              - type: object
 *              required:
 *                  - userID
 *                  - taskID
 *                  - title
 *                  - description
 *                  - flashesAmount
 *                  - _type
 *              properties:
 *                  taskID:
 *                      type: string
 *                      description: ID of given task
 *                  _type:
 *                      type: number
 *                      description: Task status
 *              example:
 *                  userID: 619f723f683803812973014e
 *                  taskID: 1395368568480
 *                  title: Mowing the lawn
 *                  description: You have to mow the lawn behind the house
 *                  flashesAmount: 20
 *                  _type: 1
 *          TaskID:
 *              type: object
 *              required:
 *                  - userID
 *                  - taskID
 *              properties:
 *                  userID:
 *                      type: string
 *                      description: ID of kid who task is belonged to
 *                  taskID:
 *                      type: string
 *                      description: ID of wanted task
 *              example:
 *                  userID: 619f723f683803812973014e
 *                  taskID: 1395368568480
 *
 */
// #endregion

// #region SWAGGER_TASK_ADD
/**
 * @swagger
 *  /api/taskAdd:
 *      post:
 *          tags:
 *              - Task operations
 *          summary: Adding new task for a user
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskAdd'
 *          responses:
 *              200:
 *                  description: Task has been successfully added
 */
// #endregion

// #region SWAGGER_TASK_EDIT
/**
 * @swagger
 *  /api/taskEdit:
 *      post:
 *          tags:
 *              - Task operations
 *          summary: Editing existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskEdit'
 *          responses:
 *              200:
 *                  description: Task has been edited
 */
// #endregion

// #region SWAGGER_TASK_GRAB
/**
 * @swagger
 *  /api/taskGrab:
 *      post:
 *          tags:
 *              - Task operations
 *          summary: Grabbing existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskID'
 *          responses:
 *              200:
 *                  description: Task has been grabbed
 */
// #endregion

// #region SWAGGER_TASK_DELETE
/**
 * @swagger
 *  /api/taskDelete:
 *      post:
 *          tags:
 *              - Task operations
 *          summary: Deleting existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskID'
 *          responses:
 *              200:
 *                  description: Task has been deleted
 */
// #endregion

// #region SWAGGER_TASK_COMPLETE
/**
 * @swagger
 *   /api/taskComplete:
 *      post:
 *          tags:
 *              - Task operations
 *          summary: Setting to complete existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskID'
 *          responses:
 *              200:
 *                  description: Task has been set to completed
 */
// #endregion

// #region SWAGGER_TASK_APPROVE
/**
 * @swagger
 *   /api/taskApprove:
 *      post:
 *          tags:
 *              - Task operations
 *          summary: Set to appove existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskID'
 *          responses:
 *              200:
 *                  description: Task has been set to approve
 */
// #endregion

// #region CONTROLLER_ROUTES_taskController
router.post('/api/taskAdd', taskController.task_add);
router.post('/api/taskGrab', taskController.task_grab);
router.post('/api/taskDelete', taskController.task_delete);
router.post('/api/taskEdit', taskController.task_edit);
router.post('/api/taskComplete', taskController.task_complete);
router.post('/api/taskApprove', taskController.task_approve);
// #endregion

module.exports = router;

