const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // require for loading file


const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie will be held in browser until it will expire
    keys: [keys.cookieKey] // just random char sequence, it is array, so it will pick one if more declared
  })
);

// Telling passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(PORT, () => {
  console.log("app started");
});