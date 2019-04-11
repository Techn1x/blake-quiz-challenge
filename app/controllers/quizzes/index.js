import Controller from '@ember/controller';

import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
// import { computed } from '@ember/object';

export default Controller.extend({
	currentUser: service(),
	router: service(),
	
	currentQuizIndex: alias('currentUser.user.results.length'),
	/* Alternative, uses quizId instead of results array length to determine current quiz,
	 * but assumes quizId string is always a number, and the next quiz is +1 */
	// currentQuizId: computed('currentUser.user.results.length',function() {
	// 	let results = this.currentUser.user.results.sortBy('quizId');
	// 	let nextId = results.get('lastObject.quizId') ? parseInt(results.get('lastObject.quizId'),10) + 1 : 1;
	// 	return nextId.toString();
	// }),
	
	actions: {
		transitionToQuiz(quizId) {
			this.router.transitionTo('quizzes.take',quizId);
		}
	}
});
