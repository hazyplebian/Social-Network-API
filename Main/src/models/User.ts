import { Schema, model, type Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  friendCount: number;
}

const userSchema = new Schema<User>(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Virtual property to get the count of friends
userSchema.virtual('friendCount').get(function (this: User) {
  return this.friends.length;
});

const User = model<User>('User', userSchema);

export default User;
