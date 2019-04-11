import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Unit | Controller | quizzes/index', {
  unit: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupTest(hooks);

  test('it knows the next quiz index', function(assert) {
    let controller = this.owner.lookup('controller:quizzes/index');
    
    let user = this.server.create('user');
    user.results.pushObject({quizId: 1, answers: [1,2,3]});
    
    controller.set('currentUser.user',user);
    
    assert.equal(user.results.length,controller.get('currentQuizIndex'));
  });
});
