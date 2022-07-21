import { useMemo } from "react";

import {
  createCourierClient,
  Brands,
  Events,
} from "@trycourier/client-graphql";

const useCourierActions = (state, dispatch) => {
  return useMemo(() => {
    const courierClient = createCourierClient({
      apiUrl: state.apiUrl,
      clientKey: state.clientKey,
      userId: state.userId,
      userSignature: state.userSignature,
    });

    const brands = Brands({ client: courierClient });
    const events = Events({ client: courierClient });

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
          payload: () => brands.getBrand(brandId),
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
          payload: () => events.trackEvent(trackingId),
        });
      },
      createBatchTrackEvent: (eventType) => {
        dispatch({
          type: "CREATE_TRACKING_EVENT_BATCH",
          payload: () => events.trackEventBatch(eventType),
        });
      },
    };
  }, [state.apiUrl, state.clientKey, state.userId, state.userSignature]);
};

export default useCourierActions;
