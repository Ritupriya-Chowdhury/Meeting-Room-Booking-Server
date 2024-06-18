import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    roomNo: {
      type: Number,
      required: [true, 'RoomNo is required'],
      unique: true,
    },
    floorNo: {
      type: Number,
      required: [true, 'FloorNo is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
    },
    pricePerSlot: {
      type: Number,
      required: [true, 'Name is required'],
    },
    amenities: {
      type: [String],
      required: [true, 'PricePerSlot is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  
);


// Query Middleware
roomSchema.pre('find', function (next) {
   // console.log(this);
  this.find({isDeleted: {$ne: true } });
  next();
});

roomSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

roomSchema.pre('aggregate', function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
 // console.log(this);
   next();
});



// creating a custom static method
roomSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await MeetingRoom.findOne({id});

  return existingUser;
};



export const MeetingRoom = model<TRoom>
(
  'MeetingRoom', 
   roomSchema
);
