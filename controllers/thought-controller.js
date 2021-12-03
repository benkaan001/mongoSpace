const { Thought, User } = require("../models");

const thoughtController = {
  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((userData) => {
        console.log(userData);
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: " No user found with this ID!" });
          return;
        }
        res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    // findOneAndDelete deletes the document while also returning its data like findOneAndUpdate
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
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

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((userData) => res.status(200).json(userData))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
