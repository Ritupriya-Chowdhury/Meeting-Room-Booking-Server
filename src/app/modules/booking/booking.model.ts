import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
  ],
  room: {
    type: Schema.Types.ObjectId,
    ref: 'MeetingRoom',
    required: true,
  },
 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  
  totalAmount: {
    type: Number,
    required: true,
  },
  isConfirmed: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
  },
  isDeleted:{
    type: Boolean,
    default: false,
  }
});

export const Booking = model<TBooking>('Booking', bookingSchema);
