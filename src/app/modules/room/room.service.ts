import mongoose from "mongoose";
import { TRoom } from "./room.interface";
import { MeetingRoom } from "./room.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";


//create meeting room
const createMeetingRoomIntoDB = async (payload: TRoom) => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const [result] = await MeetingRoom.create([payload],{session});

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Meeting room');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }

};


//Get single room
const getSingleMeetingRoomFromDB = async (id: string) => {
 

 const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await MeetingRoom.findById(id);

    if (!result) {
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
  
 
};

// Get all meeting room
const getAllMeetingRoomsFromDB = async () => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await MeetingRoom.find();

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
  
 
};


//update meeting room
const updateMeetingRoomIntoDB = async ( id: string, payload: Partial<TRoom>) => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await MeetingRoom.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    if (!result) {
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
  
};


// Delete room
const deleteMeetingRoomFromDB = async (id: string) => {
  // console.log(id);
  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await MeetingRoom.findOneAndUpdate(
      {_id:id},
      {isDeleted:true},
      {
        new: true,
      }
      );

    if (!result) {
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
 
};




export const MeetingRoomServices = {
    createMeetingRoomIntoDB,
    getSingleMeetingRoomFromDB,
    getAllMeetingRoomsFromDB,
    updateMeetingRoomIntoDB,
    deleteMeetingRoomFromDB 
};