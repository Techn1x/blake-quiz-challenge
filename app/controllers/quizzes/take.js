import Controller from '@ember/controller';

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
	currentUser: service(),
	router: service(),
	
	init() {
		this._super(...arguments);
		this.submittedAnswers = [];
	},
	
	currentQuestion: computed('submittedAnswers.length', function() {
		return this.model.questions.objectAt(this.submittedAnswers.length);
	}),
	
	quizComplete: computed('submittedAnswers.length','model.questions.length', function() {
		return this.submittedAnswers.length === this.model.questions.length;
	}),
	
	actions: {
		setAnswer(chosenAnswerIndex) {
			this.submittedAnswers.pushObject(chosenAnswerIndex);
		},
		
		submitAnswers(answers) {
			this.currentUser.user.results.pushObject({quizId: this.model.id, answers});
			this.currentUser.user.save();
			this.router.transitionTo('quizzes.index');
		}
	}
});
