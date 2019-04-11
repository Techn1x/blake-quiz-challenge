import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default Route.extend({
	currentUser: service(),
	
	model(params) {
		return this.store.findRecord('quiz', params.quiz_id, { include: 'questions' });
	},
	
	setupController(controller, model) {
		this._super(controller, model);
		
		// Reset the quiz submission 
		controller.set('submittedAnswers',[]);
	}
});
