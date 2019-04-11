import Component from '@ember/component';

import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  
  correctAnswerCount: computed('result','quiz.questions', function() {
    let count = 0;
    
    this.quiz.questions.forEach((q,i) => {
      if(q.correctAnswer === this.result.answers[i]) count++;
		});
		
    return count;
  })
});
