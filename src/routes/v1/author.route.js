import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  updateAuthor,
} from "../../controllers/author.controller.js";
import { auth } from "../../middlewares/auth.js";
import { authorExists } from "../../middlewares/validation.js";
const router = Router({ caseSensitive: true });

router
  .post("/", auth, createAuthor)
  .put("/", [auth, authorExists], updateAuthor)
  .delete("/", [auth, authorExists], deleteAuthor);

export default router;
