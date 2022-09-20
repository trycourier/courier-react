import { useMemo } from "react";

import {
  createCourierClient,
  Brands,
  Events,
} from "@trycourier/client-graphql";
import { Brand } from "..";
import { ICourierProviderProps } from "~/types";

const useCourierActions = (state, dispatch) => {
  return useMemo(() => {
    const courierClient = createCourierClient({
      apiUrl: state.apiUrl,
      authorization: state.authorization,
      clientKey: state.clientKey,
      userId: state.userId,
      userSignature: state.userSignature,
    });

    const brands = Brands({ client: courierClient });
    const events = Events({ client: courierClient });

    return {
      init: async (payload: ICourierProviderProps) => {
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
    };
  }, [state.apiUrl, state.clientKey, state.userId, state.userSignature]);
};

export default useCourierActions;
