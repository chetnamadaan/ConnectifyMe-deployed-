import jwt from"jsonwebtoken"

const createTokenAndSaveCookie = (userId, res) => {
    const Token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "10d",
    });
    res.cookie("jwt", Token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: "strict", // CSRF protection
        maxAge: 10 * 24 * 60 * 60 * 1000, 
    });
};

export default createTokenAndSaveCookie;