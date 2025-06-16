const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY;
// Authenticate Token Middleware
module.exports = (req, res, next) => {
    let token;
    if (!!req.headers.cookie)
        token = req.headers.cookie.split(";")[1].split("=")[1];

    if (!token) return res.sendStatus(401); // Unauthorized if no token is found

    jwt.verify(token, privateKey, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user;
        next();
    });
};