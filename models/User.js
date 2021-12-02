const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
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
  //   thoughts: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Thought",
  //     },
  //   ],
  //   friends: [],
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

module.exports = User;
