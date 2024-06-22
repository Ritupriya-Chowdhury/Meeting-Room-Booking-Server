import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MeetingRoomZodSchema } from './room.validation';
import { MeetingRoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// add room route
router.post(
  '',
  auth(USER_ROLE.admin),
  validateRequest(MeetingRoomZodSchema.createMeetingRoomZodSchema),
  MeetingRoomControllers.createMeetingRoom
);


// Get single route
router.get('/:id', MeetingRoomControllers.getSingleMeetingRoom);

// all get MeetingRooms route
router.get('', MeetingRoomControllers.getAllMeetingRooms);

// update MeetingRooms route
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(MeetingRoomZodSchema.updateMeetingRoomZodSchema),
  MeetingRoomControllers.updateMeetingRoom
);

//delete meeting room route
router.delete('/:id',auth(USER_ROLE.admin), MeetingRoomControllers.deleteMeetingRoom);

export const MeetingRoomRoutes = router;
