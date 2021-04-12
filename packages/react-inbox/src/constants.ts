export const MESSAGE_LABELS = {
  MARK_AS_READ: "Mark as Read",
  MARK_AS_UNREAD: "Mark as Unread",
};

export const DEFAULT_TABS = [
  {
    id: "unread",
    label: "Unread",
    filter: {
      isRead: false,
    },
  },
  {
    id: "all",
    label: "All Messages",
    filter: {},
  },
];
