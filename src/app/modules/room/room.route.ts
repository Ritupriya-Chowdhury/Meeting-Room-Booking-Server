import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MeetingRoomZodSchema } from './room.validation';
import { MeetingRoomControllers } from './room.controller';

const router = express.Router();

router.post(
  '',
  validateRequest(MeetingRoomZodSchema.createMeetingRoomZodSchema),
  MeetingRoomControllers.createMeetingRoom
);

// Get single route
router.get('/:id', MeetingRoomControllers.getSingleMeetingRoom);

// all get MeetingRooms route
router.get('', MeetingRoomControllers.getAllMeetingRooms);

router.patch(
  '/:id',
  validateRequest(MeetingRoomZodSchema.updateMeetingRoomZodSchema),
  MeetingRoomControllers.updateMeetingRoom
);

//delete meeting room route
router.delete('/:id', MeetingRoomControllers.deleteMeetingRoom);

export const MeetingRoomRoutes = router;
