import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { startMirage } from 'blake-quiz-challenge/initializers/ember-cli-mirage';

module('Integration | Component | quiz-result', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  
  afterEach() {
    this.server.shutdown();
  },
}, function(hooks) {
  setupRenderingTest(hooks);
  
  test('it renders with the expected results', async function(assert) {
    
    this.server.loadFixtures();
    let store = this.owner.lookup('service:store');
    let quiz = await store.findRecord('quiz',1, { include: 'questions' });
    
    assert.ok(quiz.questions.length > 0);
    
    let result = {quizId: quiz.id, answers: quiz.questions.map((q) => {
      return Math.floor(Math.random() * q.answers.length);
    })};
    
    this.set('quiz',quiz);
    this.set('result',result);

    await render(hbs`{{quiz-result quiz=quiz result=result}}`);

    let correctAnswerCount = 0;
		quiz.questions.forEach((q,i) => {
      if(q.correctAnswer === result.answers[i]) correctAnswerCount++;
		});

    // Check the title & result summary is correct
    assert.dom('.card-title').hasText(quiz.title);
    assert.dom('[data-test-result-summary]').hasText(
      `${Math.floor((correctAnswerCount / quiz.questions.length) * 100)}% - ${correctAnswerCount} of ${quiz.questions.length} correct`);

    // Check each question renders correctly
    quiz.questions.forEach((q,i) => {
      let isQuestionCorrect = q.correctAnswer === result.answers[i];
      
      assert.dom(`[data-test-question-index="${i}"] .card-header button`).hasText(q.question);
      if(isQuestionCorrect) {
        assert.dom(`[data-test-question-index="${i}"] .card-header .fa-check`).hasClass('text-success');
      } else {
        assert.dom(`[data-test-question-index="${i}"] .card-header .fa-times`).hasClass('text-danger');
      }
      
      assert.dom(`[data-test-question-index="${i}"] [data-test-question-correct]`).hasText("Correct answer: " + q.answers[q.correctAnswer]);
      assert.dom(`[data-test-question-index="${i}"] [data-test-question-user]`).hasText("Your answer: " + q.answers[result.answers[i]]);
    });
  });
});
