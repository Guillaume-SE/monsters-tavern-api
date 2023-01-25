import Monster from "../models/monster.js";

export const follow = async (req, res, next) => {
    try {
        const connectedMonster = req.monster;
        const monsterToFollow = await Monster.findById(req.params.id);

        if (connectedMonster._id.equals(monsterToFollow._id)) {
            const message = "Vous ne pouvez pas suivre votre propre compte.";
            return res.status(403).json({ message });
        }
        if (monsterToFollow.followers.includes(connectedMonster._id)) {
            const message = "Vous suivez déjà cette personne";
            return res.status(403).json({ message });
        }
        if (!monsterToFollow.followers.includes(connectedMonster._id)) {
            monsterToFollow.followers.push(connectedMonster._id);
            await monsterToFollow.save();

            connectedMonster.following.push(monsterToFollow._id);
            await connectedMonster.save();

            const message = `Vous suivez désormais ${monsterToFollow.name}.`;
            res.status(200).json({ message });
        }

    } catch (error) {
        const message = "L\'ajout de ce monstre à vos abonnements à échoué. Veuillez réessayer.";
        res.status(500).json({ message });
    }
};

export const unfollow = async (req, res, next) => {
    try {
        const connectedMonster = req.monster;
        const monsterToUnfollow = await Monster.findById(req.params.id);

        if (connectedMonster.following.includes(monsterToUnfollow._id)) {
            connectedMonster.following.pull(monsterToUnfollow._id);
            await connectedMonster.save();

            monsterToUnfollow.followers.pull(connectedMonster._id);
            await monsterToUnfollow.save();

            const message = `Vous ne suivez plus ${monsterToUnfollow.name}.`;
            res.status(200).json({ message });
        }

    } catch (error) {
        const message = "La supression du monstre de votre liste à échoué. Veuillez réessayer.";
        res.status(500).json({ message });
    }
};