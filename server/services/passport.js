const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

// this function is responsible for encoding instance of user, this information will be held in cookie
passport.serializeUser((user, done) => {
  // arg1: instance of user passed in done(null, user) in then of findOne or save below
  done(null, user.id); // Using mongodb id (can access to id instead of _id.id), that will be in cookie
});

// this function is responsible for deserializing user, from the state that serialize left it and it was stored in cookie to a instance held in db
// arg1: id passed to done in serializeUser, arg2: done as callback, that shows when the work here is finished
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
		done(null, user)
	});
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" // url that will be used after user grants permission, there will be code attached, it is route to handle on my side
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser); // arg1: error object, arg2: data from db
          } else {
            new User({ googleId: profile.id }).save().then(user => {
              done(null, user);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);
