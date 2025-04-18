import { ObjectId } from 'mongodb';
import { User, Thought } from '../models/index.js';
export const totalUsers = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
};
export const rating = async (userId) => User.aggregate([
    { $match: { _id: new ObjectId(userId) } },
    {
        $unwind: '$reactions',
    },
    {
        $group: {
            _id: new ObjectId(userId),
            overallRating: { $avg: '$reactions.score' },
        },
    },
]);
/**
 *
 * @returns
*/
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        const userObj = {
            users,
            headCount: await totalUsers(),
        };
        res.json(userObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 *
 * @param string id
 * @returns
*/
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                rating: await rating(userId)
            });
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 *
 * @param object
 * @returns
*/
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/**

 * @param string id
 * @returns string
*/
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID :(' });
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No such user exists' });
        }
        const thought = await Thought.findOneAndUpdate({ users: req.params.userId }, { $pull: { users: req.params.userId } }, { new: true });
        if (!thought) {
            res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }
        res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
/**
 
 * @param string
 * @param object
 * @returns
*/
export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID :(' });
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID :(' });
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
