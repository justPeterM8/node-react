const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
	app.post("/api/surveys", requireLogin, requireCredits, (req, res) => { //using two middlewares (checking if authenticated and if enough credits)
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',') .map(email => ({ email: email.trim() })),
			user: requ.user.id,
			dateSent: Date.now()
		})
	});

	//sending email
	const mailer = new Mailer(survey, surveyTemplate(survey));
};
