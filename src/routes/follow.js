import express from 'express';
import authentication from '../middlewares/authentication.js';
import {
    follow,
    getMonsterFollowers,
    getMonsterFollowing,
    unfollow
} from '../controllers/follow.js';

const router = express.Router();

router.post('/follow/:id', authentication, follow);

router.get('/followers/:id', authentication, getMonsterFollowers);

router.get('/following/:id', authentication, getMonsterFollowing);

router.delete('/unfollow/:id', authentication, unfollow);


export default router;