import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardTicketsViewRoute extends Route {
  @service pocketbase;

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.reloadData();
    controller.fetchUsers();
    controller.fetchRequesterDetails();
  }

  async model(params) {
    let ticket = await this.pocketbase.getTicket(params.ticket_id);
    let ticketMessages = await this.pocketbase.fetchTicketMessages(params.ticket_id);
    return { ticket, ticketMessages } ;
  }
} 