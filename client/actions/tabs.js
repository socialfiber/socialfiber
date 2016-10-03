import { CHANGE_TAB } from './types';

export function changeTab(tabName) {
  console.log("CHANGING TABS TO", tabName)
  return { type: CHANGE_TAB, payload: tabName }
}
