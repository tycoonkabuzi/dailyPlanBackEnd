const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  try {
    //get the token from the cookie.
    const token = req.cookies.token;

    // check the existence of the token
    if (!token) {
      return res.status(401).json({ message: "No token available" });
    }
    // we now have to do something once the verification is done
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = AuthMiddleware;
