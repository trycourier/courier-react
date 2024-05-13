import { useContext } from "react";
import { CourierContext } from "../";
import { ICourierContext } from "../types";

function useCourier<T = unknown>(): ICourierContext & T {
  const context = useContext(CourierContext) as ICourierContext & T;
  return context;
}

export default useCourier;
