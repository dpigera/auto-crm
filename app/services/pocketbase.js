import Service from '@ember/service';
import PocketBase from 'pocketbase';
import { tracked } from '@glimmer/tracking';
import config from '../config/environment';

export default class PocketbaseService extends Service {
  @tracked currentUser = null;

  constructor() {
    super(...arguments);
    this.client = new PocketBase(config.APP.API_HOST);
  }

  get name() {
    return this.currentUser?.name;
  }

  async fetchArticles() {
    const articles = await this.client.collection('articles').getFullList({sort: '-created', expand: 'author'});
    return articles;
  }

  async setMyStatus(status) {
    try {
      const validStatuses = ['active', 'away', 'busy'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status. Must be one of: ' + validStatuses.join(', '));
      }
      const user = await this.client.collection('users').update(this.currentUser.id, {
        onlineStatus: status,
      });
      this.currentUser = user;
      return user;
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    }
  }

  async authSuperUser() {
    let admin = await this.client.admins.authWithPassword('dpigera@gmail.com', '123password');
    return admin; 
  }

  async getUsers() {
    const users = await this.client.collection('users').getFullList({sort: '-created',
      $autoCancel: false,});
    return users;
  }

  async getUser(userId) {
    const user = await this.client.collection('users').getOne(userId);
    return user;
  }

  async login({email, password}) {
    const authData = await this.client.collection('users').authWithPassword(email, password);
    this.currentUser = authData.record;
    return {
        access_token: authData.token,
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: null,
        user: authData.record
    }
  }

  async register({ email, password, passwordConfirm, firstName, lastName }) {
    

    try {
      const name = `${firstName} ${lastName}`;
      const verified = true;
      const userData = {
        email,
        password,
        passwordConfirm,
        name,
        verified
      };

      const record = await this.client.collection('users').create(userData);
      return record;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async searchUsers(query) {
    if (!query || query.length < 2) return [];
    
    try {
      const users = await this.client.collection('users').getList(1, 10, {
        filter: `name ~ "${query}"`,
        sort: '-created'
      });
      return users.items;
    } catch (error) {
      console.error('Failed to search users:', error);
      return [];
    }
  }

  async getTickets() {
    try {
      const tickets = await this.client.collection('tickets').getFullList({
        sort: '-created',
        expand: 'requester',
        $autoCancel: false,
      });
      return tickets;
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      return [];
    }
  }

  async getTicket(ticketId) {
    try {
      const ticket = await this.client.collection('tickets').getOne(ticketId, {
        expand: 'requester'
      });
      return ticket;
    } catch (error) {
      console.error('Failed to fetch ticket:', error);
      throw error;
    }
  }

  async createTicket(ticketData) {
    try {
      const data = {
        subject: ticketData.subject,
        description: ticketData.description,
        assignee: ticketData.assignee,
        requester: ticketData.requester,
        status: 'open',
        priority: 'normal',
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      };

      const record = await this.client.collection('tickets').create(data);
      return record;
    } catch (error) {
      console.error('Failed to create ticket:', error);
      throw error;
    }
  }

  async updateTicket(id, data) {
    try {
      const record = await this.client.collection('tickets').update(id, data);
      return record;
    } catch (error) {
      console.error('Failed to update ticket:', error);
      throw error;
    }
  }

  async getTicketsByRequester(userId) {
    try {
      const records = await this.client.collection('tickets').getList(1, 50, {
        filter: `requester = "${userId}"`,
        sort: '-created',
        expand: 'assignee,requester'
      });
      return records;
    } catch (error) {
      console.error('Failed to fetch user tickets:', error);
      throw error;
    }
  }

  async fetchTicketMessages(ticketId) {
    try {
      const records = await this.client.collection('ticketMessages').getList(1, 100, {
        filter: `ticket = "${ticketId}"`,
        sort: 'created',
        expand: 'user'
      });
      return records;
    } catch (error) {
      console.error('Failed to fetch ticket messages:', error);
      throw error;
    }
  }

  async createArticle(articleData) {
    try {
      const record = await this.client.collection('articles').create({
        title: articleData.title,
        caption: articleData.caption,
        markdown: articleData.markdown,
        user: articleData.user
      });
      return record;
    } catch (error) {
      console.error('Failed to create article:', error);
      throw error;
    }
  }
}
