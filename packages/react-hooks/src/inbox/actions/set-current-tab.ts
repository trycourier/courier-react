import { ITab } from "../types";

export type SetCurrentTab = {
  type: "inbox/SET_CURRENT_TAB";
  payload: ITab;
};

export const INBOX_SET_CURRENT_TAB = "inbox/SET_CURRENT_TAB";

export const setCurrentTab = (currentTab: ITab): SetCurrentTab => ({
  type: INBOX_SET_CURRENT_TAB,
  payload: currentTab,
});
