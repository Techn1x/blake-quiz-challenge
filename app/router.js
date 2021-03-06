import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('quizzes', function() {
    this.route('take', { path: '/:quiz_id/take' });
  });
  this.route('results');
});

export default Router;
