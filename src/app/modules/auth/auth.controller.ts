import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

const loginUser=catchAsync(async (req,res)=>{
    const result = await AuthServices.loginUser(req.body)
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        token: result?.accessToken,
        message:'User is logged in successfully!',
        data: result.user

    });
});


export const AuthController={
    loginUser
}