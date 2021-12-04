const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => {
        res.status(200).json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get a thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      // no need for sorting because we'd be only sorting one user.
      // .sort({ _id: -1 })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.status(200).json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

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
  // update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.status(200).json(thoughtData);
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

  //remove a thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.status(200).json(thoughtData);
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
