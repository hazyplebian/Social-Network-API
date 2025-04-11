import { Schema, model, type Document, Types } from 'mongoose';

export interface Reaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export interface Thought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Reaction[];
  reactionCount: number;
}

// Reaction Schema (subdocument)
const reactionSchema = new Schema<Reaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter to format the date on query. You can customize the format as needed.
      get: (timestamp: Date) => new Date(timestamp).toLocaleString()
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// Thought Schema
const thoughtSchema = new Schema<Thought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter method to format the timestamp
      get: (timestamp: Date) => new Date(timestamp).toLocaleString()
    },
    username: {
      type: String,
      required: true
    },
    // Array of nested reaction documents using reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual property: reactionCount
thoughtSchema.virtual('reactionCount').get(function (this: Thought) {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model<Thought>('Thought', thoughtSchema);

export default Thought;
