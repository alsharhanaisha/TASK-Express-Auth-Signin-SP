const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.localStrategy = new localStrategy(async (username, password, done) => {
  console.log("Middleware Access");
  try {
    const user = await User.findOne({ username: username });

    const isPasswordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (isPasswordMatch) done(null, user);

    const error = {
      message: "unauthorized",
      status: 401,
    };
    done(error);
  } catch (error) {
    done(error);
  }
});
