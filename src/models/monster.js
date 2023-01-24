import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const monsterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 35,
        validate(name) {
            if (!validator.isLength(name, [{ min: 1, max: 35 }])) {
                throw new Error("Le nom doit être compris entre 1 et 35 caractères.");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Email non valide.");
            }
        }
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
            "Enchanteur",
            "Guérisseur",
            "Archer",
            "Assassin"
        ]
    },
    race: {
        type: String,
        enum: [
            "Démon",
            "Loup-Garou",
            "Vampire",
            "Orc",
            "Gobelin",
            "Elfe",
            "Dragon"
        ]
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    rank: {
        type: String,
        enum: [
            "MEMBRE",
            "CAPITAINE",
            "COMMANDANT"
        ],
        default: "MEMBRE"
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }],
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

// retire des clés du retour JSON
monsterSchema.methods.toJSON = function () {
    const monster = this.toObject();

    delete monster.password;
    delete monster.authTokens;
    delete monster.__v;

    return monster;
};

// JWT
monsterSchema.methods.generateAuthTokenAndSaveMonster = async function () {
    const privateKey = process.env.PRIVATE_KEY;
    const authToken = jwt.sign(
        {
            _id: this._id.toString()
        },
        privateKey,
        {
            expiresIn: '24h'
        });
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;

}

monsterSchema.statics.findMonster = async (email, password) => {
    const monster = await Monster.findOne({ email });
    if (!monster) {
        throw new Error("Email ou mot de passe invalide.");
    }
    const isPasswordValid = await bcrypt.compare(password, monster.password);
    if (!isPasswordValid) {
        throw new Error("Email ou mot de passe invalide.");
    }

    return monster;
};

// hash password
monsterSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});

const Monster = model('Monster', monsterSchema);

export default Monster;