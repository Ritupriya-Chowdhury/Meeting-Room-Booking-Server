import { TRoom } from "./room.interface";
import { MeetingRoom } from "./room.model";


//create meeting room
const createMeetingRoomIntoDB = async (payload: TRoom) => {
  const result = await MeetingRoom.create(payload);
  return result;
};


//Get single room
const getSingleMeetingRoomFromDB = async (id: string) => {
  const result = await MeetingRoom.findById(id);
  return result;
};

// Get all meeting room
const getAllMeetingRoomsFromDB = async () => {
  const result = await MeetingRoom.find();
  return result;
};


//update meeting room
const updateMeetingRoomIntoDB = async (
  id: string,
  payload: Partial<TRoom>,
) => {
  const result = await MeetingRoom.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};


// Get all meeting room
const deleteMeetingRoomFromDB = async (id: string) => {
  // console.log(id);
  

  const result = await MeetingRoom.findOneAndUpdate(
    {_id:id},
    {isDeleted:true},
    );
  
  // console.log(result);
  // console.log(id);
  return result;
};




export const MeetingRoomServices = {
    createMeetingRoomIntoDB,
    getSingleMeetingRoomFromDB,
    getAllMeetingRoomsFromDB,
    updateMeetingRoomIntoDB,
    deleteMeetingRoomFromDB 
};