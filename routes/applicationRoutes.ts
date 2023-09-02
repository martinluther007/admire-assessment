import express from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getOneApplication,
  updateApplication,
} from "../controllers/applicationController";
import { authProtect } from "../controllers/authController";

const Router = express.Router();
Router.route("/").post(authProtect, createApplication).get(getAllApplications);
Router.route("/:id")
  .patch(authProtect, updateApplication)
  .get(authProtect, getOneApplication)
  .delete(authProtect, deleteApplication);
export default Router;
