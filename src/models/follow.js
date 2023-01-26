import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

const followSchema = new Schema({
    monster: {
        type: ObjectId,
        required: true
    },
    monsterFollowed: {
        type: ObjectId,
        required: true
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: false
        }
    }
);

followSchema.methods.toJSON = function () {
    const follow = this.toObject();

    delete follow.__v;

    return follow;
};


const Follow = model('Follow', followSchema);

export default Follow;