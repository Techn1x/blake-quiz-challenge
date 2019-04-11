import Controller from '@ember/controller';

import { inject as service } from '@ember/service';

export default Controller.extend({
	currentUser: service(),
	router: service(),
	
	init() {
		this._super(...arguments);
		this.submittedAnswers = [];
	},
	
	currentQuestion: 0,
	
	quizComplete: false,
	
	actions: {
		setAnswer(/*chosenAnswerIndex*/) {
			return true;
		},
		
		submitAnswers(/*answers*/) {
			return true;
		}
	}
});
