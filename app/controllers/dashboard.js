import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default class DashboardController extends Controller {
  @service router;
  @service session;
  @service pocketbase;

  @tracked isMobileMenuOpen = false;

  @tracked isProfileOpen = false;
  @tracked messages = [];
  
  @tracked userStatus = 'active';
  @tracked messageText = '';

  get isTicketsRoute() {
    return this.router.currentRouteName.startsWith('dashboard.tickets');
  }

  get isKnowledgeRoute() {
    return this.router.currentRouteName.startsWith('dashboard.knowledge');
  }

  get isUsersRoute() {
    return this.router.currentRouteName.startsWith('dashboard.users');
  }

  get isAnalyticsRoute() {
    return this.router.currentRouteName.startsWith('dashboard.analytics');
  }

  get isHomeRoute() {
    return this.router.currentRouteName.startsWith('dashboard.home');
  }

  init() {
    super.init(...arguments);
    
  }


  @action
  async logout() {
    await this.session.invalidate();
  }

  @action
  openMobileMenu() {
    this.isMobileMenuOpen = true;
  }

  @action
  updateMessageText(event) {
    this.messageText = event.target.value;
  }

  @action
  async postMessage() {
    if (!this.messageText) return;

    try {
    
    } catch (error) {
      console.error('Failed to post message:', error);
    }
  }


  @action
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

} 


