import express from 'express';
import Monster from '../models/monster.js';
import authentication from '../middlewares/authentication.js';

const router = new express.Router();

router.get('/monsters/:id', async (req, res, next) => {
    const monsterId = req.params.id;
    
    try {
        const monster = await Monster.findById(monsterId );
        if(!monster) {
            const message = "Le monstre demandé n\'éxiste pas.";
            return res.status(404).json({ message });
        }

        const message = "Un monstre a été trouvé.";
        res.json({ message, monster });
    } catch (error) {
        const message = "Le monstre n\'a pu être récupéré. Veuillez réessayer.";
        res.status(500).json({ message, error });
    }
});

router.patch('/monsters/:id', async (req, res, next) => {
    const updatedInfo = Object.keys(req.body);
    const monsterId = req.params.id;

    try {
        const monster = await Monster.findById(monsterId);
        updatedInfo.forEach(update => monster[update] = req.body[update]); // récupère la clé et met à jour la valeur
        await monster.save();

        if(!monster) {
            const message = "Le monstre n\'existe pas.";
            return res.status(404).json({ message });
        }
        
        const message = `Les données de ${monster.name} ont bien été mise à jour.`;
        res.json({ message, monster });
    } catch (error) {
        const message = "Les données n\'ont pu être mises à jour.";
        res.status(500).json({ message, error });
    }
});

export default router;