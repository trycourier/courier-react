import { Transport } from "./transports";

interface Brand {
  primaryColor?: string;
  icons?: {
    message?: string;
    bell?: string;
  };
}
export interface ICourierContext {
  apiUrl?: string;
  clientKey?: string;
  dispatch?: (mergeContext: any) => void;
  transport?: Transport;
  userId?: string;
  userSignature?: string;
  wsUrl?: string;
  brandId?: string;
  brand?: Brand;
}
