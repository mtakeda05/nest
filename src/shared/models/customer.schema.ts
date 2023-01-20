import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Number, required: true, min: 1, max: 4 },
  emails: { type: Number }
});
