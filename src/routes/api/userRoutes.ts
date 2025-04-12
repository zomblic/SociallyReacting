import { Router } from 'express';
const router = Router();
import { 
  getUsers,
  getSingleUser,   
  createUser,   
  addFriend,   
  removeFriend,   
  getFriends 
} from '../../controllers/userController.js';

// /api/users
router.route('/')
      .get(getUsers)
      .post(createUser);


// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/friends
router.route('/:userId/friends').get(getFriends);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

export default router;
