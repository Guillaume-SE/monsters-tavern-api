import express from 'express';
import authentication from '../middlewares/authentication.js';

import {
    signup,
    login,
    logout,
    logoutEverywhere
} from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', authentication, logout);

router.post('/logout/all', authentication, logoutEverywhere);

export default router;