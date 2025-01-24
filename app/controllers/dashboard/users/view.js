import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class DashboardUsersViewController extends Controller {
  @service pocketbase;
  @tracked user;


  reloadData() {
    this.user = null;
    this.user = this.model;
  }
  
  setup(model) {
    debugger;
    this.user = model;
  }
} 