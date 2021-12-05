const { User, Thought } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get a single user
  // instead of accessing entire req, destructured params out of it.
  getUserById({ params }, res) {
    // User.findOne(params.id) is another way to write it
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      // no need for sorting because we'd be only sorting one user.
      // .sort({ _id: -1 })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a user
  // again destructure the body part out of the Express.js req object
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.status(200).json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // update a user by id
  updateUser({ params, body }, res) {
    // if we don't set the third new:true parameter, it will retun the original doc
    //not the updated one -->updateOne() and updateMany() update without returning
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  //add a friend to user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: " No user found with this ID!" });
          return;
        }
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a friend from user
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          // delete associated thoughts
          return Thought.deleteMany({
            _id: { $in: userData.thoughts },
          });
        }
      })
      .then(() =>
        res.status(200).json({
          message: "succes!",
        })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
