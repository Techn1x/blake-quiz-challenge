import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | index', function(hooks) {
  setupTest(hooks);

  test('it logs out the user', function(assert) {
    let controller = this.owner.lookup('controller:index');
    
    controller.set('currentUser.user','anything');
    controller.send('logout');
    assert.ok(!controller.currentUser.user);  // User should have been cleared
  });
});
