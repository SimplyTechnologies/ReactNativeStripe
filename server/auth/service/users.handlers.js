import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as stripeHelper from "../helpers/stripe";

const User = mongoose.model("User");
const JWT_SECRET = process.env.JWT_SECRET || "example";
const DEFAULT_PASSWORD_HASH =
  "$2a$04$dly.zbwDpj/q7tEvH6ZEm.LFkVkFzEUS/ETrXkXrQHqRFkwi8Gi1e";

const userToSend = userDoc => ({
  _id: userDoc._id,
  username: userDoc.username,
  customerId: userDoc.customerId
});

export const userRegister = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (user) {
      return res.status(400).json({
        errors: { username: { msg: "Please provide unique username" } }
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    stripeHelper
      .createCustomer(username)
      .then(customer =>
        User.create({
          username,
          password: passwordHash,
          customerId: customer.id
        })
      )
      .then(savedUser => {
        // generate JWT
        const token = jwt.sign(userToSend(savedUser), JWT_SECRET);
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
      return res.status(403).json({ message: "Invalid credentials." });
    }
    // generate JWT
    const token = jwt.sign(userToSend(user), JWT_SECRET);
    return res.status(200).json({ token });
  });
};

export const updateUser = (req, res, next) => {
  const { customerId } = req.body;
  const { id } = req.params;
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { $set: { customerId } },
    { new: true }
  )
    .then(user => {
      return res.json(user);
    })
    .catch(error => next(error));
};
