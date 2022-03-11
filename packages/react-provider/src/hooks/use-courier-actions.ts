import {
  createCourierClient,
  trackEvent,
  trackEventBatch,
  getBrand,
} from "@trycourier/client-graphql";

const useCourierActions = (state, dispatch) => {
  const graphQLClient = createCourierClient({
    apiUrl: state.apiUrl,
    clientKey: state.clientKey,
    userId: state.userId,
    userSignature: state.userSignature,
  });

  return {
    init: (payload) => {
      dispatch({
        type: "root/INIT",
        payload,
      });
    },
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
    getBrand: (brandId) => {
      dispatch({
        type: "root/GET_BRAND",
        payload: () => getBrand(graphQLClient)(brandId),
      });
    },
    setBrand: (brand) => {
      dispatch({
        type: "root/GET_BRAND/DONE",
        payload: brand,
      });
    },
    createTrackEvent: (trackingId) => {
      dispatch({
        type: "CREATE_TRACKING_EVENT",
        payload: () => trackEvent(graphQLClient)(trackingId),
      });
    },
    createBatchTrackEvent: (eventType) => {
      dispatch({
        type: "CREATE_TRACKING_EVENT_BATCH",
        payload: () => trackEventBatch(graphQLClient)(eventType),
      });
    },
  };
};

export default useCourierActions;
