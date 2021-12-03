const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter a username!"],
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email address!"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email!",
      ],
    },
    thoughts: [
      {
        //tell mongoose to expect an ObjectId coming from the child model --Thought model.
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // this prevents virtauls from creating a duplicate of _id as 'id'
    id: false,
  }
);

// create the User model using the UserSchema
const User = model("User", UserSchema);

// get total count of friends
UserSchema.virtual("friendsCount").get(function () {
  // return this.friends.length;
  return this.friends.reduce(
    (total, friend) => total + friend.reactions.length + 1,
    0
  );
});

module.exports = User;
