import { Types } from 'mongoose';
import { z } from 'zod';

// const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
//   message: 'Invalid MongoDB ObjectId',
// });

const createBookingSchema = z.object({
    body:z.object({
  
      date: z.string(),
      slots: z.array(z.string()),
      room: z.string(),
      user: z.string(),
    }),

  }
)
const updateBookingSchema = z.object({
    body:z.object({
  
      isConfirmed: z.string(),
    }),

  }
)


export const BookingZodSchema={
  createBookingSchema,
  updateBookingSchema

}
