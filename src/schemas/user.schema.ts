

import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true},
  address: { type: String},
  status: { type: String}
});
