import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  updateAuthor,
} from "../../controllers/author.controller.js";
import { auth } from "../../middlewares/auth.js";
const router = Router({ caseSensitive: true });

router
  .post("/", auth, createAuthor)
  .put("/", auth, updateAuthor)
  .delete("/", auth, deleteAuthor);

export default router;
