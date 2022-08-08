import { IMessage } from "../types";
import { IGraphMessageResponse } from "@trycourier/client-graphql";

import reducer, { initialState, mapMessage } from "../reducer";
import { initInbox, INBOX_INIT } from "../actions/init";
import { setView, INBOX_SET_VIEW } from "../actions/set-view";
import { toggleInbox, INBOX_TOGGLE } from "../actions/toggle-inbox";
import {
  setCurrentTab,
  INBOX_SET_CURRENT_TAB,
} from "../actions/set-current-tab";
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

import { ITab } from "../types";

const mockTab: ITab = {
  id: "my-mock-tab",
  label: "My Mock Tab",
  filters: {},
  state: undefined,
};

const mockStartCursor = "mockStartCursor";
const mockMessage: IMessage = {
  messageId: "mockMessageId",
  created: new Date().getTime(),
  title: "mockTitle",
  body: "mockBody",
};

const mockGraphMessage: IGraphMessageResponse = {
  id: "mockId",
  messageId: "mockMessageId",
  created: new Date().getTime(),
  content: {
    title: "mockTitle",
    body: "mockBody",
    blocks: [
      {
        type: "text",
        text: "mockBody",
      },
    ],
    trackingIds: {
      archiveTrackingId: "mockArchiveTrackingId",
      clickTrackingId: "mockClickTrackingId",
      deliverTrackingId: "mockDeliverTrackingId",
      readTrackingId: "mockReadTrackingId",
      unreadTrackingId: "mockUnreadTrackingId",
    },
  },
};

