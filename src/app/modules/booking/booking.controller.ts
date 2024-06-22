import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import catchAsync from "../../utils/catchAsync";


//create booking
const createBooking = catchAsync(async (req, res) => {
  //console.log(req.body)
    const result = await BookingServices.createBookingIntoDB(req.body);
    //console.log(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking created successfully',
      data: result,
    });
 
});


// Get All Booking
const  getAllBookings = catchAsync(async (req, res,next) => {
 
    const result = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
 
});
// Get All MyBooking
const  getMyBooking = catchAsync(async (req, res,next) => {
  

  //console.log(Email);
 
    const result = await BookingServices.getMyBookingsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
 
});


// Update Booking
const  updateBooking = catchAsync(async (req, res) => {
 
  const { id } = req.params;
  const result = await BookingServices.updateBookingIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is update successfully',
    data: result,
  });

});


// Delete Booking
const deleteBooking = catchAsync(async (req, res,next) => {
  const {id}  = req.params;

  // console.log(id);

  const result = await BookingServices.deleteBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is deleted successfully',
    data: result,
  });
});



export const BookingControllers = {
    createBooking,
    getMyBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
  };