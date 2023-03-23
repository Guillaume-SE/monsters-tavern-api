import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail.js';

const monsterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 35
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: [
            "Guerrier",
            "Alchimiste",
            "Sorcier",
            "Espion",
            "Soigneur",
            "Archer",
            "Nécromancien",
            "Assassin"
        ]
    },
    race: {
        type: String,
        enum: [
            "Démon",
            "Lycanthrope",
            "Vampire",
            "Orc",
            "Gobelin",
            "Elfe",
            "Dragon",
            "Harpie",
            "Goule"
        ]
    },
    avatar: {
        type: String
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

monsterSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});

const Monster = model('Monster', monsterSchema);

export default Monster;