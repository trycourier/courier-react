import { useCourier } from "@trycourier/react-provider";
import { IInboxConfig } from '../types';

export const useInbox: () => [
  string, 
  { config: IInboxConfig, clientKey?: string}
] = () => {
  const {inboxConfig, clientKey} = useCourier<{
    inboxConfig: IInboxConfig
  }>();

  const inbox = "inbox";

  return [inbox, { config: inboxConfig ?? {}, clientKey }];
};
