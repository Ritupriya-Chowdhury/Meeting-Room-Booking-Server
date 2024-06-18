import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { MeetingRoomServices } from "./room.service";



//create room
const createMeetingRoom = catchAsync(async (req, res, next) => {

    const result = await MeetingRoomServices.createMeetingRoomIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Room added successfully',
      data: result,
    });
 
});


//Get a room
const getSingleMeetingRoom = catchAsync(async (req, res, next) => {
 
  const { id } = req.params;

  const result = await MeetingRoomServices.getSingleMeetingRoomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  });

});



// Get All Meeting room
const getAllMeetingRooms = catchAsync(async (req, res, next) => {
 
    const result = await MeetingRoomServices.getAllMeetingRoomsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room retrieved successfully',
      data: result,
    });
 
});


// Update meeting room
const updateMeetingRoom = catchAsync(async (req, res, next) => {
 
    const { id } = req.params;
    const result = await MeetingRoomServices.updateMeetingRoomIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is update successfully',
      data: result,
    });
 
});


// Delete meeting room
const deleteMeetingRoom = catchAsync(async (req, res) => {
  const {id}  = req.params;

  // console.log(id);

  const result = await MeetingRoomServices.deleteMeetingRoomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is deleted successfully',
    data: result,
  });
});

export const MeetingRoomControllers = {
  createMeetingRoom,
  getSingleMeetingRoom,
  getAllMeetingRooms,
  updateMeetingRoom,
  deleteMeetingRoom
};