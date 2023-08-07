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
        if (firstName === undefined) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter the firstName" });
        }
        firstName = firstName.trim();
        if (firstName.length === 0) {
            return res
                .status(401)
                .json({ status: 401, message: "firstName can't be empty" });
        }
        const namePattern = /^[a-zA-Z]+$/;
        if (!namePattern.test(firstName)) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter valid firstName" });
        }

        if (lastName === undefined) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter lastName" });
        }
        lastName = lastName.trim();

        if (lastName.length === 0) {
            return res
                .status(401)
                .json({ status: 401, message: "lastname can't be empty" });
        }
        if (!namePattern.test(lastName)) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter valid lastname" });
        }

        if (emailId === undefined) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter the emailId" });
        }

        if (password === undefined) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter the password" });
        }
        if (confirmPassword === undefined) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter the Confirm password" });
        }

        emailId = emailId.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if (!emailPattern.test(emailId)) {
            return res
                .status(400)
                .json({ status: 400, message: "please enter valid emailId" });
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordPattern.test(password)) {
            return res
                .status(400)
                .json({
                    status: 400,
                    message:
            "password must have atleast one uppercase ,one lower case ,one digit,one special character",
                });
        }

        if (password.length < 6) {
            return res.status(401).json({
                status: 401,
                message: "Password must be at least 6 characters long",
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
