const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => { //using two middlewares (checking if authenticated and if enough credits)
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',') .map(email => ({ email: email.trim() })),
			user: req.user.id,
			dateSent: Date.now()
		})

		//sending email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try { 
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			console.log(err);
			res.status(422).send(err);
		}
	});	

	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting');
	});
};

