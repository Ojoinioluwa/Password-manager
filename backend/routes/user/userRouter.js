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
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                          example: 
 *                              email: ojoinioluwa05@gmail.com
 *                              password: Ini@2005
 *                  responses:
 *                      '200':  
 *                          description: User logged in successfully
 *                      '404': 
 *                          description: User does not exist
 *                      '400':
 *                           description: bad request ensure all fields are field
 *                          
 * 
 */

// login in the user
userRouter.post('/auth/login', authLimiter, userController.login)

// verify email
userRouter.post("/auth/verify-user", userController.verifyUser)

// get users profile
userRouter.get("/getUserProfile", isAuthenticated, userController.getUserProfile)
userRouter.get("/getSaltAndId", userController.getUserSaltAndId)

module.exports = userRouter