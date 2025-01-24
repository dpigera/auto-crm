import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardUsersController extends Controller {
  @service pocketbase;
  @tracked users = [];
  @tracked isModalOpen = false;

  async fetchUsers() {
    try {
      const users = await this.pocketbase.getUsers();
      this.users = users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      this.users = [];
    }
  }

  @action
  async saveUser(userData) {
    try {
      userData.passwordConfirm = userData.password
      userData.verified = true;
      await this.pocketbase.register(userData);
      this.isModalOpen = false;
      this.fetchUsers();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }
} 