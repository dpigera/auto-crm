import Route from '@ember/routing/route';

export default class DashboardTicketsRoute extends Route {
  async beforeModel() {
    await this.controller?.fetchUsers();
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.fetchUsers();
  }
} 