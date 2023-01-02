import { Router } from 'express';

const router = Router({ caseSensitive: true });

import keyRoutes from './key.route.js';

router.get('/status', (_, res) => res.json({ status: 200, message: 'Up and running 🚂' }));
router.use('/key', keyRoutes);

export default router;
