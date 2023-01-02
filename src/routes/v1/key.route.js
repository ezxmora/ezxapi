
import { validEmail } from '../../middlewares/validation.js';
import { createKey, refreshKey } from '../../controllers/key.controller.js';
import { validate } from 'express-validation';
import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';
const router = Router({ caseSensitive: true });

router
  .post('/', [validate(validEmail)], createKey)
  .put('/', [validate(validEmail), auth], refreshKey);

export default router;
