import reducer, { initialState } from "../reducer";
import { initInbox, INBOX_INIT } from "../actions/init";
import { setView, INBOX_SET_VIEW } from "../actions/set-view";
import { toggleInbox, INBOX_TOGGLE } from "../actions/toggle-inbox";
import {
  fetchUnreadMessageCountDone,
  INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE,
} from "../actions/fetch-unread-message-count";
import {
  fetchMessagesPending,
  fetchMessagesError,
  fetchMessagesDone,
  INBOX_FETCH_MESSAGES,
  INBOX_FETCH_MESSAGES_ERROR,
  INBOX_FETCH_MESSAGES_PENDING,
  INBOX_FETCH_MESSAGES_DONE,
} from "../actions/fetch-messages";
import {
  markMessageRead,
  INBOX_MARK_MESSAGE_READ,
} from "../actions/mark-message-read";
import {
  markMessageUnread,
  INBOX_MARK_MESSAGE_UNREAD,
} from "../actions/mark-message-unread";

import { INBOX_NEW_MESSAGE, newMessage } from "../actions/new-message";

import { INBOX_MARK_ALL_READ, markAllRead } from "../actions/mark-all-read";

import {
  INBOX_MARK_MESSAGE_OPENED,
  markMessageOpened,
} from "../actions/mark-message-opened";
import { INBOX_UNPIN_MESSAGE, unpinMessage } from "../actions/unpin-message";
import { IInboxMessagePreview } from "@trycourier/core";

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

const mockGraphMessage: IInboxMessagePreview = {
  messageId: "mockMessageId",
  type: "message",
  created: new Date().toISOString(),
  title: "mockTitle",
  preview: "mockBody",
};

const mockGraphMessage2: IInboxMessagePreview = {
  messageId: "mockMessageId2",
  type: "message",
  created: new Date().toISOString(),
  title: "mockTitle2",
  preview: "mockBody2",
};

const mockDate = new Date().getTime();

describe("inbox reducer", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern").setSystemTime(mockDate);
  });

  it("should set the initial state", () => {
    const state = reducer();
    expect(state).toEqual(initialState);
  });

  it(`action ${INBOX_INIT}`, () => {
    const state = reducer(
      initialState,
      initInbox({
        isOpen: true,
      })
    );

    expect(state).toEqual({
      ...initialState,
      isOpen: true,
    });
  });

  it(`action ${INBOX_SET_VIEW}`, () => {
    const state = reducer(initialState, setView("preferences"));

    expect(state).toEqual({
      ...initialState,
      view: "preferences",
    });
  });

  it(`action ${INBOX_TOGGLE}`, () => {
    const state = reducer(initialState, toggleInbox(true));

    expect(state).toEqual({
      ...initialState,
      isOpen: true,
    });

    const newState = reducer(state, toggleInbox());

    expect(newState).toEqual({
      ...initialState,
      isOpen: false,
    });
  });

  it(`action ${INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE}`, () => {
    const state = reducer(
      initialState,
      fetchUnreadMessageCountDone({
        count: 100,
      })
    );

    expect(state).toEqual({
      ...initialState,
      unreadMessageCount: 100,
    });
  });

  describe(`action ${INBOX_NEW_MESSAGE}`, () => {
    it("will prepend the new message to the state", () => {
      const state = reducer(initialState, newMessage(mockGraphMessage));

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [mockGraphMessage],
      });
    });
  });

  describe(`action ${INBOX_FETCH_MESSAGES}`, () => {
    it(INBOX_FETCH_MESSAGES_PENDING, () => {
      const state = reducer(initialState, fetchMessagesPending());

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it(INBOX_FETCH_MESSAGES_ERROR, () => {
      const state = reducer(initialState, fetchMessagesError());

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    describe(INBOX_FETCH_MESSAGES_DONE, () => {
      it(`will not append if appendMessages === false`, () => {
        const state = reducer(
          initialState,
          fetchMessagesDone(
            {
              messages: [mockGraphMessage],
            },
            {
              searchParams: {
                filters: {},
              },
            }
          )
        );

        expect(state).toEqual({
          ...initialState,
          isLoading: false,
          lastMessagesFetched: mockDate,
          messages: [mockGraphMessage],
          pinned: [],
          searchParams: {
            filters: {},
          },
        });
      });

      it(`will append if appendMessages === true`, () => {
        const state = reducer(
          {
            ...initialState,
            messages: [mockGraphMessage],
            isLoading: true,
          },
          fetchMessagesDone(
            {
              appendMessages: true,
              messages: [mockGraphMessage2],
            },
            {
              searchParams: {
                filters: {},
              },
            }
          )
        );

        expect(state).toEqual({
          ...initialState,
          lastMessagesFetched: mockDate,
          messages: [mockGraphMessage, mockGraphMessage2],
          isLoading: false,
          searchParams: {
            filters: {},
          },
        });
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_READ}`, () => {
    it("will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mockGraphMessage],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      const readMessage = {
        ...mockGraphMessage,
        read: new Date(mockDate).toISOString(),
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [readMessage],
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_UNREAD}`, () => {
    it("will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mockGraphMessage],
        },
        markMessageUnread(mockGraphMessage.messageId)
      );

      const unreadMessage = {
        ...mockGraphMessage,
        read: undefined,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [unreadMessage],
      });
    });
  });

  describe(`action ${INBOX_UNPIN_MESSAGE}`, () => {
    it("will message, remove pinned property and put message into main message array", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mockGraphMessage],
          pinned: [
            {
              ...mockGraphMessage2,
              pinned: {
                slotId: "pinned",
              },
            },
          ],
        },
        unpinMessage(mockGraphMessage2.messageId)
      );

      const mockUnpinnedGraphMessage2 = {
        ...mockGraphMessage2,
        pinned: undefined,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [mockGraphMessage, mockUnpinnedGraphMessage2],
        pinned: [],
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_OPENED}`, () => {
    const openedMessage = {
      ...mockGraphMessage,
      opened: new Date(mockDate).toISOString(),
    };

    it("will update message opened date", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mockGraphMessage],
        },
        markMessageOpened(mockGraphMessage.messageId)
      );

      expect(state).toEqual({
        ...initialState,
        messages: [openedMessage],
      });
    });
  });

  describe(`action ${INBOX_MARK_ALL_READ}`, () => {
    it("will mark all read", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 2,
          messages: [mockGraphMessage, mockGraphMessage],
        },
        markAllRead()
      );

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        lastMarkedAllRead: mockDate,
        messages: [
          {
            ...mockGraphMessage,
            read: new Date(mockDate).toISOString(),
          },
          {
            ...mockGraphMessage,
            read: new Date(mockDate).toISOString(),
          },
        ],
      });
    });
  });
});
