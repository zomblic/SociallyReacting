import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
//import userRoutes from './api/userRoutes.js';
//import thoughtRoutes from './api/thoughtRoutes.js';

router.use('/api', apiRoutes);

//router.use('/api/users', userRoutes);
//router.use('/api/thoughts', thoughtRoutes);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
