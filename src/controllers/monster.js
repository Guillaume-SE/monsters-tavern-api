import Monster from "../models/monster.js";

export const getAllMonsters = async (req, res, next) => {
    try {
        const monsters = await Monster.find();
        const message = "La liste des membres a bien été récupérée.";
        res.json({ message, monsters });
    } catch (error) {
        const message = "La liste des membres n\'a pu être récupérée.";
        res.status(500).json({ message, error });
    }
};

export const updateOwnAccount = async (req, res, next) => {
    const updatedInfo = Object.keys(req.body); // données mise à jour par l'user => updatedInfo

    try {
        updatedInfo.forEach(update => req.monster[update] = req.body[update]); // on boucle sur chaque données puis on met à jour

        await req.monster.save();
        const monsterUpdated = req.monster;

        const message = `Les données de ${monsterUpdated.name} ont bien été mise à jour.`;
        res.json({ message, monsterUpdated });
    } catch (error) {
        const message = "Les données n\'ont pu être mise à jour. Veuillez réessayer.";
        res.status(500).json({ message, error });
    }
};

export const deleteOwnAccount = async (req, res, next) => {
    try {
        await req.monster.remove();
        const monsterDeleted = req.monster;

        const message = `${monsterDeleted.name} n\'est plus un de nos membres.`;
        res.json({ message, monsterDeleted });
    } catch (error) {
        const message = "Le monstre n\'a pu être supprimé. Veuillez réessayer.";
        res.status(500).json({ message, error });
    }
};