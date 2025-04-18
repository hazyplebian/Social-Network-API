import { User, Thought } from '../models/index.js';
/**
 * @returns
*/
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * @param string
 * @returns
*/
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const user = await Thought.findById(thoughtId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
export const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        {
        }
        ;
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: newThought._id } }, { new: true });
        if (!user) {
            res.status(404).json({
                message: 'No user with this id!'
            });
        }
        res.json({
            message: 'Thought created successfully!',
            thought: newThought
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
 
 * @param object
 * @returns
*/
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
*
* @param string
* @returns
*/
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({
                message: 'No thought with that ID'
            });
        }
        else {
            // Ensure the 'users' property exists in the Thought schema or remove this line if unnecessary
            await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
            res.json({ message: 'Thought deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
