import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardUsersViewController extends Controller {
  @service pocketbase;
  @service router;
  @tracked user;

  reloadData() {
    this.user = null;
    this.user = this.model;
  }

  setup(model) {
    debugger;
    this.user = model;
  }


  @action
  goBack() {
    this.router.transitionTo('dashboard.users');
  }
} 