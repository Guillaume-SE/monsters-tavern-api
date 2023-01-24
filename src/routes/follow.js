import express from 'express';
import authentication from '../middlewares/authentication.js';
import { follow } from '../controllers/follow.js';

const router = express.Router();

router.patch('/follow/:id', authentication, follow);

export default router;