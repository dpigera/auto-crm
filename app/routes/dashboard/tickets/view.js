import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardTicketsViewRoute extends Route {
  @service pocketbase;

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.reloadData();
  }

  async model(params) {
    let ticket = await this.pocketbase.getTicket(params.ticket_id);
    return ticket;
  }
} 