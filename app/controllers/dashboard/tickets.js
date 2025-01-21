import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class DashboardTicketsController extends Controller {
  @tracked isMobileMenuOpen = false;

  // ... any other tickets-specific controller code ...
} 