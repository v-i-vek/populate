/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
const crypto = require("crypto");
const User = require("../model/user");
require("dotenv").config();

module.exports = {
    signUp: async (req, res) => {
        let {
            // eslint-disable-next-line prefer-const
            firstName,
            lastName,
            emailId,
            password,
            confirmPassword,
        } = req.body;

        if (Object.keys(req.body).length === 0) {
            return res
                .status(406)
                .json({
                    status: 406,
                    message: "Data not Found, Payload Not Acceptable",
                });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                status: 401,
                message: "Password is differ from confirm password",
            });
        }

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(401).json({
                status: 401,
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
            return res.status(201).json({
                status: 201,
                message: "User created successfully",
                data: emailId,
            });
        } catch (err) {
            console.log("error :", err);
            return res.status(500).json({
                status: 500,
                message: " sorry Server Error",
            });
        }
    },
};
