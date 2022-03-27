const Bcrypt = require("bcryptjs");
const User = require("../models/userModel");
require("dotenv").config({ path: "../.env" });
require("../config/dataBase");

const asyncFunc = require("express-async-handler");

const Users = [
    {
        name: "adnan",
        email: "adnankanakri@gmail.com",
        password: Bcrypt.hashSync("adnan111", 12),
        isAdmin: true
    },
    {
        name: "ahmad",
        email: "ahmadkanakri@gmail.com",
        password: Bcrypt.hashSync("adnan111", 12),
    }
]

exports.seedUser = asyncFunc(async (req, res, next) => {

  
        const useSave = await User.insertMany(Users);
        res.send({
            useSave: useSave
        })

        // res.send({
        //     useSave: error.message
        // })
 

    // for (let i = 0; i < Users.length; i++) {
    //     const user = new User({
    //         name: Users[i].name,
    //         email: Users[i].email,
    //         password: Users[i].password,
    //         isAdmin: Users[i].isAdmin
    //     })
    //     const useSave = await user.save();
    // }

})



