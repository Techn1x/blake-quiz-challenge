import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | quizzes/take', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:quizzes/take');
    assert.ok(route);
  });
});
