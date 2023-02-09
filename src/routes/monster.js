import express from 'express';
import authentication from '../middlewares/authentication.js';
import {
    getAllMonsters,
    getMonsterById,
    updateOwnAccount,
    deleteOwnAccount
} from '../controllers/monster.js';

const router = express.Router();

router.get('/monsters', getAllMonsters);

router.get('/monsters/:id', getMonsterById);

router.patch('/monsters/update/:id', authentication, updateOwnAccount);

router.delete('/monsters/delete/:id', authentication, deleteOwnAccount);


export default router;