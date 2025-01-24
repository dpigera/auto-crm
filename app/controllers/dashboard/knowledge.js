import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardKnowledgeController extends Controller {
  @service pocketbase;
  @tracked categories = [];
  @tracked selectedArticle = null;

  constructor() {
    super(...arguments);
    // Future initialization code can go here
  }

  @action
  selectArticle(article) {
    this.selectedArticle = article;
  }
} 