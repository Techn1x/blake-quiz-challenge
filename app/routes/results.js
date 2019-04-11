import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		// Get the quizzes, but also sort just in case API returns them in the wrong order
		return this.store.findAll('quiz', {reload: true, include: 'questions'}).then((quizzes) => quizzes.sortBy('id'));
	}
});
