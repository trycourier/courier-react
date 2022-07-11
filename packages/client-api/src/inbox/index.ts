import queryString from "query-string";
import getHttpHeaders from "~/lib/get-http-headers";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "~/types";

interface IGetMessagesParams {
  next?: string;
  tags?: string[];
  status?: "read" | "unread";
}

interface IGetMessageCountParams {
  tags?: string[];
  status?: "read" | "unread";
}

const prodApiUrl =
  "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production";

const Inbox = (params: ICourierClientBasicParams | ICourierClientJWTParams) => {
  const headers = getHttpHeaders(params);
  const apiUrl = params?.apiUrl ?? prodApiUrl;

  const getMessages = (getMessagesParams?: IGetMessagesParams) => {
    const qs = queryString.stringify({
      next: getMessagesParams?.next,
      tags: getMessagesParams?.tags?.join(","),
      status: getMessagesParams?.status,
    });

    return fetch(`${apiUrl}/inbox?${qs}`, {
      headers,
    });
  };

  const getMessageCount = (getMessageCountParams?: IGetMessageCountParams) => {
    const qs = queryString.stringify({
      tags: getMessageCountParams?.tags?.join(","),
      status: getMessageCountParams?.status,
    });

    return fetch(`${apiUrl}/inbox/count?${qs}`, {
      headers,
    });
  };

  const getMessage = (messageId: string) => {
    return fetch(`${apiUrl}/inbox/${messageId}`, {
      headers,
    });
  };

  const trackEvent =
    (eventType: "read" | "unread" | "archive") => (messageId: string) => {
      return fetch(`${apiUrl}/inbox/${messageId}/event/${eventType}`, {
        headers,
        method: "post",
      });
    };

  const markAllRead = () => {
    return fetch(`${apiUrl}/inbox/mark-all-read`, {
      headers,
      method: "post",
    });
  };

  return {
    getMessage,
    getMessageCount,
    getMessages,
    markAllRead,
    markArchived: trackEvent("archive"),
    markRead: trackEvent("read"),
    markUnread: trackEvent("unread"),
  };
};

export default Inbox;
