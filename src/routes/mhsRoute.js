const mhsRoute = require("express").Router();
const mhsController = require("../controllers/mhsController");
const authMiddleware = require("../helpers/authMiddleware");

mhsRoute.get("/", authMiddleware.checkLogin, mhsController.getAllMhs);
mhsRoute.post("/", mhsController.createMhs);
mhsRoute.put("/:id", mhsController.updateMhs);
mhsRoute.delete("/:id", mhsController.deleteMhs);
mhsRoute.get("/:id", mhsController.getMhsById);

module.exports = mhsRoute;
