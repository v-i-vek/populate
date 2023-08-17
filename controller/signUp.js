/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
const crypto = require("crypto");
const User = require("../model/user");
require("dotenv").config();
const { logFun, error, info } = require("../logger/logger");

const signUpMessage = {};
signUpMessage.msg = "value for the logger for error and info";

module.exports = {
    signUp: async (req, res) => {
        let {
            firstName,
            lastName,
            emailId,
            password,
        } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            logFun(error, signUpMessage.msg = "Email address already in use");
            return res.status(401).json({
                status: "failed",
                message: "Email address already in use",
            });
        }

        try {
            const salt = process.env.SALT;
            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                .toString("hex");
            const user = new User({
                firstName,
                lastName,
                emailId,
                password: hashedPassword,
                userRole: process.env.USER_ROLE,
            });
            await user.save();
            logFun(info, signUpMessage.msg = "User created successfully");
            return res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: emailId,
            });
        } catch (err) {
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: " sorry Server Error",
            });
        }
    },
};
