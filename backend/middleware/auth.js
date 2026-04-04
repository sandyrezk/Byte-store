var jwt = require("jsonwebtoken")
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        // check header first
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                error: "No token provided"
            });
        }

        // extract token
        const token = authHeader.split(" ")[1];

        // verify token
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);

        // attach user
        req.user = decodedtoken;

        next();

    } catch (error) {
        return res.status(401).send({
            error: "Unauthenticated"
        });
    }
};

module.exports = auth;