require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const monsterSchema = new mongoose.Schema({
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
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friends'
    }],
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

// retire ces clés du retour JSON
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

// hash password
monsterSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});

const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;