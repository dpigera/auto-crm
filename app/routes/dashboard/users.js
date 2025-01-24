import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardUsersRoute extends Route {
  @service pocketbase;

  async model() {
    try {
      const records = await this.pocketbase.getUsers();
      return records;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }
} 