import { useMemo } from "react";

import {
  createCourierClient,
  Brands,
  Events,
} from "@trycourier/client-graphql";
import { Brand, CourierTransport } from "..";
import { ICourierContext } from "~/types";

const useCourierActions = (state, dispatch) => {
  return useMemo(() => {
    const courierClient = createCourierClient({
      apiUrl: state.apiUrl,
      authorization: state.authorization,
      clientSourceId: state.clientSourceId,
      clientKey: state.clientKey,
      userId: state.userId,
      userSignature: state.userSignature,
    });

    const brands = Brands({ client: courierClient });
    const events = Events({ client: courierClient });

    return {
      init: async (payload: Partial<ICourierContext>) => {
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
      pageVisible: () => {
        dispatch({
          type: "root/PAGE_VISIBLE",
        });
      },
      wsReconnected: () => {
        dispatch({
          type: "root/WS_RECONNECTED",
        });
      },
      getBrand: (brandId?: string) => {
        dispatch({
          type: "root/GET_BRAND",
          payload: () => brands.getBrand(brandId),
        });
      },
      setBrand: (brand: Brand) => {
        dispatch({
          type: "root/GET_BRAND/DONE",
          payload: brand,
        });
      },
      createTrackEvent: (trackingId: string) => {
        dispatch({
          type: "CREATE_TRACKING_EVENT",
          payload: () => events.trackEvent(trackingId),
        });
      },
      createBatchTrackEvent: (eventType: string) => {
        dispatch({
          type: "CREATE_TRACKING_EVENT_BATCH",
          payload: () => events.trackEventBatch(eventType),
        });
      },
      renewSession: async (token) => {
        if (state.transport instanceof CourierTransport) {
          state.transport.renewSession(token);
        }
        dispatch({
          type: "root/UPDATE_AUTH_TOKEN",
          payload: token,
        });
      },
    };
  }, [
    state.apiUrl,
    state.authentication,
    state.clientKey,
    state.userId,
    state.userSignature,
  ]);
};

export default useCourierActions;
