import { updateTrackEvent, updateTrackEventBatch } from "~/actions/track-event";

const useCourierActions = (dispatch) => {
  return {
    initToast: (payload) => {
      dispatch({
        type: "toast/INIT",
        payload,
      });
    },
    initInbox: (payload) => {
      dispatch({
        type: "inbox/INIT",
        payload,
      });
    },
    createTrackEvent: (trackingId) => {
      dispatch({
        type: "CREATE_TRACKING_EVENT",
        payload: (_, getState) =>
          updateTrackEvent(getState().graphQLClient, trackingId),
      });
    },
    createBatchTrackEvent: (eventType) => {
      dispatch({
        type: "CREATE_TRACKING_EVENT_BATCH",
        payload: (_, getState) =>
          updateTrackEventBatch(getState().graphQLClient, eventType),
      });
    },
  };
};

export default useCourierActions;
