import database from "../lib/database.js";

export const getRepository = (repository) => database.getRepository(repository);

export const randomString = () => (Math.random() + 1).toString(36).substring(7);
