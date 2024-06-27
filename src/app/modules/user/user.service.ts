import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';



const createUserIntoDB = async (payload: TUser) => {
  

  // If password is not given, use default password
  if(!payload.password)
  payload.password= (config.default_password as string);

  
  const session=await mongoose.startSession();
  

  try{
    session.startTransaction();
    

    const [newUser] = await User.create([payload],{session});

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
  
    await session.commitTransaction();
    await session.endSession();

    return newUser;

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }

//  console.log(newUser)
 
};


const getAllUsersFromDB = async (query: Record<string, unknown>) => {


  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await User.find();

    if (!result.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found')
    }

    await session.commitTransaction();
    await session.endSession();

    return result;

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }
}



export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB
};