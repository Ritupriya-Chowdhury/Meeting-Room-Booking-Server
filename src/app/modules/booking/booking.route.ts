import express from 'express';
import validateRequest from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";
import { BookingZodSchema } from "./booking.validation";
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();
// Create Booking route
router.post('/bookings',
auth(USER_ROLE.user),
 validateRequest(BookingZodSchema.createBookingSchema),
    BookingControllers.createBooking
  );
  

  // all get Booking route
router.get('/bookings',auth(USER_ROLE.admin), BookingControllers.getAllBookings);

// get my-booking route
router.get('/my-bookings',auth(USER_ROLE.user), BookingControllers.getMyBooking);


// update booking
router.put(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  validateRequest(BookingZodSchema.updateBookingSchema),
  BookingControllers.updateBooking
);

//delete meeting room route
router.delete('/bookings/:id', auth(USER_ROLE.admin),BookingControllers.deleteBooking);

  export const BookingRoutes = router;