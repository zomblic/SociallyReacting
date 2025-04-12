import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index.js';

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
