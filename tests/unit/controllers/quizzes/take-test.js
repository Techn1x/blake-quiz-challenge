import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Unit | Controller | quizzes/take', {
  unit: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupTest(hooks);

  test('it handles answering and submitting', async function(assert) {
    this.server.loadFixtures();
    
    let controller = this.owner.lookup('controller:quizzes/take');
    let store = this.owner.lookup('service:store');
    let quiz = await store.findRecord('quiz',1, { include: 'questions' });
    let user = this.server.create('user');
    
    // Set model
    controller.set('model',quiz);
    controller.set('currentUser.user',user);
    
    controller.setProperties({
      router: {
        transitionTo() {
          assert.ok(true);
        }
      }
    });
    
    assert.equal(controller.submittedAnswers.length,0);
    
    // Answer each question
    quiz.questions.forEach((q,i) => {
      // Check current question is correct
      assert.equal(controller.currentQuestion.id,q.id);
      // Pick a random answer
      controller.send('setAnswer',Math.floor(Math.random() * q.answers.length));
      // Check it was submitted
      assert.equal(controller.submittedAnswers.length,i+1);
    });
    
    assert.ok(controller.submittedAnswers.length,quiz.questions.length);
    assert.ok(controller.quizComplete);
    
    // submit answers
    controller.send('submitAnswers',controller.submittedAnswers);
    // Current user should have results saved
    assert.equal(controller.currentUser.user.results.firstObject.answers,controller.submittedAnswers);
    // Transition should occur
    assert.expect((quiz.questions.length * 2) + 5);
  });
});
