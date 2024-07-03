import { Router } from "express";
import validate from "../middlwares/validate";
import { multerMiddleware } from "../middlwares/multer";
import FileController from "../controller/FileController";
import FileValidation from "../validations/FileValidation";
import ComonValidation from "../validations";

const upload = multerMiddleware();
const router = Router();

router.post(
  "/upload",
  upload.single("file"),
  validate(FileValidation.upload),
  FileController.uploadSingle,
);
router.get("/list", FileController.list);
router.get("/:id", validate(ComonValidation.single), FileController.single);
router.get(
  "/download/:id",
  validate(ComonValidation.single),
  FileController.download,
);
router.put(
  "/update/:id",
  upload.single("file"),
  validate(FileValidation.update),
  FileController.update,
);
router.delete(
  "/delete/:id",
  validate(ComonValidation.single),
  FileController.deleteSingle,
);

export default router;
