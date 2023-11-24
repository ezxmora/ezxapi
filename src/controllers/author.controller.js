import httpstatus from "http-status";
import database from "../lib/database.js";
const { author } = database;

export const createAuthor = async (req, res, next) => {
  const { name } = req.body;
  const findAuthor = await author.findOne({ where: { name } });

  if (!findAuthor) {
    await author.create({ name });

    return res.json({
      author: { name },
      message: `The author ${name} has been created`,
    });
  }

  const err = new Error("That author already exists");
  err.statusCode = httpstatus.BAD_REQUEST;
  next(err);
};

export const updateAuthor = async (req, res, _) => {
  const { name, newName } = req.body;

  await author.update({ name: newName }, { where: { name } });

  return res.json({
    author: { name: newName },
    message: `${name} has been updated and is now ${newName}`,
  });
};

export const deleteAuthor = async (req, res, _) => {
  const { name } = req.body;

  await author.destroy({ where: { name } });

  return res.json({
    author,
    message: `${name} has been deleted`,
  });
};
