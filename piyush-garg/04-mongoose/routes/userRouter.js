import express from "express";
import {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDelUserById,
  handleCreateNewUser,
} from "../controllers/userController.js";

const router = express.Router();

// rest api routes
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDelUserById);

export default router;