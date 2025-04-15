import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  addReaction,
  removeReaction,
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:usertId
router.route('/:userId').get(getUserById).delete(deleteUser);

// /api/users/:userId/reactions
router.route('/:userId/reactions').post(addReaction);

// /api/users/:userId/reactions/:reactionId
router.route('/:userId/reaction/:reactionId').delete(removeReaction);

export { router as userRouter} ;
