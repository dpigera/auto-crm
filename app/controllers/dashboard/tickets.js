import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardTicketsController extends Controller {
  @service pocketbase;
  @service router;
  @tracked isMobileMenuOpen = false;
  @tracked tickets = [];


  constructor() {
    super(...arguments);
    this.fetchTickets();
  }

  async fetchTickets() {
    try {
      const tickets = await this.pocketbase.getTickets();
      this.tickets = tickets;
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      this.tickets = [];
    }
  }

  @action
  viewTicket(ticketId) {
    this.router.transitionTo('dashboard.tickets.view', ticketId);
  }

  // ... any other tickets-specific controller code ...
} 