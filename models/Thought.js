const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: [true, "Please fill this part with a thought!"],
    min: [1, "Sorry. Must have a minimum of 1 character!"],
    max: [280, "Sorry.Cannot exceed 280 characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  //   reactions: [ReactionSchema],
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
