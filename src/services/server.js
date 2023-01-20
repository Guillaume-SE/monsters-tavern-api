import "dotenv/config.js";
import { connect } from 'mongoose';

export async function connectDb() {
    await connect(process.env.MONGO_URL);
    console.log("Connexion réussie !");
};