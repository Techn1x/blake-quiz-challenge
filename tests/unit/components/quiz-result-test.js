import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Unit | Component | quiz-result', {
  unit: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupTest(hooks);

  test('it produces the correct answer count', async function(assert) {
    let component = this.owner.factoryFor('component:quiz-result').create();
    
    this.server.loadFixtures();
    let store = this.owner.lookup('service:store');
    let quiz = await store.findRecord('quiz',1, { include: 'questions' });
    
    assert.ok(quiz.questions.length > 0);
    
    let result = {quizId: quiz.id, answers: quiz.questions.map((q) => {
      return Math.floor(Math.random() * q.answers.length);
    })};
    
    // component.set('quiz')
    component.set('quiz',quiz);
    component.set('result',result);

    let correctAnswerCount = 0;
		quiz.questions.forEach((q,i) => {
      if(q.correctAnswer === result.answers[i]) correctAnswerCount++;
		});
		
		// Check the correct answer count is correct
		assert.equal(correctAnswerCount,component.get('correctAnswerCount'));
  });
});
