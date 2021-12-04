const router = require("express").Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction,
  getAllThoughts,
  getThoughtById,
  updateThought,
} = require("../../controllers/thought-controller");

// ---> /api/thoughts
router.route("/").get(getAllThoughts);

// ---> /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .delete(removeThought)
  .put(updateThought);

// ---> /api/thoughts/:userId
router.route("/:userId").post(addThought);

// ----> /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// -----> /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
