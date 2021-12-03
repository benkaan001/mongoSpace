const router = require("express").Router();
// import all of the API routes from /api/index.js
const apiRoutes = require("./api");
// attach prefix of `/api` to all of the api routes imported from the api directory
router.use("/api", apiRoutes);
module.exports = router;
