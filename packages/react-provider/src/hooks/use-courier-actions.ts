import { useMemo } from "react";

import {
  createCourierClient,
  Brands,
  Events,
} from "@trycourier/client-graphql";
import { Brand } from "..";
import { CourierTransport } from "@trycourier/transport";
import courier from "@trycourier/courier-js";

import { ICourierContext } from "~/types";

const useCourierActions = (state, dispatch): ICourierContext => {
  return useMemo(() => {
    const courierClient = createCourierClient({
      apiUrl: state.apiUrl,
      authorization: state.authorization,
      clientSourceId: state.clientSourceId,
      clientKey: state.clientKey,
      userId: state.userId,
      userSignature: state.userSignature,
    });

    let clientKey = state.clientKey;

    //ensure we always have a clientkey
    if (!clientKey && state.authorization) {
      clientKey = "JWT_AUTH";
    }

    courier.init({
      baseUrl: state.apiUrl,
      authorization: state.authorization,
      clientKey,
      userId: state.userId,
      userSignature: state.userSignature,
    });

    const brands = Brands({ client: courierClient });
    const events = Events({ client: courierClient });

    return {
      dispatch,
      async track(
        event: string,
        properties?: Record<string, unknown> | undefined
      ) {
        await courier.track(event, properties);
      },
      async identify(userId: string, payload: Record<string, unknown>) {
        await courier.identify(userId, payload);
      },
      async subscribe(userId: string, listId: string) {
        await courier.subscribe(userId, listId);
      },
      async unsubscribe(userId: string, listId: string) {
        await courier.unsubscribe(userId, listId);
      },
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
    state.authorization,
    state.clientKey,
    state.userId,
    state.userSignature,
  ]);
};

export default useCourierActions;
