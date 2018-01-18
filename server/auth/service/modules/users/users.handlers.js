import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import secrets from "../../../secrets";

const User = mongoose.model("User");
const { jwtSecret } = secrets;
const DEFAULT_PASSWORD_HASH =
  "$2a$04$dly.zbwDpj/q7tEvH6ZEm.LFkVkFzEUS/ETrXkXrQHqRFkwi8Gi1e";

const userToSend = userDoc => ({
  username: userDoc.username,
  email: userDoc.email
});

export const userRegister = (req, res, next) => {
  const { username, password, email } = req.body;
  const userFindQuery = {
    $or: [{ username }, { email }]
  };
  User.findOne(userFindQuery).then(user => {
    if (user) {
      return res
        .status(403)
        .json({ msg: "Please provide unique username and email" });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: passwordHash,
      email
    });
    newUser
      .save()
      .then(savedUser => {
        // generate JWT
        const token = jwt.sign(userToSend(savedUser), jwtSecret);
        return res.status(200).json({ token });
      })
      .catch(error => next(error));
  });
};

export const userLogin = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    // prevent timing attacks
    const passwordHash = user ? user.password : DEFAULT_PASSWORD_HASH;
    const isUserValid = bcrypt.compareSync(password, passwordHash);
    if (!user || !isUserValid) {
      return res.status(403).json({ msg: "Invalid credentials." });
    }
    // generate JWT
    const token = jwt.sign(userToSend(user), jwtSecret);
    return res.status(200).json({ token });
  });
};
