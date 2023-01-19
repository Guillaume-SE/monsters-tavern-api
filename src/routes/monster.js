const express = require('express');
const Monster = require('../models/monster');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/monsters', async (req, res, next) => {
    const monster = new Monster(req.body);

    try {
        const authToken = await monster.generateAuthTokenAndSaveMonster();
        const message = "Un monstre nous a rejoins avec succès.";
        res.status(201).json({ message, monster });
    } catch (error) {
        const message = "Un monstre a échoué à nous rejondre.";
        res.status(400).json({ message, error });
    }
});

router.get('/monsters', async (req, res, next) => {

    try {
        const monsters = await Monster.find();
        const message = "La liste des nos membres a bien été récupérée.";
        res.json({ message, monsters });
    } catch (error) {
        const message = "La liste de nos membres n'a pu être récupérée.";
        res.status(500).json({ message, error });
    }
});

module.exports = router;