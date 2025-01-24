import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import { marked } from 'marked';

export default helper(function markdown([content]) {
  if (!content) {
    return '';
  }
  
  return htmlSafe(marked(content));
});