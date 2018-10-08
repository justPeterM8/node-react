const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport'); // require for loading file
require('./models/Survey');


const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //serving up production assets (pareticular css or js file from e.g. /client/build/static/js)
  
  // if any get request comes in and server does not understand what it is looking for, then look at this 
  //folder and try to find a file that will match
  app.use(express.static('client/build')); 

  //if someone makes a request to a route that express doesn't understand just serve up the index.html document
  //if there are no routes above that catch it and no file in client/build catch this request and serve up the index.html from client/build
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log("app started");
});