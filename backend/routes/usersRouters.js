const express = require("express");
const route = express.Router();

const usersController = require("../controllers/UsersController")

route.post("/signIn", usersController.signInUser);





////////////////////import seed
const seedRouter = require("../seed/UserSeed");
route.get("/seed/user", seedRouter.seedUser)



module.exports = route