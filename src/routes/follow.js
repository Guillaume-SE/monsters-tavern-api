import express from 'express';
import authentication from '../middlewares/authentication.js';
import {
    follow,
    unfollow
} from '../controllers/follow.js';

const router = express.Router();

router.patch('/follow/:id', authentication, follow);

router.patch('/unfollow/:id', authentication, unfollow);

export default router;