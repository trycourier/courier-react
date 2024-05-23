import { Client } from "urql";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "../types";
import { createCourierClient } from "../client";

import { GetInboxCount, getInboxCount } from "./count";
import * as message from "./message";
import * as messageLists from "./message-lists";
import * as messages from "./messages";
import { MarkAllRead, markAllRead } from "./mark-all-read";
import { TrackEvent, trackEvent } from "./track-event";

export { IGetInboxMessagesParams } from "./messages";

export default (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  addTag: TrackEvent;
  getInboxCount: GetInboxCount;
  getMessage: message.GetInboxMessage;
  getMessageLists: messageLists.GetInboxMessageLists;
  getMessages: messages.GetInboxMessages;
  markAllRead: MarkAllRead;
  markArchive: TrackEvent;
  markOpened: TrackEvent;
  markRead: TrackEvent;
  markUnread: TrackEvent;
  removeTag: TrackEvent;
  trackClick: TrackEvent;
  unpinMessage: TrackEvent;
} => {
  const client = createCourierClient(params, {
    apiUrl: "https://inbox.courier.com/q",
  });

  return {
    addTag: trackEvent(client)("addTag"),
    removeTag: trackEvent(client)("removeTag"),
    getInboxCount: getInboxCount(client),
    getMessage: message.getInboxMessage(client),
    getMessageLists: messageLists.getMessageLists(client),
    getMessages: messages.getInboxMessages(client),
    markAllRead: markAllRead(client),
    markArchive: trackEvent(client)("archive"),
    markOpened: trackEvent(client)("opened"),
    markRead: trackEvent(client)("read"),
    markUnread: trackEvent(client)("unread"),
    trackClick: trackEvent(client)("clicked"),
    unpinMessage: trackEvent(client)("unpin"),
  };
};
