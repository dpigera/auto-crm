import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;
  @service router;
  @service pocketbase;
  
  @tracked errorMessage = null;
  @tracked isLoading = false;

  @action
  async signIn(event) {
    event.preventDefault();
    this.errorMessage = null;
    this.isLoading = true;

    try {
      const email = event.target.email.value;
      const password = event.target.password.value;

      // Authenticate using the JWT authenticator
      await this.session.authenticate('authenticator:jwt', { 
        email, 
        password 
      });

      if (this.session.isAuthenticated) {
        // Redirect to dashboard on success
        await this.pocketbase.authSuperUser();
        await this.router.transitionTo('dashboard.tickets');
      }
    } catch (error) {
      // Display error message
      this.errorMessage = error.message || 'Invalid email or password';
    } finally {
      this.isLoading = false;
    }
  }
} 