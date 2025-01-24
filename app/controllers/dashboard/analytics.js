import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardAnalyticsController extends Controller {
  @service pocketbase;
  @tracked totalTickets = 0;

  constructor() {
    super(...arguments);
    this.fetchAnalytics();
  }

  async fetchAnalytics() {
    try {
      const tickets = await this.pocketbase.getTickets();
      this.totalTickets = tickets.length;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      this.totalTickets = 0;
    }
  }
} 