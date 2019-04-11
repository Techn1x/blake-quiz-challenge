import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
	question(i) {
		return `Q${i}`;
	},
	answers() {
		let arr = [];
		for(let i = 0; i <= 3; i++) {
			arr.pushObject(faker.lorem.sentence());
		}
		return arr;
	},
	correctAnswer() {
		return faker.random.number({min: 0, max: 3});
	}
});
