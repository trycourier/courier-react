import { useMemo } from "react";

import {
  createCourierClient,
  Brands,
  Events,
  InitialState,
} from "@trycourier/client-graphql";
import { Brand } from "..";
import { ICourierProviderProps } from "~/types";

const useCourierActions = (state, dispatch) => {
  return useMemo(() => {
    const courierClient = createCourierClient({
      apiUrl: state.apiUrl,
      clientKey: state.clientKey,
      userId: state.userId,
      userSignature: state.userSignature,
    });

    const initialState = InitialState({ client: courierClient });
    const brands = Brands({ client: courierClient });
    const events = Events({ client: courierClient });

    return {
      init: async (payload: ICourierProviderProps) => {
        dispatch({
          type: "root/INIT",
          payload,
        });

        const response = await initialState.getInitialState({
          brandId: payload.brandId,
          skipFetchBrand: Boolean(payload.brand),
        });

        if (response?.brand) {
          dispatch({
            type: "root/GET_BRAND/DONE",
            payload: response.brand,
          });
        }

        dispatch({
          type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE",
          payload: response?.unreadMessageCount,
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
