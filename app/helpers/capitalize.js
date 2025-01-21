import { helper } from '@ember/component/helper';

function capitalize([str]) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default helper(capitalize); 