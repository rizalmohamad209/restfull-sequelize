const mainRoutes = require("express").Router();
const mhsRoute = require("./mhsRoute");

const authRoute = require("./authRoute");

mainRoutes.use("/mhs", mhsRoute);
mainRoutes.use("/auth", authRoute);
module.exports = mainRoutes;
