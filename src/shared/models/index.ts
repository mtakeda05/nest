import { model } from 'mongoose';
import { OwnerSchema } from './owner.schema';
import { CustomerSchema } from './customer.schema';
import { UserSchema } from './user.schema';

export const Owner = model('Owner', OwnerSchema);
export const Customer = model('Customer', CustomerSchema);
export const User = model('User', UserSchema);
