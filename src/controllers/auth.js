import Monster from '../models/monster.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {

    const newMonster = new Monster(req.body);

    try {
        await newMonster.save();

        const jwtKey = process.env.JWT_KEY;
        const jwtValidity = process.env.JWT_VALIDITY;
        const token = jwt.sign({ id: newMonster._id }, jwtKey, {expiresIn: jwtValidity});
        const { password, ...othersData } = newMonster._doc;

        res
            .status(201)
            .json({token});

    } catch (error) {

        if(error.keyValue.hasOwnProperty('name')) {
            const message = "Ce nom est déjà utilisé";
            const tag = "name";
            return res
                    .status(400)
                    .json({ message, tag, error });
        }
        if(error.keyValue.hasOwnProperty('email')) {
            const message = "Cet email est déjà utilisé";
            const tag = "email";
            return res
                    .status(400)
                    .json({ message, tag, error });
        } else {
            const message = "Un monstre a échoué à nous rejoindre.";
            res
                .status(400)
                .json({ message, error });
        }
    }
};

export const login = async (req, res) => {
    try {
        const monster = await Monster.findOne({ email: req.body.email })
            .select('-__v');
        const isCorrect = await bcrypt.compare(req.body.password, monster.password);

        if (!monster || !isCorrect) {
            const message = "Adresse email ou mot de passe incorrect.";

            return res
                .status(400)
                .json(message);
        }

        const jwtKey = process.env.JWT_KEY;
        const jwtValidity = process.env.JWT_VALIDITY;
        const token = jwt.sign({ id: monster._id }, jwtKey, {expiresIn: jwtValidity});
        const { password, ...othersData } = monster._doc;

        res
            // .cookie("access_token", token, { httpOnly: true })
            .status(201)
            .json({token});
    } catch (error) {
        const message = "Le monstre n\'a pu se connecter. Veuillez réessayer.";
        res
            .status(400)
            .json({ message, error });
    }
};