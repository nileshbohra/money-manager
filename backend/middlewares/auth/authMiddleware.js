const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY;
// Authenticate Token Middleware
module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).send("Access denied...No token provided...");
    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
    } catch (er) {
        res.clearCookie("token");
        return res.status(400).send(er.message);
    }
};