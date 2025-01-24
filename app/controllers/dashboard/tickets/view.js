import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';

export default class DashboardTicketsViewController extends Controller {
  @service router;
  @tracked ticket = this.model;
  @service pocketbase;
  @tracked isEditingDescription = false;
  @tracked descriptionDraft = '';
  @tracked isEditingSubject = false;
  @tracked subjectDraft = '';
  @tracked users = [];
  @tracked ticketMessages = [];
  @tracked requesterDetails = null;

  async refreshTicketsList() {
    const ticketsController = getOwner(this).lookup('controller:dashboard.tickets');
    await ticketsController.fetchTickets();
  }

  async fetchUsers() {
    try {
      const records = await this.pocketbase.getUsers();
      this.users = records;
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }


  async fetchRequesterDetails() {
    if (this.ticket.requester) {
      try {
        const user = await this.pocketbase.getUser(this.ticket.requester);
        this.requesterDetails = user;
      } catch (error) {
        console.error('Failed to fetch requester details:', error);
      }
    }
  }

  reloadData() {
    this.ticket = null;
    this.ticket = this.model.ticket;

    this.ticketMessages = null;
    this.ticketMessages = this.model.ticketMessages.items;
  }

  @action
  goBack() {
    window.history.back();
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
      await this.refreshTicketsList();
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
      await this.refreshTicketsList();
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
      await this.refreshTicketsList();
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
      await this.refreshTicketsList();
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
      await this.fetchRequesterDetails();
      await this.refreshTicketsList();
    } catch (error) {
      console.error('Failed to update assignee:', error);
    }
  }

  @action
  async updateRequester(event) {
    try {
      const newRequester = event.target.value;
      const updatedTicket = await this.pocketbase.updateTicket(this.ticket.id, {
        requester: newRequester
      });
      this.ticket = updatedTicket;
      
      // Fetch and update requester details
      await this.fetchRequesterDetails();
      await this.refreshTicketsList();
    } catch (error) {
      console.error('Failed to update requester:', error);
    }
  }
} 