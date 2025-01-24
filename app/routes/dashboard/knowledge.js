import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardKnowledgeRoute extends Route {
  @service pocketbase;

  async model() {
    try {
      const records = await this.pocketbase.fetchArticles();
      return records;
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      return [];
    }
  }
}