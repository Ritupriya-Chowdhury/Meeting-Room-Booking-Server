import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createBookingSchema = z.object({
  body: z.object({
    room: objectId,
    slots: z.array(objectId),
    user: objectId,
    date: z.string(),
    isConfirmed: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
