import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});
