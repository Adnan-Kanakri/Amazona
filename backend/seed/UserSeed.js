const Bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Users = [
    {
        name: "adnan",
        email: "adnankanakri@gmail.com",
        password: "wwwww",
        isAdmin: true
    },
    {
        name: "ahmad",
        email: "ahmadkanakri@gmail.com",
        password: "wwwww",
        isAdmin: false
    }
]

for (let i = 0; i < Users.length; i++) {
    const user = new User({
        name: Users[i].name,
        email: Users[i].email,
        password: Users[i].password,
        isAdmin: Users[i].isAdmin
    })
    user.save();
}


