import { Client } from "urql";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "../types";
import { createCourierClient } from "../client";

import { GetInboxCount, getInboxCount } from "./count";
import * as message from "./message";
import * as messageLists from "./message-lists";
import * as messages from "./messages";
import { MarkAllRead, markAllRead } from "./mark-all-read";
import { TrackEvent, trackEvent } from "./track-event";

export { IInboxMessage } from "./message";
export { IInboxMessagePreview, IGetInboxMessagesParams } from "./messages";

export default (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  getInboxCount: GetInboxCount;
  getMessage: message.GetInboxMessage;
  getMessageLists: messageLists.GetInboxMessageLists;
  getMessages: messages.GetInboxMessages;
  markAllRead: MarkAllRead;
  markArchive: TrackEvent;
  markRead: TrackEvent;
  markUnread: TrackEvent;
} => {
  const client = createCourierClient(params, {
    apiUrl:
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
  });

  return {
    getInboxCount: getInboxCount(client),
    getMessage: message.getInboxMessage(client),
    getMessageLists: messageLists.getMessageLists(client),
    getMessages: messages.getInboxMessages(client),
    markAllRead: markAllRead(client),
    markArchive: trackEvent(client)("archive"),
    markRead: trackEvent(client)("read"),
    markUnread: trackEvent(client)("unread"),
  };
};
