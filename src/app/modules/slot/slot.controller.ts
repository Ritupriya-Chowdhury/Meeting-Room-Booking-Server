import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SlotServices } from "./slot.service";
import catchAsync from "../../utils/catchAsync";



const createSlot = catchAsync(async (req, res, next) => {

    const result = await SlotServices.createSlotIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slots created successfully',
      data: result,
    });
 
});

// Get All Slot
const getAllSlots = catchAsync(async (req, res, next) => {
  // console.log(req.query)
 
    const result = await SlotServices.getAllSlotsFromDB(req.query );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available slots retrieved successfully',
      data: result,
    });
 
});


export const SlotControllers = {
    createSlot,
    getAllSlots
    
  };