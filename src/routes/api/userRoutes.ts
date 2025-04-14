import { Router } from 'express';
const router = Router();
import { 
  getUsers,
  getSingleUser,   
  createUser, 
  updateUser,
  deleteUser,  
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
router.route('/:userId').delete(deleteUser);
router.route('/:userId').put(updateUser);

// /api/users/:userId/friends
router.route('/:userId/friends').get(getFriends);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

export default router;
