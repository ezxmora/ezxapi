import { Router } from "express";
import { body } from "express-validator";
import { createKey, refreshKey } from "../../controllers/key.controller.js";
import { auth } from "../../middlewares/auth.js";
const router = Router({ caseSensitive: true });

router
  .post("/", [body("email").isEmail()], createKey)
  .put("/", [body("email").isEmail(), auth], refreshKey);

export default router;
