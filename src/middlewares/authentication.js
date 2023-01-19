require('dotenv').config();
const jwt = require('jsonwebtoken');
const Monster = require('../models/monster');

const authentication = async (req, res, next) => {
    try {
        const privateKey = process.env.PRIVATE_KEY;
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, privateKey);
        const monster = await Monster.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });

        if(!monster) {
            throw new Error();
        }

        req.authToken = authToken;
        req.monster = monster;
        next();
    } catch (error) {
        const message = "Vous devez vous authentifier.";
        res.status(401).json({ message });
    }
};

module.exports = authentication;