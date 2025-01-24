import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddUserModalComponent extends Component {
  @tracked firstName = '';
  @tracked lastName = '';
  @tracked email = '';
  @tracked password = '';

  @action
  onFirstNameChange(event) {
    this.firstName = event.target.value;
  }

  @action
  onLastNameChange(event) {
    this.lastName = event.target.value;
  }

  @action
  onEmailChange(event) {
    this.email = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.password = event.target.value;
  }

  @action
  onSave() {
    if (this.args.onSave) {
      this.args.onSave({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      });
    }
  }
} 