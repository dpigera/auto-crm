import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardUsersViewRoute extends Route {
  @service pocketbase;

  async model(params) {
    try {
      const [user, tickets] = await Promise.all([
        this.pocketbase.getUser(params.user_id),
        this.pocketbase.getTicketsByRequester(params.user_id)
      ]);

      return {
        user,
        tickets: tickets.items || []
      };
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return {
        user: null,
        tickets: []
      };
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.reloadData();
  }
} 