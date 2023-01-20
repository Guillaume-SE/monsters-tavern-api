import "dotenv/config.js";
import express from 'express';
import { connectDb } from './src/services/server.js';
import monsterRoutes from './src/routes/monster.js';
import loginRoutes from './src/routes/login.js';
import logoutRoutes from './src/routes/logout.js';

const app = express();
const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(monsterRoutes)
    .use(loginRoutes)
    .use(logoutRoutes);

connectDb().catch(error => console.log(error));

app.use(({res}) => {
    const message = "Cette URL n'existe pas.";
    res.status(404).json({ message });
});


app.listen(port, () =>
    console.log(`Lancer l\'app sur: http://localhost:${port}`)
);