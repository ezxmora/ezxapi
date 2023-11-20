import httpstatus from "http-status";
import { getRepository } from "../lib/util.js";

const authors = getRepository("QuoteAuthor");
export const authorExists = (author) => authors.findOneBy({ name: author });

export const createAuthor = async (req, res, next) => {
  const { name } = req.body;
  const author = await authorExists(name);

  if (!author) {
    const newAuthor = { name };
    await authors.save(newAuthor);

    return res.json(req.body);
  }

  const err = new Error("That author already exists");
  err.statusCode = httpstatus.BAD_REQUEST;
  next(err);
};

export const updateAuthor = async (req, res, next) => {
  const { name } = req.body;
  const author = await authorExists(name);

  if (author) {
    author.name = name;
    const updatedAuthor = await authors.save(author);
    delete updatedAuthor.id;

    return res.json(updatedAuthor);
  }

  const err = new Error("That author doesn't exist");
  err.statusCode = httpstatus.BAD_REQUEST;
  next(err);
};

export const deleteAuthor = async (req, res, next) => {
  const { name } = req.body;
  const author = await authorExists(name);

  if (author) {
    await authors.delete({ name });

    return res.json(author);
  }
};
