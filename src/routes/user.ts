import { Router } from "express";
import validate from "../middlwares/validate";
import UserController from "../controller/UserController";

const router = Router();

router.get("/info", UserController.info);

export default router;
