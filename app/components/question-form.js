import Component from '@ember/component';

export default Component.extend({
	didReceiveAttrs() {
		this._super(...arguments);
		this.set('answerIndex',0);	// Reset answer index each time
	}
});
