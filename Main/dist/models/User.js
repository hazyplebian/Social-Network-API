import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Regular expression to match a valid email format
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User', // self-reference for friends
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Virtual property to get the count of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
