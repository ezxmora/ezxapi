import { randomBytes } from "crypto";
import httpstatus from "http-status";
import database from "../lib/database.js";
const { key } = database;

const generateRandomKey = () => randomBytes(32).toString("hex");

const keyExists = (email) => key.findOne({ where: { email } });

const invalidEmailError = (next) => {
  const err = new Error("That email address isn't valid");
  err.statusCode = httpstatus.BAD_REQUEST;
  next(err);
};

export const createKey = async (req, res, next) => {
  const { email } = req.body;
  const isKey = await keyExists(email);

  if (!isKey) {
    const newKey = {
      key: generateRandomKey(),
      email,
    };

    const savedKey = await key.create(newKey);

    return res.json(savedKey);
  }

  invalidEmailError(next);
};

export const refreshKey = async (req, res, next) => {
  const { email } = req.body;
  const isKey = await keyExists(email);

  if (isKey && isKey.email === email) {
    const newRandomKey = generateRandomKey();
    await key.update({ key: newRandomKey }, { where: { email } });

    return res.json({ key: newRandomKey, email });
  }

  invalidEmailError(next);
};
