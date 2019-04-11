import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Unit | Controller | application', {
  unit: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupTest(hooks);

  test('it loads model and can tell if it needs to create user', async function(assert) {
    this.server.loadFixtures('users');
    
    let controller = this.owner.lookup('controller:application');
    let store = this.owner.lookup('service:store');
    let users = await store.findAll('user');
    controller.set('model', users);
    
    assert.ok(!controller.nameEntry); // Should be empty to start
    assert.equal(controller.model.length,users.length); // Ensure model is set correctly
    
    // Ensure isNewUser works correctly
    controller.set('nameEntry',users.firstObject.name);
    assert.ok(!controller.get('isNewUser'));
    controller.set('nameEntry',"12345!@#"); // Shouldn't exist
    assert.ok(controller.get('isNewUser'));
  });
  
  test('it executes the login action as expected', async function(assert) {
    assert.expect(3);
    
    this.server.loadFixtures('users');
    
    let controller = this.owner.lookup('controller:application');
    let store = this.owner.lookup('service:store');
    let users = await store.findAll('user');
    controller.set('model', users);
    
    controller.setProperties({
      router: {
        transitionTo() {
          assert.ok(true);
        }
      }
    });

    // Ensure no name won't login
    controller.send('login','');
    assert.ok(controller.get('displayNoNameError'));
    
    // Ensure if given a user name, it sets the current user and transitions
    controller.send('login',users.firstObject.name); // Should call transition
    assert.equal(controller.currentUser.user.id,users.firstObject.id);
  });
});
