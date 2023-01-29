import * as mongodb from 'mongodb';

export interface Owner {
  id: string;
  name: string;
  email: string;
  customers: mongodb.ObjectId[];
}
