import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardKnowledgeController extends Controller {
  @service pocketbase;
  @tracked categories = [];
  @tracked selectedArticle = null;
  @tracked isEditingTitle = false;
  @tracked titleDraft = '';
  @tracked isModalOpen = false;
  @tracked users = [];

  constructor() {
    super(...arguments);
    // Future initialization code can go here
  }

  reloadData() {

  }

  async fetchUsers() {
    try {
      const records = await this.pocketbase.getUsers();
      this.users = records;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      this.users = [];
    }
  }

  @action
  async addArticle() {
    await this.fetchUsers();
    this.isModalOpen = true;
  }

  @action
  async saveArticle(articleData) {
    try {
      await this.pocketbase.createArticle(articleData);
      this.isModalOpen = false;
      window.location.reload();
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  }

  @action
  selectArticle(article) {
    this.selectedArticle = article;
  }
} 