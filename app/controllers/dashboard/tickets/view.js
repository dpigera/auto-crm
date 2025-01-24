import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardTicketsViewController extends Controller {
  @service router;
  @tracked ticket = this.model;
  @service pocketbase;
  @tracked isEditingDescription = false;
  @tracked descriptionDraft = '';
  @tracked isEditingSubject = false;
  @tracked subjectDraft = '';
  @tracked users = [];

  async fetchUsers() {
    try {
      const records = await this.pocketbase.getUsers();
      this.users = records;
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }

  reloadData() {
    this.ticket = null;
    this.ticket = this.model;
  }

  @action
  goBack() {
    this.router.transitionTo('dashboard.tickets');
  }

  @action
  async updatePriority(event) {
    try {
      const newPriority = event.target.value;
      await this.pocketbase.updateTicket(this.model.id, {
        priority: newPriority
      });
      // Refresh the model to show updated data
      this.model.priority = newPriority;
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  }

  @action
  startEditDescription() {
    this.descriptionDraft = this.model.description;
    this.isEditingDescription = true;
  }

  @action
  updateDescriptionDraft(event) {
    this.descriptionDraft = event.target.value;
  }

  @action
  async saveDescription() {
    try {
      await this.pocketbase.updateTicket(this.model.id, {
        description: this.descriptionDraft
      });
      this.model.description = this.descriptionDraft;
      this.isEditingDescription = false;
      this.reloadData();
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  }

  @action
  cancelEditDescription() {
    this.isEditingDescription = false;
    this.descriptionDraft = '';
  }

  @action
  startEditSubject() {
    this.subjectDraft = this.model.subject;
    this.isEditingSubject = true;
  }

  @action
  updateSubjectDraft(event) {
    this.subjectDraft = event.target.value;
  }

  @action
  async saveSubject() {
    try {
      await this.pocketbase.updateTicket(this.model.id, {
        subject: this.subjectDraft
      });
      this.model.subject = this.subjectDraft;
      this.isEditingSubject = false;
      this.reloadData();
    } catch (error) {
      console.error('Failed to update subject:', error);
    }
  }

  @action
  cancelEditSubject() {
    this.isEditingSubject = false;
    this.subjectDraft = '';
  }

  @action
  async updateStatus(event) {
    try {
      const newStatus = event.target.value;
      const updatedTicket = await this.pocketbase.updateTicket(this.ticket.id, {
        status: newStatus
      });
      this.ticket = updatedTicket;
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  }

  @action
  async updateAssignee(event) {
    try {
      const newAssignee = event.target.value;
      const updatedTicket = await this.pocketbase.updateTicket(this.ticket.id, {
        assignee: newAssignee
      });
      this.ticket = updatedTicket;
    } catch (error) {
      console.error('Failed to update assignee:', error);
    }
  }
} 