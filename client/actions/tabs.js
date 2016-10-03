import { CHANGE_TAB } from './types';

export function changeTab(tabName) {
  return { type: CHANGE_TAB, payload: tabName }
}
