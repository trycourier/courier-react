import {
  fetchUnreadMessageCount,
  fetchUnreadMessageCountDone,
  fetchUnreadMessageCountPending,
  INBOX_FETCH_UNREAD_MESSAGE_COUNT,
} from "./actions/fetch-unread-message-count";

import { INBOX_MARK_ALL_READ_DONE } from "./actions/mark-all-read";

export default (api) => (store) => (next) => async (action) => {
  const state = store.getState();

  switch (action.type) {
    case INBOX_MARK_ALL_READ_DONE: {
      if (action.meta) {
        store.dispatch(fetchUnreadMessageCount());
      }

      next(action);
      break;
    }

    case "root/WS_RECONNECTED": {
      store.dispatch(fetchUnreadMessageCount());
      break;
    }

    case INBOX_FETCH_UNREAD_MESSAGE_COUNT: {
      store.dispatch(fetchUnreadMessageCountPending());

      const result = await api.inboxClient.getInboxCount({
        from: state?.from,
        status: "unread",
        tenantId: state?.inbox?.tenantId || state?.tenantId,
      });

      store.dispatch(fetchUnreadMessageCountDone(result));
      break;
    }
  }
  next(action);
};
