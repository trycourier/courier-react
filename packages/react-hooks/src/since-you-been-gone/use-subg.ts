import { useCourier, registerReducer } from "@trycourier/react-provider";
import { useEffect } from "react";
import reducer from "./reducer";
import { SinceYouBeenGoneState } from "./types";

import useSinceYouBeenGoneActions from "./use-subg-actions";

const useSinceYouBeenGone = () => {
  const { subg } =
    useCourier<{
      subg: SinceYouBeenGoneState;
    }>();

  const actions = useSinceYouBeenGoneActions();

  useEffect(() => {
    registerReducer("subg", reducer);
  }, []);

  return { ...subg, ...actions };
};

export default useSinceYouBeenGone;
