import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createSlotSchema } from './slot.validation';
import { SlotControllers } from './slot.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();


// create slot route
router.post(
  '',
  auth(USER_ROLE.admin),
  validateRequest(createSlotSchema),
  SlotControllers.createSlot
);


// all get slot route
router.get('/availability', SlotControllers.getAllSlots);


export const SlotRoutes = router