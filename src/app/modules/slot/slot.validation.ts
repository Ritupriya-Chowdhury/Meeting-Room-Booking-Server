import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createSlotSchema = z.object({
  body: z.object({
    room: objectId,
    date: z.string(),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time"),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time"),
  }),
});