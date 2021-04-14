import { updateTrackEvent, updateTrackEventBatch } from "~/actions/track-event";
import useCourier from "./use-courier";

const useCourierActions = () => {
  const { dispatch } = useCourier();

  return {
    initToast: (payload) => {
      dispatch({
        type: "INIT_TOAST",
        payload,
      });
    },
    initInbox: (payload) => {
      dispatch({
        type: "INIT_INBOX",
        payload,
      });
    },
    createTrackEvent: (trackingId) => {
      dispatch({
        type: "CREATE_TRACKING_EVENT",
        payload: (state) => updateTrackEvent(state.graphQLClient, trackingId),
      });
    },
    createBatchTrackEvent: (messageIds, eventType) => {
      dispatch({
        type: "CREATE_TRACKING_EVENT_BATCH",
        payload: (state) =>
          updateTrackEventBatch(state.graphQLClient, messageIds, eventType),
      });
    },
  };
};

export default useCourierActions;
