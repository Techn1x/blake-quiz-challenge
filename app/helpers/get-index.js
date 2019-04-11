import { helper } from '@ember/component/helper';

export function getIndex([arr, i]/*, hash*/) {
  return (arr && i >= 0 && arr.length > i) ? arr[i] : null;
}

export default helper(getIndex);
