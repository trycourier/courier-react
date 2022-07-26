import { Client } from "urql";
import { ICourierClientBasicParams } from "../types";
import { createCourierClient } from "../client";

import { GetInboxCount, getInboxCount } from "./count";
import { GetInboxMessage, getInboxMessage } from "./message";
import { GetInboxMessages, getInboxMessages } from "./messages";
import { MarkAllRead, markAllRead } from "./mark-all-read";
import { TrackEvent, trackEvent } from "./track-event";

export default (
  params: ICourierClientBasicParams | { client?: Client }
): {
  getInboxCount: GetInboxCount;
  getMessage: GetInboxMessage;
  getMessages: GetInboxMessages;
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
    getMessage: getInboxMessage(client),
    getMessages: getInboxMessages(client),
    markAllRead: markAllRead(client),
    markArchive: trackEvent(client)("archive"),
    markRead: trackEvent(client)("read"),
    markUnread: trackEvent(client)("unread"),
  };
};
