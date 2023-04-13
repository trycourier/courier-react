import { resetLastFetched } from "./actions/reset-last-fetched";
import {
  fetchUnreadMessageCount,
  fetchUnreadMessageCountDone,
  fetchUnreadMessageCountPending,
  INBOX_FETCH_UNREAD_MESSAGE_COUNT,
} from "./actions/fetch-unread-message-count";

export default (api) => (store) => (next) => async (action) => {
  const state = store.getState();

  switch (action.type) {
    //case "root/PAGE_VISIBLE":
    case "root/WS_RECONNECTED": {
      store.dispatch(resetLastFetched());
      store.dispatch(fetchUnreadMessageCount());
      break;
    }

    case INBOX_FETCH_UNREAD_MESSAGE_COUNT: {
      store.dispatch(fetchUnreadMessageCountPending());

      const result = await api.inboxClient.getInboxCount({
        from: state?.from,
        status: "unread",
      });

      store.dispatch(fetchUnreadMessageCountDone(result));
      break;
    }
  }
  next(action);
};
