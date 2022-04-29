// const UserService = require("../service/user.service")
const Bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const generate = require("../helper/Utility");
// const httpError = require("http-errors")

exports.signInUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("from auth back end")
    try {
        const user = await User.findOne({
            email: email
        })
        if (user) {
            let passwordCheck = await Bcrypt.compare(password, user.password);
            if (passwordCheck) {
                res.status(200).json({
                    message: "Done",
                    user: user,
                    token: generate.generateToken(user)
                })
            } else {
                // console.log("password")
                // const error = new Error("password wrong")
                // console.log(error.message)
                res.status(406).json({
                    message: "password wrong"
                })
                // throw httpError.NotAcceptable({
                //     message: error.message
                // })
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

exports.createAccount = async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email
    const confirmPassword = req.body.confirmPassword
    try {
        if (password === confirmPassword) {
            const hashPassword = Bcrypt.hashSync(password, 8);
            const user = new User({
                name: name,
                password: hashPassword,
                email: email
            })
            const createUser = await user.save();
            res.status(200).json({
                user: createUser,
                token: generate.generateToken(createUser)
            })
        } else {
            res.status(500).json({
                message: "the password doesn't match"
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.getUserProfile = async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json({
                user: user,
            })
        } else {
            const error = new Error("No User Found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error)
    }
}

exports.updateProfile = async (req, res, next) => {
    const id = req.payload._id;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email
    const confirmPassword = req.body.confirmPassword
    try {
        const user = await User.findById(id);
        if (user) {
            user.name = name || user.name
            user.email = email || user.email
            if (password && password === confirmPassword) {
                const hashPassword = Bcrypt.hashSync(password, 8);
                user.password = hashPassword
            }
            const updateUser = await user.save();
            res.status(200).json({
                user: updateUser,
                token: generate.generateToken(createUser)
            })
        } else {
            const error = new Error("No User Found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error)
    }
}



