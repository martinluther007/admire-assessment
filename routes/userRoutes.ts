import express from "express";
import { signIn, signUp } from "../controllers/authController";
const Router = express();
Router.route("/signup").post(signUp);
Router.route("/signin").post(signIn);
export default Router;
