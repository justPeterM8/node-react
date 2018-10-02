const passport = require("passport");

module.exports = app => {
  app.get("/auth/google",
    passport.authenticate("google", { // google as name of strategy (it is configured in passport already)
      scope: ["profile", "email"] // scopes (things I want have access to)
    })
  ),

	app.get("/auth/google/callback", passport.authenticate("google")), // passport allows to authenticate based on code in url
	
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
};
