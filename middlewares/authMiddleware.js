const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  // Extracting the token from the header
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Token is not valid", message: error.message });
  }
};

module.exports = authMiddleware;
