import database from "../lib/database.js"

export const getRepository = (repository) => database.getRepository(repository);
