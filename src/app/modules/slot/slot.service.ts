import mongoose from 'mongoose';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { MeetingRoom } from '../room/room.model';

const createSlotIntoDB = async (slotData: TSlot): Promise<TSlot[]> => {
  const duration = 60;
  const { room, date, startTime, endTime } = slotData;

  const startMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const endMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / duration;

  const slots: TSlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * duration;
    const slotEndMinutes = slotStartMinutes + duration;

    const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(
      2,
      '0'
    )}:${String(slotStartMinutes % 60).padStart(2, '0')}`;
    const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(
      2,
      '0'
    )}:${String(slotEndMinutes % 60).padStart(2, '0')}`;

    slots.push({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });
  }

  const meetingRoom = await MeetingRoom.findById(
    slotData.room,
  );

  const session=await mongoose.startSession();


  try {
    session.startTransaction();
    if (!meetingRoom ) {
      throw new Error('Room not found');
    }

    await Slot.insertMany(slots);

    if (!slots.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create slot');
    }
    await session.commitTransaction();
    await session.endSession();

    return slots;
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


 
  

// Get available slots
const getAllSlotsFromDB = async (query: Record<string, unknown>) => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const { date, roomId } = query;
  let filter = {};

  if (date) {
    filter = { ...filter, date };
  }
  if (roomId) {
    filter = { ...filter, room: roomId };
  } else {
    filter = { ...filter, isBooked: false };
  }

  const availableSlots = await Slot.find(filter).populate('room');

    if (!availableSlots.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found')
    }

    await session.commitTransaction();
    await session.endSession();

    return availableSlots;

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }
  
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
