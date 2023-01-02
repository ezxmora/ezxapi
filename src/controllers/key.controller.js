import httpstatus from 'http-status';
import { randomBytes } from 'crypto';
import { getRepository } from '../lib/util.js';

const generateRandomKey = () => randomBytes(32).toString('hex');
const keys = getRepository('Key');

const keyExists = (email) => keys.findOneBy({ email });

const invalidEmailError = (next) => {
  const err = new Error('That email address isn\'t valid');
  err.statusCode = httpstatus.BAD_REQUEST;
  next(err);
}

export const createKey = async (req, res, next) => {
  const { email } = req.body;
  const key = await keyExists(email);

  if (!key) {
    const newKey = {
      key: generateRandomKey(),
      email
    }

    const savedKey = await keys.save(newKey);
    delete savedKey.id;

    return res.json(savedKey);
  }

  invalidEmailError(next);
};

export const refreshKey = async (req, res, next) => {
  const { email } = req.body;
  const key = await keyExists(email);

  if (key && key.email === email) {
    key.key = generateRandomKey();
    const updatedKey = await keys.save(key);
    delete updatedKey.id;

    return res.json(updatedKey);
  }

  invalidEmailError(next);
}
