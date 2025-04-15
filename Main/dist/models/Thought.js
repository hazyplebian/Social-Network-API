import { Schema, model, Types } from 'mongoose';
// Reaction Schema (subdocument)
const reactionSchema = new Schema({
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
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});
// Thought Schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true
    },
    // Array of nested reaction documents using reactionSchema
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
// Virtual property: reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);
export default Thought;
