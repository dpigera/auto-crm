import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardTicketsViewController extends Controller {
  @service router;
  @tracked ticket = this.model;
} 