const express = require("express");
const route = express.Router();

const usersController = require("../controllers/UsersController")
const isAuth = require("../middleware/AuthMiddleware");

route.post("/signIn", usersController.signInUser);
route.post("/register", usersController.createAccount);
route.get("/:id", isAuth, usersController.getUserProfile)
route.put("/update", isAuth, usersController.updateProfile)

////////////////////import seed
const seedRouter = require("../seed/UserSeed");
route.get("/seed/user", seedRouter.seedUser)



module.exports = route