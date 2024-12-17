const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken; // Ensure req.cookies exists

  if (!token) {
    console.log("No token provided.");
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }
    req.user = user; // Attach decoded user info
    next();
  });
};


const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.body.userId || req.user.role === "user") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You're not authorized" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ error: "Access denied! No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded; // Assuming the decoded token contains admin details
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token!" });
  }
};



module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
};
