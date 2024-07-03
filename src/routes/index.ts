import { Router } from "express";
import auth from "./auth";
import file from "./file";
import user from "./user";

const router = Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/file", file);

export default router;
