import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardTicketsViewRoute extends Route {
  @service pocketbase;

  async model(params) {
    return await this.pocketbase.getTicket(params.ticket_id);
  }
} 