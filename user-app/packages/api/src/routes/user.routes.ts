import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

export default router;
