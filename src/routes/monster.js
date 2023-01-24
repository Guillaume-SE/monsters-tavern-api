import express from 'express';
import authentication from '../middlewares/authentication.js';
import {
    getAllMonsters,
    updateOwnAccount,
    deleteOwnAccount
} from '../controllers/monster.js';

const router = express.Router();

router.get('/monsters', getAllMonsters);

router.patch('/monsters/me', authentication, updateOwnAccount);

router.delete('/monsters/me', authentication, deleteOwnAccount);


export default router;