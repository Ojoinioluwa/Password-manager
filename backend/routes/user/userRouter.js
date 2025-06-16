const express = require("express");
const userController = require("../../controller/userCtrl");
const authLimiter = require("../../middlewares/authLimiter");
const isAuthenticated = require("../../middlewares/isAuth");

// instantiate the user router
const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *      post:
 *        description: Register a new user
 *        tags: [auth]
 *        requestBody:
 *          description: Register a new User
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                  example:
 *                      firstName: inioluwa
 *                      lastName: ojo
 *                      email: inioluwaojo@gmail.com
 *                      password: ojo@inioluwa.1245HF
 *                      phoneNumber: "08012345678"
 *        responses: 
 *           '201':
 *             description: User registered Successfully
 *             content: 
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 *           '400':
 *              description: All fields are required or Invalid email format / password format
 *           '409':
 *               description: User Already exist, Login or make use of another email
 *           '500':
 *               description: Error sending confirmation email.
 * 
 * 
 */


// register the user
userRouter.post("/auth/register", userController.register);

/**
 * @swagger
 *      /api/v1/auth/login:
 *          post:
 *              description: Login user into the account
 *              tags: [auth]
 *              requestBody:
 *                  description: Login a verified user 
 *                  required: true
 *                  content: 
 *                      application/json:
 *                          example: 
 *                              email: ojoinioluwa05@gmail.com
 *                              password: Ini@2005
 *              responses:
 *                      '200':  
 *                          description: User logged in successfully
 *                      '404': 
 *                          description: User does not exist
 *                      '400':
 *                           description: bad request ensure all fields are field
 *                      
 *                          
 * 
 */

// login in the user
userRouter.post('/auth/login', authLimiter, userController.login)

// verify email
userRouter.post("/auth/verify-user", userController.verifyUser)

// get users profile

/***
 * @swagger
 *      /api/v1/getUserProfile:
 *          get:
 *             tags: [auth]
 *             description: Get user profile information
 *             security:
 *                  -bearerAuth:  []
 *             responses:
 *                  '200':
 *                      description: Fetched user profile successfully
 *                      content:
 *                       application/json:
 *                         example:
 *                              message: Fetched user profile successfully
 *                              user:
 *                                  _id: 60b8c0f7c8a4a64f0894a2a3
 *                                  email: inioluwaojo@gmail.com
 *                                  firstName: Inioluwa
 *                                  lastName: Ojo
 *                                  phoneNumber: "08012345678"
 *                                  salt: somesaltvaluewillbeprovided
 *                                  verified: true
 *                  '400': 
 *                       description: bad request
 *                  '404':
 *                      description: user does not exist
 *                  '401':
 *                      description: Authorization token is missing or invalid
 *                  
 * 
 */
userRouter.get("/getUserProfile", isAuthenticated, userController.getUserProfile)

/***
 * @swagger
 *      /api/v1/getSaltAndId:
 *              get:
 *                  tags: [auth]
 *                  description: Get salt and the id for a user
 *                  summary: Get the salt of a user by email
 * 
 *          
 * 
 */
userRouter.get("/getSaltAndId", userController.getUserSaltAndId)

module.exports = userRouter