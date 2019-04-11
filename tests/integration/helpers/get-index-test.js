import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | get-index', function(hooks) {
  setupRenderingTest(hooks);

  test('it produces correct value', async function(assert) {
    this.set('inputValue', ["a","b","c"]);

    await render(hbs`{{get-index inputValue 1}}`);

    assert.equal(this.element.textContent.trim(), 'b');
  });
  
  test('it returns null if given bad args', async function(assert) {
    this.set('inputValue', []);

    await render(hbs`{{get-index inputValue 1}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
