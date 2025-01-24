import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddTicketModalComponent extends Component {
  @tracked assignee = '';
  @tracked requester = '';
  @tracked subject = '';
  @tracked description = '';

  @action
  onRequesterChange(event) {
    this.requester = event.target.value;
  }

  @action
  onAssigneeChange(event) {
    this.assignee = event.target.value;
  }

  @action
  onSubjectChange(event) {
    this.subject = event.target.value;
  }

  @action
  onDescriptionChange(event) {
    this.description = event.target.value;
  }

  @action
  onSave() {
    if (this.args.onSave) {
      this.args.onSave({
        assignee: this.assignee,
        requester: this.requester,
        subject: this.subject,
        description: this.description
      });
    }
  }
} 