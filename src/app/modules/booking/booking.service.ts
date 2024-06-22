import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { MeetingRoom } from '../room/room.model';
import { Slot } from '../slot/slot.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const createBookingIntoDB = async (payload: TBooking): Promise<TBooking[]> => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const room = await MeetingRoom.findById(payload.room);
    // const user=await User.findById(payload.user);
    // console.log(user)
    const slotsCount = payload.slots.length;
    if (!room) {
      throw new Error('Room not found');
    }
  
   // console.log(payload.user);
    // Calculate total amount
    const totalAmount = slotsCount * room.pricePerSlot;
  
    const booking = new Booking({
      ...payload,
      totalAmount,
    });
  
    await booking.save();
  
    await Slot.updateMany(
      { _id: { $in: payload.slots } },
      { $set: { isBooked: true } }
    );

    if (!Booking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Meeting room');
    }

    await session.commitTransaction();
    await session.endSession();

    await booking.populate('slots room user')

  return booking.toObject();

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }
 
};

// Get all booking
const getAllBookingsFromDB = async () => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await Booking.find().populate('slots room user');

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
// Get all booking
const getMyBookingsFromDB = async () => {

  const session=await mongoose.startSession();
 
  try{
    session.startTransaction();
    
 
    
    const result = await Booking.find().populate('slots room user');

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

//update Booking
const updateBookingIntoDB = async ( id: string, payload: Partial<TBooking>) => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await Booking.findOneAndUpdate(
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


// Delete Booking
const deleteBookingFromDB = async (id: string) => {
  // console.log(id);
  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await Booking.findOneAndUpdate(
      {_id:id},
      {isDeleted:true},
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



export const BookingServices = {
  createBookingIntoDB,
   getAllBookingsFromDB,
   getMyBookingsFromDB,
  updateBookingIntoDB,
 deleteBookingFromDB
};
