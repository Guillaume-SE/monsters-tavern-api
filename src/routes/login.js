import express from 'express';
import Monster from '../models/monster.js';

const router = express.Router();

router.post('/monsters/login', async (req, res) => {
    try {
        const monster = await Monster.findMonster(req.body.email, req.body.password);
        const authToken = await monster.generateAuthTokenAndSaveMonster();
        const message = "Le monstre a bien été connecté.";
        res.json({ message, monster }); //authToken
    } catch (error) {
        const message = "Le monstre n\'a pu être connecté. Veuillez réessayer.";
        res.status(400).json({ message });
    }
});

export default router;