import { useContext } from "react";
import { CourierContext } from "../";
import { ICourierContext } from "../types";

function useCourier<T = any>() {
  return useContext(CourierContext) as ICourierContext & T;
};

export default useCourier;
