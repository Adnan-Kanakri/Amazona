// const UserService = require("../service/user.service")
const Bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const httpError = require("http-errors")

exports.signInUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            email: email
        })
        if (user) {
            let passwordCheck = await Bcrypt.compare(password, user.password);
            if (passwordCheck) {
                const token = JWT.sign({
                    user: user
                }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn:"30d"
                })
                res.status(200).json({
                    message: "Done",
                    user: user,
                    token: token
                })
            } else {
                const error = new Error("password wrong")
                throw httpError.NotAcceptable({
                    message: error.message
                })
            }
        } else {
            res.status(404).json({
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        next(error);
    }
}