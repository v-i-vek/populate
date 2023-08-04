const express = require("express");

const signoutRoutes = express.Router();

signoutRoutes.post("/signout", (req, res) => {
    req.session.destroy();
    res.send.status(200).json({
        status: 200,
        message: "Signed out successfully",
    });
});

module.exports = signoutRoutes;
