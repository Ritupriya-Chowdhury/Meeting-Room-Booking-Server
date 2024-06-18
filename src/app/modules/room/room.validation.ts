import { z } from 'zod';

 const createMeetingRoomZodSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number().min(1, 'Room number must be a positive integer'),
    floorNo: z.number().min(1, 'Floor number must be a positive integer'),
    capacity: z.number().min(1, 'Capacity must be a positive integer'),
    pricePerSlot: z
      .number()
      .min(0, 'Price per slot must be a non-negative number'),
    amenities: z.array(z.string().min(1, 'Amenity cannot be empty')),
    isDeleted: z.boolean().optional(),
  }),
});


 const updateMeetingRoomZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().min(1, 'Room number must be a positive integer').optional(),
    floorNo: z.number().min(1, 'Floor number must be a positive integer').optional(),
    capacity: z.number().min(1, 'Capacity must be a positive integer').optional(),
    pricePerSlot: z
      .number()
      .min(0, 'Price per slot must be a non-negative number')
      .optional(),
    amenities: z.array(z.string().min(1, 'Amenity cannot be empty'))
    .optional(),
    isDeleted: z.boolean().optional(),
  }),
});


export const MeetingRoomZodSchema = {
  createMeetingRoomZodSchema,
  updateMeetingRoomZodSchema

}
