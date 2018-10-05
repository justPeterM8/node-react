const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "5$ for 5 credits",
      source: req.body.id
    });
    req.user.credits += 5; // Access to user delivered by passport, but only if there is cookie (user logged in), that should be checked first
    const user = await req.user.save(); // saving with mongoose
    res.send(user);
  });
};
