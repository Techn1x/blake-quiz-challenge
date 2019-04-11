import Controller from '@ember/controller';

import { inject as service } from '@ember/service';

export default Controller.extend({
	currentUser: service(),
	router: service(),
	
	currentQuizIndex: 0,
	
	actions: {
		transitionToQuiz(/*quizId*/) {
			return true;
		}
	}
});
