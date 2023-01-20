import express from 'express';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.post('/monsters/logout', authentication, async (req, res) => {
    try {
        req.monster.authTokens = req.monster.authTokens.filter((authToken) => { // filtre les tokens de l'utilisateur
            return authToken.authToken !== req.authToken; // isole le token actuel
        });

        await req.monster.save();
        const message = "Déconnexion réussie.";
        res.json({ message });
    } catch (error) {
        const message = "Deconnexion impossible. Veuillez réessayer.";
        res.status(500).json({ message });
    }
});

// deconnecte l'user de toutes ses plateformes
router.post('/monsters/logout/all', authentication, async (req, res) => {
    try {
        req.monster.authTokens = [];
        await req.monster.save();
        const message = "Déconnexion de tous vos appareils réussie.";
        res.json({ message });
    } catch (error) {
        const message = "Déconnexion impossible. Veuillez réessayer.";
        res.status(500).json({ message });
    }
});

export default router;