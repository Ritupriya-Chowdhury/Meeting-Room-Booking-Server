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
        message:'User is logged in successfully!',
        token: result?.accessToken,
        data: {
        _id: result.user._id,
        name: result.user.name,
        email:result.user.email,
        phone: result.user.phone,
        role: result.user.role,
        address: result.user.address,
        
        }

    });
});


export const AuthController={
    loginUser
}