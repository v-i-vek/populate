/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const UserRole = require("../model/userRole");
require("dotenv").config();
const validator = require("email-validator");

module.exports = {
    signIn: async (req, res) => {
        try {
            let { emailId, password } = req.body;
            const salt = process.env.SALT;

            if (Object.keys(req.body).length === 0) {
                return res.status(406).json({ status: 406, message: "Data not Found, Payload Not Acceptable" });
            }

            if (emailId === undefined) {
                return res.status(401).json({
                    status: 401,
                    errors: [{
                        value: `${emailId}`,
                        msg: `${emailId} value, emailId is Undefined`,
                        params: "emailId",

                    }],
                });
            }

            emailId = emailId.trim();

            if (emailId.length === 0) {
                return res.status(401).json({
                    status: 401,
                    errors: [{
                        value: `${emailId}`,
                        msg: `${emailId} ,emailId can't be empty`,
                        params: "emailId",

                    }],
                });
            }

            const validate = validator.validate(emailId);
            if (!validate) {
                return res.status(401).json({
                    status: 401,
                    errors: [{
                        value: `${emailId}`,
                        msg: `${emailId}, not a valid emailID`,
                        params: "emailId",

                    }],
                });
            }

            // const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
            // if (!emailPattern.test(emailId)) {
            //     return res.status(401).json({
            //         status: 401,
            //         errors: [{
            //             value: `${emailId}`,
            //             msg: `${emailId} not a valid emailID`,
            //             params: "emailId",
            //             location: "body",
            //         }],
            //     });
            // }

            if (password === undefined) {
                return res.status(401).json({
                    status: 401,
                    errors: [{
                        value: `${password}`,
                        msg: `${password} , password not defined`,
                        params: "password",

                    }],
                });
            }

            if (password.length === 0) {
                return res.status(401).json({
                    status: 401,
                    errors: [{
                        value: `${password}`,
                        msg: `${password} can't be empty`,
                        params: "password",

                    }],
                });
            }

            const user = await User.findOne({ emailId });
            if (!user) {
                return res.status(401).json({
                    status: 401,
                    message: "Incorrect Email or password",
                });
            }
            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                .toString("hex");

            if (hashedPassword === user.password) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                const expirationTime = new Date(Date.now() + 12 * 60 * 60 * 1000);

                const cookieString = `jwt=${token}; HttpOnly; Expires=${expirationTime.toUTCString()};`;
                res.setHeader("Set-Cookie", cookieString);
                console.log(cookieString, "=================");
                return res.status(200).json({
                    statusCode: 200,
                    headers: {
                        "Set-Cookie": cookieString,
                        "Content-Type": "application/json",
                    },
                    body: {
                        status: 200,
                        message: "Signed in successfully",
                        data: {
                            _id: user._id,
                            role: user.userRole,
                            name: `${user.firstName} ${user.lastName}`,
                        },
                    },
                });
            }

            return res.status(401).json({
                status: 401,
                message: "Incorrect Email or password",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },

    userRole: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            const role = user.userRole;
            const userRole = await UserRole.findOne({ _id: role });

            return res.status(200).json({
                status: 200,
                userRole: userRole.roleName,
            });
        } catch (err) {
            if (err.name === "CastError" && err.kind === "ObjectId") {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid Id ",
                });
            }

            return res.status(500).json({
                status: 500,
                message: `Internal Server Error: ${err.message}`,
            });
        }
    },
};
