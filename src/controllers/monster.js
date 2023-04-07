import Monster from "../models/monster.js";
import Follow from '../models/follow.js';
import bcrypt from "bcrypt";

export const getAllMonsters = async (req, res, next) => {
    try {
        const monsters = await Monster.find()
            .select('-password -__v');

        res.json(monsters);
    } catch (error) {
        const message = "La liste des membres n\'a pu être récupérée.";
        res
            .status(500)
            .json({ message, error });
    }
};

export const getMonsterById = async (req, res, next) => {
    try {
        const monster = await Monster.findById(req.params.id)
            .select('-password -__v');

        if (!monster) {
            const message = "Aucun monstre ne correspond à cet identifiant.";
            return res
                .status(404)
                .json(message);
        }
        res.json(monster);
    } catch (error) {
        const message = "Le profil du monstre n\'a pu être récupéré.";
        res
            .status(500)
            .json({ message, error });
    }
};

export const getMonsterByName = async (req, res, next) => {
    try {
        const monster = await Monster.find(
            {
                name: {$regex: req.params.name, $options: 'i'}
            }
        ).select("-email -password -created_at -updated_at -__v");

        res.json(monster);
    } catch (error) {
        console.log(error);
        const message = "Aucun résultat n\'a pu être récupéré.";
        res
            .status(500)
            .json({ message, error });
    }
};

export const updateOwnAccount = async (req, res, next) => {

    if (req.params.id === req.monster.id) {
        try {
            const { password, ...othersDatas } = req.body;
            let hash;
            if (password) {
                const salt = 10;
                hash = await bcrypt.hash(password, salt);
            }

            const updatedMonster = await Monster.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        password: hash,
                        ...othersDatas
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            res.json(othersDatas);
        } catch (error) {

            if (error.keyValue.hasOwnProperty('name')) {
                const message = "Ce nom est déjà utilisé";
                const tag = "name";
                return res
                    .status(400)
                    .json({ message, tag, error });
            }
            if (error.keyValue.hasOwnProperty('email')) {

                const message = "Cet email est déjà utilisé";
                const tag = "email";
                return res
                    .status(400)
                    .json({ message, tag, error });
            } else {
                const message = "Les données n\'ont pu être mise à jour. Veuillez réessayer.";
                res
                    .status(500)
                    .json({ message, error });
            }
        }
    }
};

export const deleteOwnAccount = async (req, res, next) => {
    if (req.params.id === req.monster.id) {
        try {
            await Follow.deleteMany({ "monster": req.monster.id });
            await Follow.deleteMany({ "monsterFollowed": req.monster.id });
            await Monster.findByIdAndDelete(req.monster.id);

            const message = `Le monstre a bien été supprimé.`;
            res.json(message);
        } catch (error) {
            const message = "Le monstre n\'a pu être supprimé. Veuillez réessayer.";
            res
                .status(500)
                .json({ message, error });
        }
    }
};