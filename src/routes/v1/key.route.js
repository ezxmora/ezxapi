import { Router } from "express";
import { validate } from "express-validation";
import { createKey, refreshKey } from "../../controllers/key.controller.js";
import { auth } from "../../middlewares/auth.js";
import { validEmail } from "../../middlewares/validation.js";
const router = Router({ caseSensitive: true });

router
  .post("/", [validate(validEmail)], createKey)
  .put("/", [validate(validEmail), auth], refreshKey);

export default router;
