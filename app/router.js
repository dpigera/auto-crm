import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('dashboard', function() {
    this.route('tickets', function() {
      this.route('view', { path: '/:ticket_id' });
    });
    this.route('knowledge');
  });
});
