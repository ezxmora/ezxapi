import { Joi } from "express-validation";

export const validEmail = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
  })
};
