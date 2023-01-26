import Monster from '../models/monster.js';

export const signup = async (req, res, next) => {
    const monster = new Monster(req.body);

    try {
        const authToken = await monster.generateAuthTokenAndSaveMonster();
        const message = "Un monstre nous a rejoins avec succès.";
        res.status(201).json({ message, monster }); // + authToken
    } catch (error) {
        const message = "Un monstre a échoué à nous rejoindre.";
        res.status(400).json({ message, error });
    }
};

export const login = async (req, res) => {
    try {
        const monster = await Monster.findMonster(req.body.email, req.body.password);
        const authToken = await monster.generateAuthTokenAndSaveMonster();
        const message = "Le monstre a bien été connecté.";
        res.json({ message, monster });
    } catch (error) {
        const message = "Le monstre n\'a pu être connecté. Veuillez réessayer.";
        res.status(400).json({ message, error });
    }
};

export const logout = async (req, res) => {
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
};

// logout on every platforms
export const logoutEverywhere = async (req, res) => {
    try {
        req.monster.authTokens = [];
        await req.monster.save();
        const message = "Déconnexion de tous vos appareils réussie.";
        res.json({ message });
    } catch (error) {
        const message = "Déconnexion impossible. Veuillez réessayer.";
        res.status(500).json({ message });
    }
};