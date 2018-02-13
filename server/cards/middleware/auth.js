import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "example";

const setAuthUser = (req, user) => {
  req.user = user;
};

const isAuthenticated = req => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return false;
  }
  const token = authorization.replace("Bearer ", "");
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.setAuthUser(decoded);
    return true;
  } catch (err) {
    return false;
  }
};

export function requiresToBeLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Not logged in" });
}

export function initAuth(req, res, next) {
  req.isAuthenticated = () => isAuthenticated(req);
  req.setAuthUser = user => setAuthUser(req, user);
  return next();
}
