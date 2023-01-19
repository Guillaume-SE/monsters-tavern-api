const express = require('express');
const morgan = require('morgan');
const { connectDb } = require('./src/services/server');
const monsterRoutes = require('./src/routes/monster');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'))
    .use(express.json())
    .use(monsterRoutes);

connectDb().catch(error => console.log(error));


app.listen(port, () =>
    console.log(`Lancer l\'app sur: http://localhost:${port}`)
);