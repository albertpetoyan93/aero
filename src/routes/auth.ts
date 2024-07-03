import { Router } from "express";
import validate from "../middlwares/validate";
import AuthController from "../controller/AuthController";
import AuthValidation from "../validations/AuthValidation";

const router = Router();

router.post("/signup", validate(AuthValidation.signup), AuthController.signUp);
router.post("/signin", validate(AuthValidation.signin), AuthController.signIn);
router.post(
  "/signin/new_token",
  validate(AuthValidation.newToken),
  AuthController.newToken,
);
router.get("/logout", AuthController.logOut);

export default router;
