/**
 * @file userRoutes.js
 * Routes for handling user-related operations.
 * Includes routes for getting, creating, updating, and deleting users.
 */

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/**
 * Route serving user-related requests.
 * GET for retrieving all users,
 * POST for creating a new user,
 * PATCH for updating a user,
 * DELETE for deleting a user.
 */
router
    .route("/")
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
