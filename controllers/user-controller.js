const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find([])
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get a single user
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
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
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.status(200).json(userData))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
