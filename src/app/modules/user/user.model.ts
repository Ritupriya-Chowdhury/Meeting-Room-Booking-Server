import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema(
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
      unique: true
    },
   role: {
      type: String,
      enum: ['admin', 'user'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  
  const user = this; 
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
