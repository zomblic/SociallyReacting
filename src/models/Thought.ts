import { Schema, model, Types, Document } from 'mongoose';


interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  getReactions: number;
}

// Schema to create Post model
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
  },
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Create a virtual property `getTags` that gets the amount of tags associated with an application
thoughtSchema
 .virtual('reactionCount')
  // Getter
  .get(function (this: IThought) {
    return this.reactions.length;
  });

// Initialize our Application model
const reactionThought = model('reactThought', thoughtSchema);

export default reactionThought;
