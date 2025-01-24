import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardUsersViewRoute extends Route {
  @service pocketbase;

  async model(params) {
    try {
      const user = await this.pocketbase.getUser(params.user_id);
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.reloadData();
  }
} 