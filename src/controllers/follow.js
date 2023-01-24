import Monster from "../models/monster.js";

export const follow = async (req, res, next) => {
    try {
        const connectedMonster = req.monster;
        console.log("connectedMonster", connectedMonster);
        const monsterToFollow = await Monster.findById(req.params.id);
        console.log("monsterToFollow", monsterToFollow);

        if (!monsterToFollow.followers.includes(connectedMonster._id)) {
            monsterToFollow.followers.push(connectedMonster._id);
            await monsterToFollow.save();

            connectedMonster.following.push(monsterToFollow._id);
            await connectedMonster.save();
        }
        const message = `Vous suivez désormais ${monsterToFollow.name}.`;
        res.status(200).json({ message });

    } catch (error) {
        const message = "L\'ajout de ce monstre à vos abonnements à échoué. Veuillez réessayer.";
        res.status(500).json({ message });
    }
};