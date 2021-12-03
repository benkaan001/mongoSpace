const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

//set up --->   /api/users      routes
router.route("/").get(getAllUsers).post(createUser);

// set up --->  /api/users/:id    routes
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
