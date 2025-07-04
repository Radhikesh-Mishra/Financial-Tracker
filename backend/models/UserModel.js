import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    budget: {
        type: {
            food: {
                limit: { type: Number, default: 8000 },
                spent: { type: Number, default: 0 }
            },
            rent: {
                limit: { type: Number, default: 15000 },
                spent: { type: Number, default: 0 }
            },
            entertainment: {
                limit: { type: Number, default: 3000 },
                spent: { type: Number, default: 0 }
            },
            travel: {
                limit: { type: Number, default: 4000 },
                spent: { type: Number, default: 0 }
            },
            utilities: {
                limit: { type: Number, default: 6000 },
                spent: { type: Number, default: 0 }
            },
            shopping: {
                limit: { type: Number, default: 3000 },
                spent: { type: Number, default: 0 }
            },
            health: {
                limit: { type: Number, default: 3000 },
                spent: { type: Number, default: 0 }
            },
            extras: {
                limit: { type: Number, default: 3000 },
                spent: { type: Number, default: 0 }
            }
        },
        default: () => ({})
    }

}, { timestamps: true });

const User = model('User', userSchema);
export default User;
