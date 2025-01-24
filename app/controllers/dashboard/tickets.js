import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardTicketsController extends Controller {
  @service pocketbase;
  @service router;
  @tracked isMobileMenuOpen = false;
  @tracked tickets = [];
  @tracked isModalOpen = false;
  @tracked users = [];

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

  @action
  async saveTicket(ticketData) {
    try {
      await this.pocketbase.createTicket(ticketData);
      this.isModalOpen = false;
      await this.fetchTickets();
    } catch (error) {
      console.error('Failed to save ticket:', error);
    }
  }

  @action
  async fetchUsers() {
    try {
      const records = await this.pocketbase.getUsers();
      this.users = records;
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }

  // ... any other tickets-specific controller code ...
} 