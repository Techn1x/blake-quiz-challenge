import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Integration | Component | question-form', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a question and answers', async function(assert) {
    let question = this.server.create('question');
    
    this.set('question', question);
    this.set('setAnswer', () => {});  // Dummy action

    await render(hbs`{{question-form question=question onAnswer=(action setAnswer)}}`);
    
    // Ensure questions shows, and each answer renders as expected
    assert.dom('question-title').hasText(this.question.question);
    this.question.answers.forEach((ans, i) => {
      assert.dom(`label[data-test-choice-id="${i}"]`).hasText(this.question.answers[i]);
    });
  });
  
  test('it sets an answer', async function(assert) {
    assert.expect(2);
    
    let question = this.server.create('question');
    
    this.set('question', question);
    let answerPick = 1;
    this.set('setAnswer', (ansIndex) => {
      assert.equal(ansIndex,answerPick);
    });

    await render(hbs`{{question-form question=question onAnswer=(action setAnswer)}}`);
    
    assert.dom('question-title').hasText(this.question.question);
    
    // Pick an answer and submit
    await click(`label[data-test-choice-id="${answerPick}"] input`);
    await click('button');
  });
});