const mockGraphMessage2: IGraphMessageResponse = {
  id: "mockId2",
  messageId: "mockMessageId2",
  created: new Date().getTime(),
  content: {
    title: "mockTitle2",
    body: "mockBody2",
    blocks: [
      {
        type: "text",
        text: "mockBody2",
      },
    ],
    trackingIds: {
      archiveTrackingId: "mockArchiveTrackingId2",
      clickTrackingId: "mockClickTrackingId2",
      deliverTrackingId: "mockDeliverTrackingId2",
      readTrackingId: "mockReadTrackingId2",
      unreadTrackingId: "mockUnreadTrackingId2",
    },
  },
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

  describe(`action ${INBOX_SET_CURRENT_TAB}`, () => {
    it(`without state`, () => {
      const state = reducer(initialState, setCurrentTab(mockTab));
      expect(state).toEqual({
        ...initialState,
        currentTab: mockTab,
      });
    });

    it(`with state`, () => {
      const mockTabState = {
        startCursor: mockStartCursor,
        messages: [mockMessage],
      };

      const myTab: ITab = {
        id: "my-mock-tab",
        label: "My Mock Tab",
        filters: {},
        state: mockTabState,
      };

      const state = reducer(initialState, setCurrentTab(myTab));
      expect(state).toEqual({
        ...initialState,
        ...mockTabState,
        currentTab: myTab,
      });
    });
  });

  it(`action ${INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE}`, () => {
    const state = reducer(initialState, fetchUnreadMessageCountDone(100));

    expect(state).toEqual({
      ...initialState,
      unreadMessageCount: 100,
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
          fetchMessagesDone({
            messages: [mockGraphMessage],
          })
        );

        expect(state).toEqual({
          ...initialState,
          messages: [mapMessage(mockGraphMessage)],
          isLoading: false,
        });
      });

      it(`will update currentTab with new messages`, () => {
        const state = reducer(
          {
            ...initialState,
            currentTab: mockTab,
          },
          fetchMessagesDone({
            messages: [mockGraphMessage],
          })
        );

        expect(state).toEqual({
          ...initialState,
          messages: [mapMessage(mockGraphMessage)],
          currentTab: {
            ...mockTab,
            state: {
              messages: [mapMessage(mockGraphMessage)],
            },
          },
          isLoading: false,
        });
      });

      it(`will append if appendMessages === true`, () => {
        const state = reducer(
          {
            ...initialState,
            messages: [mapMessage(mockGraphMessage)],
            isLoading: true,
          },
          fetchMessagesDone({
            appendMessages: true,
            messages: [mockGraphMessage2],
          })
        );

        expect(state).toEqual({
          ...initialState,
          messages: [
            mapMessage(mockGraphMessage),
            mapMessage(mockGraphMessage2),
          ],
          isLoading: false,
        });
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_READ}`, () => {
    const mappedMessage = mapMessage(mockGraphMessage);
    const mappedMessage2 = mapMessage(mockGraphMessage2);

    const unreadTab = {
      id: "unread",
      label: "Unread",
      filters: {
        isRead: false,
      },
      state: {
        messages: [mappedMessage, mappedMessage2],
      },
    };

    const allMessagesTab = {
      id: "all",
      label: "All Messages",
      filters: {},
      state: {
        messages: [mappedMessage, mappedMessage2],
      },
    };

    const randomTab = {
      id: "random",
      label: "Random",
      filters: {},
    };

    it("Without Tabs, will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mappedMessage],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      const readMessage = {
        ...mappedMessage,
        read: mockDate,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [readMessage],
      });
    });

    it("On UNREAD Tab, will filter message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mappedMessage, mappedMessage2],
          currentTab: unreadTab,
          tabs: [unreadTab, allMessagesTab, randomTab],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [mappedMessage2],
        currentTab: {
          ...unreadTab,
          state: {
            messages: [mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [mappedMessage2],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [
                {
                  ...mappedMessage,
                  read: mockDate,
                },
                mappedMessage2,
              ],
            },
          },
          randomTab,
        ],
      });
    });

    it("On ALL_MESSAGES Tab, will update message read timestamp and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 1,
          messages: [mappedMessage, mappedMessage2],
          currentTab: allMessagesTab,
          tabs: [unreadTab, allMessagesTab, randomTab],
        },
        markMessageRead(mockGraphMessage.messageId)
      );

      const readTimestamp = state?.messages?.[0].read;
      expect(readTimestamp).toBeTruthy();

      const readMessage = {
        ...mappedMessage,
        read: mockDate,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 0,
        messages: [readMessage, mappedMessage2],
        currentTab: {
          ...allMessagesTab,
          state: {
            messages: [readMessage, mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [mappedMessage2],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [
                {
                  ...mappedMessage,
                  read: mockDate,
                },
                mappedMessage2,
              ],
            },
          },
          randomTab,
        ],
      });
    });
  });

  describe(`action ${INBOX_MARK_MESSAGE_UNREAD}`, () => {
    const mappedReadMessage = mapMessage({
      ...mockGraphMessage,
      read: new Date().getTime(),
    });
    const mappedMessage2 = mapMessage(mockGraphMessage2);

    const unreadTab = {
      id: "unread",
      label: "Unread",
      filters: {
        isRead: false,
      },
      state: {
        messages: [],
      },
    };

    const allMessagesTab = {
      id: "all",
      label: "All Messages",
      filters: {},
      state: {
        messages: [mappedReadMessage, mappedMessage2],
      },
    };

    const randomTab = {
      id: "random",
      label: "Random",
      filters: {},
    };

    it("Without Tabs, will update message and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedReadMessage],
        },
        markMessageUnread(mockGraphMessage.messageId)
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

    it("On ALL_MESSAGES Tab, will remove read timestamp and update unreadMessageCount", () => {
      const state = reducer(
        {
          ...initialState,
          unreadMessageCount: 0,
          messages: [mappedReadMessage, mappedMessage2],
          currentTab: allMessagesTab,
          tabs: [unreadTab, allMessagesTab, randomTab],
        },
        markMessageUnread(mockGraphMessage.messageId)
      );

      const readTimestamp = state?.messages?.[0].read;
      expect(readTimestamp).toBeFalsy();

      const unreadMessage = {
        ...mappedReadMessage,
        read: undefined,
      };

      expect(state).toEqual({
        ...initialState,
        unreadMessageCount: 1,
        messages: [unreadMessage, mappedMessage2],
        currentTab: {
          ...allMessagesTab,
          state: {
            messages: [unreadMessage, mappedMessage2],
          },
        },
        tabs: [
          {
            ...unreadTab,
            state: {
              messages: [unreadMessage],
            },
          },
          {
            ...allMessagesTab,
            state: {
              messages: [unreadMessage, mappedMessage2],
            },
          },
          randomTab,
        ],
      });
    });
  });
});
