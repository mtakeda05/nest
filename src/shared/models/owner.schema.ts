import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
});
