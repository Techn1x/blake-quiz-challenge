import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
	question: attr('string'),
	answers: attr(),	// ["United States", "Russia", ...]
	correctAnswer: attr('number'),	// zero-based index
});
