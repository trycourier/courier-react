import { useContext } from "react";
import { CourierContext } from "../";
import { ICourierContext } from "../types";

function useCourier<T = any>(): ICourierContext & T {
  return useContext(CourierContext) as ICourierContext & T;
}

export default useCourier;
