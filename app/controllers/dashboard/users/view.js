import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardUsersViewController extends Controller {
  @service pocketbase;
  @service router;
  @tracked user;
  @tracked userTickets;

  reloadData() {
    this.user = null;
    this.user = this.model.user;

    this.userTickets = null;
    this.userTickets = this.model.tickets;
  }

  @action
  viewTicket(ticketId) {
    this.router.transitionTo('dashboard.tickets.view', ticketId);
  }


  @action
  goBack() {
    window.history.back();
  }
} 