import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardKnowledgeController extends Controller {
  @service pocketbase;
  @tracked categories = [];

  constructor() {
    super(...arguments);
    // Future initialization code can go here
  }

} 