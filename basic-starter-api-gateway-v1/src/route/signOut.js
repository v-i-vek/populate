const express = require("express");

const signoutRoutes = express.Router();

signoutRoutes.post("/signout", (req, res) => {
    // console.log(res)
    // res.clearCookie("email", { path: "/forgotpassword" });
    // res.clearCookie("jwt", { path: "/users" }).status(200).json({
    //     status: 200,
    //     message: "Signed out successfully",
    const expirationTime = new Date(Date.now() + 0);

    const cookieString = `jwt=; HttpOnly; Expires=${expirationTime.toUTCString()};`;
    res.setHeader("Set-Cookie", cookieString);

    res.status(200).json({
        statusCode: 200,
        headers: {
            "Set-Cookie": "signout",
            "Content-Type": "application/json",
            path: "/users",
        },
        body: {
            status: 200,
            message: "Signed Out succefully",
            data: {

            },
        },
    });
});

module.exports = signoutRoutes;
