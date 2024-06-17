import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
       required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
  },
  
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const User = model<TUser>('User', userSchema);
