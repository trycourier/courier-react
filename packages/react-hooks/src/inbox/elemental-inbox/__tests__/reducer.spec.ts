import { IElementalInbox, IElementalInboxMessagePreview } from "../types";
import reducer, { initialState } from "../reducer";
import { initInbox, INBOX_INIT } from "../../actions/init";
import { setView, INBOX_SET_VIEW } from "../../actions/set-view";
import { toggleInbox, INBOX_TOGGLE } from "../../actions/toggle-inbox";
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
} from "../../actions/mark-message-read";
import {
  markMessageUnread,
  INBOX_MARK_MESSAGE_UNREAD,
} from "../../actions/mark-message-unread";

import { INBOX_NEW_MESSAGE, newMessage } from "../actions/new-message";

import { INBOX_MARK_ALL_READ, markAllRead } from "../actions/mark-all-read";

const mockMessage: IElementalInboxMessagePreview = {
  messageId: "mockMessageId",
  created: new Date().toISOString(),
  title: "mockTitle",
  preview: "mockPreview",
};
const mockMessage2: IElementalInboxMessagePreview = {
  messageId: "mockMessageId2",
  created: new Date().toISOString(),
  title: "mockTitle2",
  preview: "mockPreview2",
};

const mockDate = new Date().toISOString();

describe("inbox reducer", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern").setSystemTime(new Date(mockDate));
  });

  it("should set the initial state", () => {
    const state = reducer();
    expect(state).toEqual(initialState);
  });

  it(`action ${INBOX_INIT}`, () => {
    const state = reducer(
      initialState,
      initInbox<IElementalInbox>({
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
      const state = reducer(initialState, newMessage(mockMessage));

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [mockMessage],
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
          fetchMessagesDone({ messages: [mockMessage] })
        );

        expect(state).toEqual({
          ...initialState,
          messages: [mockMessage],
          lastMessagesFetched: Date.now(),
          startCursor: undefined,
          isLoading: false,
        });
      });

      it(`will append if appendMessages === true`, () => {
        const state = reducer(
          {
            ...initialState,
            messages: [mockMessage],
            isLoading: true,
          },
          fetchMessagesDone({
            appendMessages: true,
            messages: [mockMessage2],
          })
        );

        expect(state).toEqual({
          ...initialState,
          messages: [mockMessage, mockMessage2],
          lastMessagesFetched: Date.now(),
          startCursor: undefined,
          isLoading: false,
        });
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_READ}`, () => {
    it("Will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mockMessage],
        },
        markMessageRead(mockMessage.messageId)
      );

      const readMessage: IElementalInboxMessagePreview = {
        ...mockMessage,
        read: mockDate,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [readMessage],
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_UNREAD}`, () => {
    const mappedReadMessage = {
      ...mockMessage,
      read: mockDate,
    };

    it("Will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedReadMessage],
        },
        markMessageUnread(mockMessage.messageId)
      );

      const unreadMessage = {
        ...mappedReadMessage,
        read: undefined,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [unreadMessage],
      });
    });
  });

  describe(`action ${INBOX_MARK_ALL_READ}`, () => {
    it("will mark all read", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 2,
          messages: [mockMessage, mockMessage2],
        },
        markAllRead()
      );

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [
          {
            ...mockMessage,
            read: mockDate,
          },
          {
            ...mockMessage2,
            read: mockDate,
          },
        ],
      });
    });
  });
});
