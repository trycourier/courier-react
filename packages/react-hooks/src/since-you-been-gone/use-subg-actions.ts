import { useCourier } from "@trycourier/react-provider";
import { SinceYouBeenGone } from "@trycourier/client-graphql";

const useSubgActions = () => {
  const {
    apiUrl,
    clientKey,
    userId,
    userSignature,
    dispatch,
    authorization,
    inboxApiUrl,
  } = useCourier();

  const clientParams = {
    apiUrl,
    authorization,
    clientKey,
    userId,
    userSignature,
  };

  const subgClient = SinceYouBeenGone({
    ...clientParams,
    apiUrl: inboxApiUrl,
  });

  return {
    setLastActive: () => {
      const lastActive = new Date().toISOString();
      dispatch({
        type: "subg/TRACK_LAST_ACTIVE",
        meta: {
          lastActive,
        },
        payload: () => subgClient.trackLastActive(lastActive),
      });
    },
  };
};

export default useSubgActions;
