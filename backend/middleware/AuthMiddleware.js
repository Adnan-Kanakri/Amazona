const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            const error = new Error("Not Authenticated");
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(" ")[1]; ///Bearer token
        let decodedToken;
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                const error = new Error("Invalid Token");
                error.statusCode = 401;
                throw error;
            }
            return decoded.user;
        });
        req.payload = decodedToken;
    } catch (error) {
        next(error)
    }
    next();
};
