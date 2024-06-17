import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { MeetingRoomRoutes } from '../modules/room/room.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/rooms',
    route: MeetingRoomRoutes,
  }
]
 

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;