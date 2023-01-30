import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

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
        lowercase: true
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
            "Soigneur",
            "Archer",
            "Mage"
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
        type: String,
        required: true
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

monsterSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});

const Monster = model('Monster', monsterSchema);

export default Monster;