/* eslint-disable no-underscore-dangle */
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/user");
require("dotenv").config();

const { logFun, error, info } = require("../logger/logger");

const forgetMessage = {};
forgetMessage.msg = "success and error value for the logger";
module.exports = {
    // eslint-disable-next-line consistent-return
    forgotPassword: async (req, res) => {
        try {
            const { emailId } = req.body;

            const { url } = process.env;
            const user = await User.findOne({ emailId });
            if (!user) {
                logFun(error, forgetMessage.msg = "User not found");
                return res.status(404).json({
                    status: "failed",
                    message: "User not found",
                });
            }
            const transporter = nodemailer.createTransport(
                {
                    service: "gmail",
                    auth: {
                        user: process.env.emailUser,
                        pass: process.env.emailPassword,
                    },
                },
                { from: "TechForum" },
            );

            const mailOptions = {
                from: "TechForum <techforum.forum@gmail.com>",
                to: emailId,
                subject: "Reset Your Password",
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title>Reset Password Email</title>
                </head>
            
                <body>
                    <div style=" 
                        padding: 26px;
                        text-align: center;
                        width: 375px;
                        border-radius: 6px;
                        box-shadow: 0px 0px 10px 2px rgb(156, 156, 156);">
                        <h1 style="color: #00b8d4;">TechForum</h1>
                        <hr>
                        <h2>Password Reset</h2>
                        <h4>Hello ${user.firstName}</h4>
                        <p>We have received a request to reset the password for the emailId: ${
    user.emailId
}.</p>
                        <p>You can reset your password by clicking the link below:</p>
                        <a href="${url + user._id}">
                            <button style="
                            background-color: #00b8d4;
                            color: white;
                            width: 250px;
                            padding: 10px;
                            border-radius: 20px;
                            font-size: 16px;">Reset your password</button></a>
                        <p>If you didn't request for a password reset, please let us know immediately by replying to this email.</p>
                        <p>-TechForum team</p>
                    </div>
                </body>
                </html>
  `,
            };
            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    logFun(error, err);
                    return res.status(500).json({
                        status: "failed",
                        message: "Server Error",
                    });
                }
                logFun(info, forgetMessage.msg = "Reset password email sent");
                return res.cookie("email", emailId, {
                    maxAge: 900000,
                    httpOnly: true,
                    path: "/forgotpassword",
                    sameSite: "none",
                    secure: true,
                })
                    .status(201)
                    .json({
                        status: "success",
                        message: "Reset password email sent",
                    });
            });
        } catch (err) {
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const password = req.body.newPassword;
            const { salt } = process.env;
            const { email } = req.cookies;
            if (!email || !password) {
                logFun(error, forgetMessage.msg = "Missing email or password");
                return res.status(404).json({
                    status: "failed",
                    message: "Missing email or password",
                });
            }
            const user = await User.findOne({ emailId: email });

            if (!user) {
                logFun(error, forgetMessage.msg = "Invalid Email or user");
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid Email or user",
                });
            }

            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                .toString("hex");
            user.password = hashedPassword;
            await user.save();
            return res.clearCookie("email", { path: "/forgotpassword" }).status(201).json({
                status: "success",
                message: "Password updated successfully",
            });
        } catch (err) {
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
};
