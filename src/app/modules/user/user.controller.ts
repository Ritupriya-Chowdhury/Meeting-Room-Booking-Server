import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";


const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

 //console.log(req.body);
  const result = await UserServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const payload = req.body;


 //console.log(req.body);
  const result = await UserServices.getAllUsersFromDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});



  export const UserControllers={
    createUser,
    getAllUser

  }