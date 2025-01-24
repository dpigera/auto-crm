import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardTicketsViewController extends Controller {
  @service router;
  @tracked ticket = this.model;



  reloadData() {
    this.ticket = null;
    this.ticket = this.model;
  }

  @action
  goBack() {
    this.router.transitionTo('dashboard.tickets');
  }
} 