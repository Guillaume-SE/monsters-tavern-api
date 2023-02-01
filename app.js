import express from 'express';
import { connectDb } from './src/services/server.js';
import cors from 'cors';

import monsterRoutes from './src/routes/monster.js';
import authRoutes from './src/routes/auth.js';
import followRoutes from './src/routes/follow.js';

const app = express();
const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(cors())
    .use(monsterRoutes)
    .use(authRoutes)
    .use(followRoutes);

connectDb().catch(error => console.log(error));

app.use(({ res }) => {
    const message = "Cette URL n'existe pas.";
    res.status(404).json({ message });
});


app.listen(port, () =>
    console.log(`Lancer l\'app sur: http://localhost:${port}`)
);