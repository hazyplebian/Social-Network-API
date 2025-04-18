import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, deleteUser, addFriend, removeFriend, updateUser, } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/user/:usertId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
// /api/users/:userId/reactions/:reactionId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
export { router as userRouter };
