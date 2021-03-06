const { Router } = require('express');
const { authenticate } = require('../middleware/tokenMiddleware');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = Router();

//#region SWAGGER_SCHEMA_SECURITY
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
//#endregion

//#region SWAGGER_RESPONSES
/**
 * @swagger
 * components:
 *  responses:
 *      UnauthorizedError:
 *          description: Access token is missing or invalid
 *      ForbiddenError:
 *          description: Token is invalid
 *      OK:
 *          description: The operation has been successfully performed
 *      Created:
 *          description: The operation has been successfully created
 */
//#endregion

// #region SWAGGER_SCHEMA_AUTH

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
 *          - login
 *          - password
 *          - fname
 *          - surname
 *      example:
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
 *      type: object
 *      required:
 *          - funds
 *      properties:
 *          funds:
 *              type: number
 *              description: Funds amount to set for user
 *      example:
 *          funds: 888
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
 *              201:
 *                  $ref: '#/components/responses/Created'
 *                  content:
 *                      'application/json': {}
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
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  $ref: '#/components/responses/Created'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region GRAB_USER
/**
 * @swagger
 *  /api/grabUser:
 *      get:
 *          tags:
 *              - User operations
 *          summary: Returns all user informations
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region FUNDS_SET
/**
 * @swagger
 *  /api/fundsSet:
 *      put:
 *          tags:
 *              - User operations
 *          summary: Setting amount of user's funds
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FundsSet'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region CONTROLLER_ROUTES_authController
router.post('/api/signup', authController.signup_post);
router.post('/api/memberReg', authenticate, authController.member_reg_post);
router.post('/api/login', authController.login_post);
router.get('/api/grabUser', authenticate, authController.user_grab);
router.put('/api/fundsSet', authenticate, authController.funds_set);
router.post('/api/refresh', authController.token_refresh);
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
 *          Task_User_ID:
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
 *          TaskID:
 *              type: object
 *              required:
 *                  - taskID
 *              properties:
 *                  taskID:
 *                      type: string
 *                      description: ID of wanted task
 *              example:
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
 *                          $ref: '#/components/schemas/Task'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  $ref: '#/components/responses/Created'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
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
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
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
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region SWAGGER_TASK_DELETE
/**
 * @swagger
 *  /api/taskDelete:
 *      delete:
 *          tags:
 *              - Task operations
 *          summary: Deleting existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task_User_ID'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region SWAGGER_TASK_COMPLETE
/**
 * @swagger
 *   /api/taskComplete:
 *      put:
 *          tags:
 *              - Task operations
 *          summary: Setting to complete existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskID'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region SWAGGER_TASK_APPROVE
/**
 * @swagger
 *   /api/taskApprove:
 *      put:
 *          tags:
 *              - Task operations
 *          summary: Set to approved existing task
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task_User_ID'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region SWAGGER_TASKs_GRAB_ALL
/**
 * @swagger
 *  /api/tasks/grabAll:
 *      get:
 *          tags:
 *              - Task operations
 *          summary: Grabbing all user's tasks
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  $ref: '#/components/responses/OK'
 *                  content:
 *                      'application/json': {}
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenError'
 */
// #endregion

// #region CONTROLLER_ROUTES_taskController
router.post('/api/taskAdd', authenticate, taskController.task_add);
router.post('/api/taskGrab', authenticate, taskController.task_grab);
router.delete('/api/taskDelete', authenticate, taskController.task_delete);
router.post('/api/taskEdit', authenticate, taskController.task_edit);
router.put('/api/taskComplete', authenticate, taskController.task_complete);
router.put('/api/taskApprove', authenticate, taskController.task_approve);
router.get('/api/tasks/grabAll', authenticate, taskController.tasks_grab_all);
// #endregion

module.exports = router;

