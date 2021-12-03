const { Schema, model, Types } = require("mongoose");
const dateFormatter = require(".././utils/dateFormatter");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormatter(createdAtVal),
  },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Please fill this part with a thought!"],
      min: [1, "Sorry. Must have a minimum of 1 character!"],
      max: [280, "Sorry.Cannot exceed 280 characters!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormatter(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    // use ReactionSchema to validate data for a reaction
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
