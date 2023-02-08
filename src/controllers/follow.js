import Follow from '../models/follow.js';


export const follow = async (req, res, next) => {
    const alreadyFollower = await Follow.findOne({
        "monster": req.monster._id,
        "monsterFollowed": req.params.id
    });
    if (alreadyFollower) {
        const message = "Vous suivez déjà ce monstre.";
        return res.status(403).json( message );
    }

    const follow = new Follow({ monster: req.monster._id, monsterFollowed: req.params.id });
    try {
        await follow.save();
        const message = "Vous suivez désormais ce monstre.";
        res.status(200).json( message, follow );
    } catch (error) {
        const message = "L\'ajout de ce monstre à votre cercle a échoué. Veuillez réessayer.";
        res.status(500).json( message, error );
    }
};

export const unfollow = async (req, res, next) => {
    try {
        const follow = await Follow.findOne({
            "monster": req.monster._id,
            "monsterFollowed": req.params.id
        });
        if (!follow) {
            const message = "Vous ne suivez pas ce monstre.";
            return res.status(403).json( message );
        }
        await follow.remove();
        const message = "Vous ne suivez plus ce monstre.";
        res.json( message, follow );
    } catch (error) {
        const message = "Le retrait du monstre de votre cercle à échouer.";
        res.status(500).json( message, error );
    }
};

export const getMonsterFollowers = async (req, res, next) => {
    try {
        const followers = await Follow.find({ "monsterFollowed": req.monster._id });
        res.json( followers );
    } catch (error) {
        const message = "La liste des monstres qui vous suive n\'a pu être récupérée.";
        res.status(500).json( message, error );
    }
};

export const getMonsterFollowing = async (req, res, next) => {
    try {
        const following = await Follow.find({ "monster": req.monster._id });
        res.json( following );
    } catch (error) {
        const message = "La liste des monstres que vous suivez n\'a pu être récupérée.";
        res.status(500).json( message, error );
    }
};