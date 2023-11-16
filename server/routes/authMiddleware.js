const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log("Backend Received Token:", token);  // Log the received token on the backend

    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);  // Log any error during token verification
        res.status(400).send({ message: 'Invalid token.' });
    }
}

module.exports = auth;
