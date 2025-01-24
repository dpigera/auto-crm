import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddArticleModalComponent extends Component {
  @tracked title = '';
  @tracked caption = '';
  @tracked author = '';
  @tracked markdown = '';

  @action
  onTitleChange(event) {
    this.title = event.target.value;
  }

  @action
  onCaptionChange(event) {
    this.caption = event.target.value;
  }

  @action
  onAuthorChange(event) {
    this.author = event.target.value;
  }

  @action
  onMarkdownChange(event) {
    this.markdown = event.target.value;
  }

  @action
  onSave() {
    if (this.args.onSave) {
      this.args.onSave({
        title: this.title,
        caption: this.caption,
        user: this.author,
        markdown: this.markdown
      });
    }
  }
} 