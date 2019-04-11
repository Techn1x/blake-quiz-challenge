import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | quizzes/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:quizzes/index');
    assert.ok(route);
  });
});
