export type ToggleInbox = {
  type: "inbox/TOGGLE_INBOX";
  payload?: boolean;
};

export const INBOX_TOGGLE = "inbox/TOGGLE_INBOX";

export const toggleInbox = (isOpen?: boolean): ToggleInbox => ({
  type: INBOX_TOGGLE,
  payload: isOpen,
});
