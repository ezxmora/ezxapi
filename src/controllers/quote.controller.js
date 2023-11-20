import httpStatus from "http-status";
import { getRepository } from "../lib/util.js";
import { authorExists } from "./author.controller.js";

const quotes = getRepository("Quote");

export const createQuote = async (req, res, next) => {
  const { author, quote } = req.body;
  const authorCheck = await authorExists(author);

  if (authorCheck) {
    const newQuote = { author, quote };
    await quotes.save(newQuote);

    return res.json(req.body);
  }

  const err = new Error("That author doesn't exist");
  err.statusCode = httpStatus.BAD_REQUEST;
  next(err);
};

export const removeQuote = async (req, res, next) => {
  const { quoteId } = req.body;
};

export const updateQuote = async (req, res, next) => {};

export const getQuotes = async (req, res, next) => {};

export const getAllQuotesByAuthor = async (req, res, next) => {};
