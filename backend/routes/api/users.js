const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const { validateSignup } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;
  const usersFound = await User.unscoped().findAll({
    where: {
      [Op.or]: {
        username,
        email,
      },
    },
  });

  const existingUserError = {
    message: "User already exists",
    errors: {},
  };

  const emailExistsError = "The provided email is invalid";
  const usernameExistsError = "Username must be unique";

  usersFound.forEach((existingUser) => {
    if (existingUser.email === email && existingUser.username === username) {
      existingUserError.errors.email = emailExistsError;
      existingUserError.errors.username = usernameExistsError;
    } else if (existingUser.username === username) {
      existingUserError.errors.username = usernameExistsError;
    } else if (existingUser.email === email) {
      existingUserError.errors.email = emailExistsError;
    }
  });

  if (Object.values(existingUserError.errors).length > 0) {
    return next(existingUserError);
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    hashedPassword,
    firstName,
    lastName,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  await setTokenCookie(res, safeUser);

  return res.status(201).json({
    user: safeUser,
  });
});

module.exports = router;
