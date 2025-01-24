import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardHomeController extends Controller {
  @service pocketbase;
  @tracked openTickets = 0;

  constructor() {
    super(...arguments);
    this.fetchDashboardData();
  }

  async fetchDashboardData() {
    try {
      const tickets = await this.pocketbase.getTickets();
      this.openTickets = tickets.filter(ticket => ticket.status === 'open').length;
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      this.openTickets = 0;
    }
  }
} 