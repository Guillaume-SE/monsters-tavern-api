import jwt from 'jsonwebtoken'


export const authentication = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        const message = "Vous n'êtes pas authentifié.";
        return res
            .status(401)
            .json(message);
    }

    const jwtKey = process.env.JWT_KEY;
    jwt.verify(token, jwtKey, (error, monster) => {
        if (error) {
            const message = "Le jeton d'authentification est invalide."
            return res
                .status(401)
                .json(message);
        }
        req.monster = monster;
        next();
    });
}

export default authentication;