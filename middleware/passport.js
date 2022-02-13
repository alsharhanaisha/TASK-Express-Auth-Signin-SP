const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
const JwtStrategy = require("passport-jwt").Strategy;

exports.localStrategy = new localStrategy(async (username, password, done) => {
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

exports.jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
