import { Router } from "express";
import { body, param } from "express-validator";
import {
  createQuote,
  getAllQuotesByAuthor,
  getQuotes,
  removeQuote,
  updateQuote,
} from "../../controllers/quote.controller.js";
import { authorExists, quoteExists } from "../../middlewares/validation.js";
const router = Router({ caseSensitive: true });

router
  .post("/", [body("id").isUUID(), authorExists], createQuote)
  .delete("/", [body("id").isUUID(), quoteExists], removeQuote)
  .put("/", [body("id").isUUID(), quoteExists], updateQuote)
  .get("/:id?", getQuotes)
  .get(
    "/author/:author",
    [param("author").isUUID(), authorExists],
    getAllQuotesByAuthor
  );

export default router;
