import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token, authorization denied" });

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;
