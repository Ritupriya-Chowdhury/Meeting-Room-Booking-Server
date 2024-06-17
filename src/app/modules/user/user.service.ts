import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';



const createUserIntoDB = async (payload: TUser) => {
  //Create a user object
  //const userData: Partial<TUser> = {};

  // If password is not given, use default password
  if(payload.password==="")
  payload.password= (config.default_password as string);

  // Set user role
  payload.role = 'user';
  // console.log(payload)
  const newUser = await User.create(payload);
//  console.log(newUser)
  return newUser;
};


export const UserServices = {
  createUserIntoDB,
};