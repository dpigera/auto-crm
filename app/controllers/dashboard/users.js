import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardUsersController extends Controller {
  @service pocketbase;
  @tracked users = [];

  constructor() {
    super(...arguments);
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const users = await this.pocketbase.getUsers();
      this.users = users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      this.users = [];
    }
  }
} 