import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
import { AuthZodSchema } from './auth.validation';
import { AuthController } from './auth.controller';


const router = express.Router();

router.post(
    '/signup',
     validateRequest(UserValidation.userValidationSchema), 
    UserControllers.createUser
);
router.post(
    '/login',
     validateRequest(AuthZodSchema.loginZodSchema), 
    AuthController.loginUser
);



export const AuthRoutes=router;