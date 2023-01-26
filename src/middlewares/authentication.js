import jwt from 'jsonwebtoken'
import Monster from '../models/monster.js';


const authentication = async (req, res, next) => {
    try {
        const privateKey = process.env.PRIVATE_KEY;
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, privateKey);
        const monster = await Monster.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });

        if (!monster) {
            throw new Error("Le monstre ne possède pas de jeton d\'authentification");
        }

        req.authToken = authToken;
        req.monster = monster;
        next();
    } catch (error) {
        const message = "Vous devez vous authentifier.";
        res.status(401).json({ message });
    }
};

export default authentication;