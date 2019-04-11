import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Integration | Component | quiz-list-item', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupRenderingTest(hooks);
  
  // Standard quiz item that is the next to complete
  test('it renders correctly', async function(assert) {
    assert.expect(3);
    
    let quiz = this.server.create('quiz');
    
    this.set('quiz',quiz);
    this.set('clickAction', () => {
      assert.ok(true);  // Ensure the click works
    });

    await render(hbs`{{quiz-list-item quiz=quiz enabled=true onClick=(action clickAction) answeredQuiz=false}}`);

    // Check title
    assert.dom('quiz-title').hasText(quiz.title);
    // Check icon
    assert.dom('.fa-chevron-right').exists();
    // Check enabled
    await click('quiz-title');
  });
  
  // Item is not clickable
  test('it renders disabled', async function(assert) {
    assert.expect(1);
    
    let quiz = this.server.create('quiz');
    
    this.set('quiz',quiz);
    this.set('clickAction', () => {
      assert.ok(false);  // This should not be called - but if it is, assert false anyway
    });

    await render(hbs`{{quiz-list-item quiz=quiz enabled=false onClick=(action clickAction) answeredQuiz=false}}`);

    // Check title
    assert.dom('quiz-title').hasText(quiz.title);
    // Check disabled
    await click('quiz-title');
  });
  
  // Green check mark
  test('it renders answered', async function(assert) {
    assert.expect(2);
    
    let quiz = this.server.create('quiz');
    
    this.set('quiz',quiz);
    this.set('clickAction', () => {});

    await render(hbs`{{quiz-list-item quiz=quiz enabled=false onClick=(action clickAction) answeredQuiz=true}}`);

    // Check icon
    assert.dom('.fa-check').exists();
    assert.dom('.fa-check').hasClass('text-success');
  });
});
