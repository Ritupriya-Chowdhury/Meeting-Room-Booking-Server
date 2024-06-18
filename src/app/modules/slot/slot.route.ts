import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createSlotSchema } from './slot.validation';
import { SlotControllers } from './slot.controller';


const router = express.Router();


// create slot route
router.post(
  '',
  validateRequest(createSlotSchema),
  SlotControllers.createSlot
);


// all get slot route
router.get('/availability', SlotControllers.getAllSlots);


export const SlotRoutes = router