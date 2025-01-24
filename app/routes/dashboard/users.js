import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardUsersRoute extends Route {
  @service pocketbase;

  async beforeModel() {
    await this.controller?.fetchUsers();
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.fetchUsers();
  }
} 